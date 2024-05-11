import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuBarComponent} from "./menu-bar/menu-bar.component";
import {NgToastModule} from "ng-angular-popup";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBarComponent,NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'colaborador';
}
