import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/admin/ProductAdmin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CreateComponent } from './pages/admin/ProductAdmin/create/create.component';
import { EditComponent } from './pages/admin/ProductAdmin/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guard/auth.guard';
import { CreateCategoryComponent } from './pages/admin/CategoryAdmin/createcategory/createcategory.component';
import { ListcategoryComponent } from './pages/admin/CategoryAdmin/listcategory/listcategory.component';
import { EditCategoryComponent } from './pages/admin/CategoryAdmin/editcategory/editcategory.component';
import { CreateUserComponent } from './pages/admin/UserAdmin/createuser/createuser.component';
import { ListUserComponent } from './pages/admin/UserAdmin/listuser/listuser.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'admin', component: ProductsComponent },
      { path: 'products', component: ProductsComponent }, //router product admin
      { path: 'create', component: CreateComponent }, //router product admin
      { path: 'products/:id', component: EditComponent }, //router product admin
      { path: 'admin', component: ProductsComponent }, //router category admin
      { path: 'category', component: ProductsComponent }, //router category admin
      { path: 'category/create', component: CreateCategoryComponent }, //router category admin
      { path: 'category/list', component: ListcategoryComponent }, //router category admin
      { path: 'category/:id', component: EditCategoryComponent }, //router category admin
      { path: 'user/userlist', component: ListUserComponent },
      { path: 'user/create', component: CreateUserComponent },
    ],
    canActivate: [authGuard],
  },
];
