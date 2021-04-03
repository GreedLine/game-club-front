import { Component, OnInit } from '@angular/core';
import { DeviceTableDataSource, DeviceTableItem } from '../device-table/device-table-datasource';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  constructor() { }

  deviceTableItem = [
    {id: 1, uuid: '123d-dfd-423df-df', name: 'Hydrogen', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'ARCH-LINUX'},
    {id: 2, uuid: '123d-dfd-423df-df', name: 'Helium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'ARCH-LINUX'},
    {id: 3, uuid: '123d-dfd-423df-df', name: 'Lithium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'WIN10'},
    {id: 4, uuid: '123d-dfd-423df-df', name: 'Beryllium', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'WIN10'},
    {id: 5, uuid: '123d-dfd-423df-df', name: 'Boron', timeWork: '1d, 12h, 3m', MAC: '00-50-B6-5B-CA-6A', iscsi: 'iscsi:172.16.0.18::::iqn.2005-10.org.freenas.ctl:winda', group: 'Fedora'},
  ];

  // TODO: Написать обработчик и вынести запрос в отдельный файл.
  log(): void{
    console.log('Success!');
  }

  ngOnInit(): void {
  }

}
