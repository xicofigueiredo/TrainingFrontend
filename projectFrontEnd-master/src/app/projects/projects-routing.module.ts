import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {AddComponent} from "./add/add.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  { path: 'view', component: ViewComponent},
  { path: 'add', component: AddComponent},
  { path: 'details/:id', component: DetailsComponent}
];

  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
