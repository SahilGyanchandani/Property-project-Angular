import { Component, Input, OnInit } from '@angular/core';
import { IProperty } from 'src/models/IProperty';
import { IPropertyBase } from 'src/models/IPropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  constructor() { }

  @Input() prop!: IPropertyBase;
  @Input() hideIcons!:boolean;
  // property: any = {
  //   "Id": 1,
  //   "Type": 'House',
  //   "Price": 12000,
  //   "Name": "Abc House "
  // }

  ngOnInit() {
  }

}
