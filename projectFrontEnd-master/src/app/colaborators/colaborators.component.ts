import {Component,} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Colaborators} from "../models/colaborators";
import {ColaboratorsService} from "./colaborators.service";
import {ViewComponent} from "./view/view.component";
import {AddComponent} from "./add/add.component";

@Component({
  selector: 'app-colaborators',
  standalone: true,
  imports: [
    CommonModule,
    ViewComponent,
    AddComponent
  ],
  templateUrl: './colaborators.component.html',
  styleUrl: './colaborators.component.css'
})
export class ColaboratorsComponent {
  colaborators: Colaborators [] = [];
  addShowComponent: boolean = false;
  constructor(private colaboratorService: ColaboratorsService) {
    this.fetchColaborators();
  }

  fetchColaborators() {
    this.colaboratorService.getColaborators()
      .subscribe((list: Colaborators[]) => {
        this.colaborators = list;
      })
  }

  showAddComponent() {
    this.addShowComponent = !this.addShowComponent;
  }

  closeAddComponent($event: boolean) {
    this.showAddComponent();
    this.fetchColaborators();
  }
}
