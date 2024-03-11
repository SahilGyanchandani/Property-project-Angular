import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from 'src/models/IProperty';

@Pipe({
  name: 'PropertyCitySearchPipe'
})
export class PropertyCitySearchPipe implements PipeTransform {

  transform(properties: IProperty[], searchText: string): IProperty[] {
    if (!properties || !searchText) {
      return properties;
    }
    else {
      searchText = searchText.toLowerCase();
      return properties.filter(prop => {
        return prop.City.toLowerCase().includes(searchText);
      });
    }
  }

}
