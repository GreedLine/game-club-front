import { Component, OnInit } from '@angular/core';
import { DeviceTableDataSource, DeviceTableItem } from '../device-table/device-table-datasource';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
