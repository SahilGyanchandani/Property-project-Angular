import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProperty } from '../../models/IProperty';
import { Property } from 'src/models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>('data/properties.json')
  }

  addProperty(property: Property, properties: Property[]) {
    properties.push(property);
    localStorage.setItem('newProperty', JSON.stringify(properties));
  }
}
