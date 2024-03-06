import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/models/IProperty';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css']
})
export class PropertyPageComponent implements OnInit {
  SellRent !: string;
  properties: IProperty[] = [];
  constructor(private housingService: HousingService, private route: ActivatedRoute) {
    this.SellRent = this.route.snapshot.url.toString() === 'rent-property' ? "2" : "1"
  }

  ngOnInit() {
    this.housingService.getAllProperties().subscribe(
      data => {
        const fetchedData = data.filter(res => res.SellRent === this.SellRent);
  
        const existingProperty = localStorage.getItem('newProperty');
        const storedData = existingProperty ? JSON.parse(existingProperty) : [];
  
        // Combine fetched data with stored data, ensuring stolred data is only added for the matching SellRent value
        this.properties = fetchedData.concat(storedData.filter((item: { SellRent: string; }) => item.SellRent === this.SellRent));
  
        console.log(this.properties); // Verify the combined data
      },
      error => {
        console.error(error);
      }
    );
  }

}
