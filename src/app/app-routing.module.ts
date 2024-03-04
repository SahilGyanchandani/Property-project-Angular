import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyPageComponent } from './property/property-page/property-page.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyPageComponent
  },
  {
    path: 'add-property',
    component: AddPropertyComponent
  },
  {
    path: 'prop-detail/:id',
    component: PropertyDetailComponent
  },
  {
    path:'rent-property',
    component:PropertyPageComponent
  },
  {
    path:'user-login',
    component:UserLoginComponent
  },
  {
    path:'user-register',
    component:UserRegisterComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
