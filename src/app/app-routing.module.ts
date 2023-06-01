import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { FramePageComponent } from './pages/master/frame.page';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { PetsPageComponent } from './pages/account/pets-page/pets-page.component';
import { SignUpPageComponent } from './pages/account/sign-up-page/sign-up-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: FramePageComponent, //pagina middlware que renderiza o menu
    children: [
      { path: '', component: ProductsPageComponent },
      { path: 'cart', component: CartPageComponent }
    ]
  },
  {
    path: 'account',
    component: FramePageComponent,
    children: [
      { path: 'pets', component: PetsPageComponent }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
