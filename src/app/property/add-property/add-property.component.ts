import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/models/IProperty';
import { IPropertyBase } from 'src/models/IPropertyBase';
import { Property } from 'src/models/property';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs', { static: false }) formTabs?: TabsetComponent;
  addPropertyForm !: FormGroup;

  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    SellRent: "1",
    PType: '',
    FType: '',
    BHK: null,
    BuiltArea: null,
    Price: null,
    City: '',
    RTM: null
  };
  nextClicked!: boolean;
  property = new Property();
  properties: Property[] = []; // Array to store Property objects


  constructor(private router: Router, private formBuilder: FormBuilder, private alertify: AlertifyService, private housing: HousingService) { }

  ngOnInit() {
    this.initAddPropertyForm();
    this.localStoragePropData();
  }

  initAddPropertyForm() {
    this.addPropertyForm = this.formBuilder.group({
      basicInfoForm: this.formBuilder.group({
        propSelect: ["1", Validators.required],
        BHK: ['', Validators.required],
        propType: ['', Validators.required],
        furType: ['', Validators.required],
        propName: ['', Validators.required],
        city: ['', Validators.required]
      }),
      priceAreaForm: this.formBuilder.group({
        propPrice: ['', Validators.required],
        security: ['', Validators.required],
        maintenance: ['', Validators.required],
        builtArea: ['', Validators.required],
        carpetArea: ['', Validators.required]
      }),
      addressForm: this.formBuilder.group({
        floor: ['', Validators.required],
        totalFloor: ['', Validators.required],
        address: ['', Validators.required],
        landmark: ['', Validators.required]
      }),
      otherDetailForm: this.formBuilder.group({
        rtm: [''], // Ready to Move
        availableFrom: ['', Validators.required],
        ageOfProperty: [''],
        gatedCommunity: ['', Validators.required],
        mainEntrance: ['', Validators.required],
        description: ['', Validators.required]
      })
    })
  }


  addProperty() {
    if (this.addPropertyForm.valid) {
      this.mapProperty();
      console.log(this.properties);
      this.housing.addProperty(this.property,this.properties);
      this.alertify.success('property added successfully');

      if (this.property.SellRent === '2') {
        this.router.navigateByUrl('/rent-property')
      }
      else {
        this.router.navigateByUrl('/');
      }
    }
    else {
      this.addPropertyForm.markAllAsTouched();
      this.alertify.error('please fill the whole form');
    }
  }

  selectTab(tabId: number, isCurrentTabValid?: boolean) {
    this.nextClicked = true;
    if (this.formTabs?.tabs[tabId] && isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }

  }

  mapProperty(): void {
    this.property.Id = uuidv4();
    this.property.SellRent = this.addPropertyForm.get('basicInfoForm.propSelect')?.value;
    this.property.BHK = this.addPropertyForm.get('basicInfoForm.BHK')?.value;
    this.property.PType = this.addPropertyForm.get('basicInfoForm.propType')?.value;
    this.property.Name = this.addPropertyForm.get('basicInfoForm.propName')?.value;
    this.property.City = this.addPropertyForm.get('basicInfoForm.city')?.value;
    this.property.FType = this.addPropertyForm.get('basicInfoForm.furType')?.value;

    // Price and Area Form Group
    this.property.Price = this.addPropertyForm.get('priceAreaForm.propPrice')?.value;
    this.property.Security = this.addPropertyForm.get('priceAreaForm.security')?.value;
    this.property.Maintenance = this.addPropertyForm.get('priceAreaForm.maintenance')?.value;
    this.property.BuiltArea = this.addPropertyForm.get('priceAreaForm.builtArea')?.value;
    this.property.CarpetArea = this.addPropertyForm.get('priceAreaForm.carpetArea')?.value;

    // Address Form Group
    this.property.FloorNo = this.addPropertyForm.get('addressForm.floor')?.value;
    this.property.TotalFloor = this.addPropertyForm.get('addressForm.totalFloor')?.value;
    this.property.Address = this.addPropertyForm.get('addressForm.address')?.value;
    this.property.Landmark = this.addPropertyForm.get('addressForm.landmark')?.value;

    // Other Details Form Group
    this.property.RTM = this.addPropertyForm.get('otherDetailForm.rtm')?.value;
    this.property.AOP = this.addPropertyForm.get('otherDetailForm.ageOfProperty')?.value;
    this.property.GatedCommunity = this.addPropertyForm.get('otherDetailForm.gatedCommunity')?.value;
    this.property.Mainentrance = this.addPropertyForm.get('otherDetailForm.mainEntrance')?.value;
    this.property.Description = this.addPropertyForm.get('otherDetailForm.description')?.value;

    // Set PostedOn to current date
    this.property.PostedOn = new Date().toString();
  }

  localStoragePropData() {
    const existingProperty = localStorage.getItem('newProperty');
    if (existingProperty) {
      this.properties = JSON.parse(existingProperty);
    } else {
      this.properties = []; // Initialize with an empty array if no data exists
    }
  }

}
