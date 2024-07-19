import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent{
  selectedItem = '';
  selectedDate = '';

  data=[
    {year:2024, month:'julio', day:12, unit:'rpm', value:43},
  ];
}
