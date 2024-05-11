import { Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {HomeComponent} from "./home/home.component";
import {ColaboratorsComponent} from "./colaborators/colaborators.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadComponent: () => HomeComponent },
  { path: 'projects', loadComponent: () => ProjectsComponent },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)},
  { path: 'colaborators', loadComponent: () => ColaboratorsComponent},
  { path: 'colaborators', loadChildren: () => import('./colaborators/colaborators.module').then(m => m.ColaboratorsModule)}
];
