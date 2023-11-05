import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './product/index/index.component';
import { CreateComponent } from './product/create/create.component';
import { EditComponent } from './product/edit/edit.component';

const routes: Routes = [
  { path: 'product', redirectTo: 'product/index', pathMatch: 'full'},
  { path: 'product/index', component: IndexComponent },
  { path: 'product/create', component: CreateComponent },
  { path: 'product/edit/:id', component: EditComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
