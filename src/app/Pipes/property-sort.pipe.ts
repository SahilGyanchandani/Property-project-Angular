import { Pipe, PipeTransform } from '@angular/core';
import { IProperty } from 'src/models/IProperty';

@Pipe({
  name: 'propertySort'
})
export class PropertySortPipe implements PipeTransform {

  transform(properties: IProperty[], sortOrder: string): IProperty[] {
    if (!properties || !sortOrder) {
      return properties
    }
    else {
      const sortedProperties = properties.slice();
      sortedProperties.sort((a, b) => {
        const priceA = a.Price != null ? a.Price : 0;
        const priceB = b.Price != null ? b.Price : 0;
        if (sortOrder === 'asc') {
          console.log(priceA - priceB);
          return priceA - priceB;
        }
        else {
          console.log(priceB - priceA);
          return priceB - priceA;
        }
      });
      return sortedProperties;
    }
  }

}
