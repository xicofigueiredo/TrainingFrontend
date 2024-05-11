import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn, Validators
} from "@angular/forms";
import {Projects} from "../../models/projects";
import {ProjectService} from "../project.service";
import {CommonModule} from "@angular/common";
import {ProjectsComponent} from "../projects.component";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit, OnDestroy {
  addProjectForm!: FormGroup;
  tryToSubmit = false;
  isDisabled: boolean = false;
  @Output() closeShowComponent = new EventEmitter<boolean>();
  @Input() projectId!: Projects;
  @Input() enableOrDisable! : boolean;
  @Output() sendMessage = new EventEmitter<string>();

  constructor(private projectService: ProjectService) {
  }

  private createFormControl(value: any, isDisabled: boolean): FormControl {
    return new FormControl({value: value, disabled: isDisabled}, Validators.required);
  }

  ngOnInit() {
    this.isDisabled = this.enableOrDisable;
    const projectId = this.projectId || new Projects(0,"", null, null);

    this.addProjectForm = new FormGroup({
      id: this.createFormControl(projectId.id, this.isDisabled),
      name: this.createFormControl(projectId.name, this.isDisabled),
      startDate: this.createFormControl(projectId.startDate, this.isDisabled),
      endDate: new FormControl(projectId.endDate, Validators.required)
    }, {validators: this.testeValidators});
  }

  ngOnDestroy() {
    this.closeShowComponent.unsubscribe();
  }

  testeValidators: ValidatorFn = (
    control: AbstractControl,
    ): ValidationErrors | null => {
    let errors: ValidationErrors = {};
    let name = control.get('name');
    let startDate = control.get('startDate');
    let endDate = control.get('endDate');

    if (name && name.value) {
      let length = name.value.length;
      if (length <= 2 || length > 50) {
        errors["invalidName"] = true;
      }
    } else {
      errors["requiredName"] = true;
    }

    if (startDate && startDate.value) {
      const date = new Date(startDate.value);
      if (isNaN(date.getTime())) {
        errors["invalidStartDate"] = true;
      }
    } else {
      errors["requiredStartDate"] = true;
    }

    if (endDate && endDate.value) {
      const date = new Date(endDate.value);
      if (isNaN(date.getTime())) {
        errors["invalidEndDate"] = true;
      }
    } else {
      errors["requiredEndDate"] = true;
    }

    if ( startDate?.value > endDate?.value) {
      errors["invalidDate"] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  onSubmit() {
    this.addProjectForm.updateValueAndValidity();
    if (!this.isDisabled)
    {
      this.tryToSubmit = true;
      if (this.addProjectForm.valid) {
        const project: Projects = this.addProjectForm.value;
        this.projectService.createProject(project).subscribe({
          next: response => {
            console.log("done it");
          },
          error: error => {
            console.log("error");
          },
          complete: () => {
            this.projectService.projectUpdated.emit();
            this.sendMessage.emit("Project " + project.name +" was created");
            // this.projectComponent.openSuccess("Project " + project.name +" was created");
            this.goBack();
          }
        });
      } else {
        console.log("not valid");
      }
    }
    else {
      if (this.addProjectForm.valid) {
        const project: Projects = this.addProjectForm.getRawValue();
        this.projectService.updateProject(project).subscribe({
          next: response => {
            console.log("done it");
          },
          error: error => {
            console.log("error");
          },
          complete: () => {
            this.sendMessage.emit("Project " + project.name +" was updated");
            this.projectService.projectUpdated.emit();
            this.goBack();
          }
        });
      } else {
        console.log("not valid");
      }
    }
  }

  goBack(): void {
    this.closeShowComponent.emit(false);
  }
}
