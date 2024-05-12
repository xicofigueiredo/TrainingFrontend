import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Projects} from "../../models/projects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() projectId!: Projects;
  @Output() closeEditShowComponent = new EventEmitter<boolean>();

  constructor() {
  }

  goBack(): void {
    this.closeEditShowComponent.emit(false);
  }
}
