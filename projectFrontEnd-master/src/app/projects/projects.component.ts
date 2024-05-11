import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Projects} from "../models/projects";
import {ProjectService} from "./project.service";
import {ViewComponent} from "./view/view.component";
import {AddComponent} from "./add/add.component";
import {DetailsComponent} from "./details/details.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ViewComponent,
    AddComponent,
    DetailsComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Projects [] = [];
  filteredProjects: Projects [] = [];
  filter: string = '';
  filterStartDate: Date | null = null;
  filterEndDate: Date | null = null;
  addShowComponent: boolean = false;
  boolDetailsComponent: boolean = false;
  buttonAddVisible: boolean = true;
  @Input() projectDetailId!: Projects | null;
  @Output() projectId = new EventEmitter<Projects>();
  @Input() closeEditComponent!: boolean;
  @Input() enableEditComponent!: boolean;
  @Output() enableOrDisable = new EventEmitter<boolean>() ;
  // @Input() receiveMessage!: string;

  constructor(private projectService: ProjectService,
              private NgToast: NgToastService) {
    this.fetchProjects();
    this.projectService.projectUpdated.subscribe(() => this.fetchProjects());
  }

  openSuccess(message: string){
    this.NgToast.info({detail:"Success",summary: message, sticky:false ,position:'bottomRight'})
  }

  fetchProjects() {
    this.projectService.getProjects()
      .subscribe((list: Projects[]) => {
        this.projects = list;
        this.filteredProjects = list;
      })
    // this.openSuccess();
  }

  filterProjects() {
    this.filteredProjects = this.projects;
    if (this.filter) {
      this.filteredProjects = this.filteredProjects.filter(project =>
        project.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
    if (this.filterStartDate && this.filterEndDate) {
      this.filteredProjects = this.filteredProjects.filter(project =>
        new Date(project.endDate!) >= new Date(this.filterStartDate!) && new Date(project.startDate!) <= new Date(this.filterEndDate!)
      );
    }
    if (this.filterStartDate || this.filterEndDate) {
      if (this.filterStartDate) {
        this.filteredProjects = this.filteredProjects.filter(project =>
          new Date(project.startDate!) >= new Date(this.filterStartDate!)
        );
      } else {
        this.filteredProjects = this.filteredProjects.filter(project =>
          new Date(project.endDate!) <= new Date(this.filterEndDate!)
        );
      }
    }

  }

  showAddComponent() {
    this.showButtonAdd();
    this.addShowComponent = !this.addShowComponent;
    this.enableOrDisable.emit(false);
  }

  showDetailsComponent() {
    this.boolDetailsComponent = !this.boolDetailsComponent;
  }

  closeAddComponent($event: boolean) {
    this.projectDetailId = null;
    this.enableEditComponent = false;
    this.showAddComponent();
    // this.fetchProjects();
  }

  closeEditShowComponent($event: boolean) {
    this.projectDetailId = null;
    this.showButtonAdd();
    this.showDetailsComponent();
  }

  showButtonAdd() {
    this.buttonAddVisible = !this.buttonAddVisible;
  }
  editEnable($event: boolean){
    this.enableEditComponent = $event;
  }

  projectSelected($event: Projects) {
    this.projectDetailId = $event;
    if (this.enableEditComponent)
    {
      this.enableOrDisable.emit(true);
      this.showAddComponent();
    } else {
      this.showButtonAdd();
      this.showDetailsComponent();
    }
  }

  cleanBoxes() {
    this.filter = '';
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.fetchProjects();
  }

  receiveMessage($event: string) {
    const receiveMessage = $event;
    this.openSuccess(receiveMessage)
  }
}
