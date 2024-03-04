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
        this.properties = data.filter((res) => res.SellRent === this.SellRent);
        const newProperty = localStorage.getItem('newProperty');
        if (newProperty) {
          const newPropConvert=JSON.parse(newProperty);
          this.properties = [newPropConvert, ...this.properties]
        }

        this.route.snapshot.url.toString()

      }, error => {
        console.log(error);
      }
    )
  }

}
