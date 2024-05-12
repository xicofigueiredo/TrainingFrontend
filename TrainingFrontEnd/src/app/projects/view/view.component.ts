import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Projects} from "../../models/projects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
    @Input() project!: Projects;
    @Output() enableEditComponent = new EventEmitter<boolean>();
    @Output() projectSelected = new EventEmitter<Projects>();
    @Output() closeEditShowComponent = new EventEmitter<boolean>();

    constructor() { }

  sendEdit(){
    this.enableEditComponent.emit(true);
    this.sendInfo();
  }
    sendInfo() {
      this.projectSelected.emit(this.project)
      this.closeEditShowComponent.emit(true);
    }
}
