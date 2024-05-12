import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {Colaborators} from "../../models/colaborators";
import {ColaboratorsService} from "../colaborators.service";
import {Location, NgIf} from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit  {
  addColaboratorForm!: FormGroup;
  tryToSubmit = false;
  @Output() closeShowComponent = new EventEmitter<boolean>();
  constructor (private colaboratorsService: ColaboratorsService) { }

  ngOnInit() {
    this.addColaboratorForm = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    }, {validators: this.testeValidators});
  }

  testeValidators: ValidatorFn=(
    control: AbstractControl,
  ): ValidationErrors | null => {
    let errors: ValidationErrors = [];
    let email = control.get('email');
    let name = control.get('name');
    let street = control.get('street');
    let postalCode = control.get('postalCode');

    if (email && email.value) {
      if (!this.isValidEmail(email.value)) {
        errors["invalidEmail"] = true;
      }
    }else {
      errors["requiredEmail"] = true;
    }

    if (name && name.value) {
      let value = name.value.trim(); // Remove leading and trailing whitespaces
      let length = value.length;

      if ((length <= 2 || length > 50) || !value || (/\d/.test(value)) ) {
        errors["invalidName"] = true;
      }
    } else {
      errors["requiredName"] = true;
    }

    if (street && street.value) {
      let length = street.value.length;

      if (length <= 2 || length > 50) {
        errors["invalidStreet"] = true;
      }
    } else {
      errors["requiredStreet"] = true;
    }

    if (postalCode && postalCode.value) {
      let length = postalCode.value.length;

      if (length <= 2 || length > 50) {
        errors["invalidPostalCode"] = true;
      }
    } else {
      errors["requiredPostalCode"] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
  onSubmit() {
    this.addColaboratorForm.updateValueAndValidity();
    this.tryToSubmit = true;
    if (this.addColaboratorForm.valid) {
      const colaborator: Colaborators = this.addColaboratorForm.value;
      this.colaboratorsService.createColaborator(colaborator).subscribe({
        next: response => {
          console.log("done it");
        },
        error: error => {
          console.log("error");
        },
        complete: () => {
          // Enable the submit button after the request is completed
          this.goBack();
        }
      });
    }
  }
  isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  goBack(): void {
    this.closeShowComponent.emit(false);
  }
}
