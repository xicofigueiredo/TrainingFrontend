import {Component, Input} from '@angular/core';
import {Colaborators} from "../../models/colaborators";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() colaborator!: Colaborators

}
