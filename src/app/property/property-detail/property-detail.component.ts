import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { Property } from 'src/models/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  propertyId!: number;
  property = new Property();
  constructor(private route: ActivatedRoute, private housingService: HousingService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];
    this.getPropertyFromLocal();

  }

  getPropertyFromLocal() {
    const localStorageData = localStorage.getItem('newProperty');
    const localStorageProperties = localStorageData ? JSON.parse(localStorageData) : [];

    // Retrieve data from the service
    this.housingService.getAllProperties().subscribe(
      serviceData => {
        // Combine localStorage data with data from the service
        const combineData = [...localStorageProperties, ...serviceData];
        console.log(combineData);
        console.log(this.propertyId);


        // Find the property by Id
        this.property = combineData.find((prop: { Id: number; }) => prop.Id === this.propertyId);

        console.log(this.property);


      },
      error => {
        this.alertify.error('Error fetching properties');
        console.log('Error fetching properties:', error);
      });
  }
}
