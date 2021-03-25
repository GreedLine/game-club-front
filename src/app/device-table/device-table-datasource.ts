import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DeviceTableItem {
  id: number;
  name: string;
  uuid: string;
  timeWork: string;
  group: string;
  MAC: string;
  iscsi: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DeviceTableItem[] = [
  {id: 1, uuid: '123d-dfd-423df-df', name: 'Hydrogen', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'ARCH-LINUX'},
  {id: 2, uuid: '123d-dfd-423df-df', name: 'Helium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'ARCH-LINUX'},
  {id: 3, uuid: '123d-dfd-423df-df', name: 'Lithium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'WIN10'},
  {id: 4, uuid: '123d-dfd-423df-df', name: 'Beryllium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'WIN10'},
  {id: 5, uuid: '123d-dfd-423df-df', name: 'Boron', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'Fedora'},
];

/**
 * Data source for the DeviceTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DeviceTableDataSource extends DataSource<DeviceTableItem> {
  data: DeviceTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DeviceTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DeviceTableItem[]): DeviceTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DeviceTableItem[]): DeviceTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
