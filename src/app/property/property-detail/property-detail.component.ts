import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/models/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
 propertyId!: number;
 property = new Property();
    constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.propertyId=this.route.snapshot.params['id'];
    this.getPropertyFromLocal();
    
  }

  getPropertyFromLocal(){
    const storedData=localStorage.getItem('newProperty');

    if(storedData){
      const properties=JSON.parse(storedData);
      this.property=properties.find((prop: { Id: number; })=>prop.Id === this.propertyId)
    }
  }
}
