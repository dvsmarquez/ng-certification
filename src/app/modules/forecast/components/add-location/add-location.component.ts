import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ERRORS } from '../../../shared/models/generics.model';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  formGroup: FormGroup;

  submitted: boolean;

  error: ERRORS;

  readonly ERROR_TYPES = ERRORS;

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.initForm();
  }

  addLocation(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const onSuccess = (result: string[]): void => {
      if (!result.length) {
        this.error = ERRORS.ALREADY_SET;

        return;
      }

      this.formGroup.reset();
    };

    const onError = (error: HttpErrorResponse): void => {
      let errorType: ERRORS;

      switch (error.status) {
        case 404:
          errorType = ERRORS.NOT_FOUND;
          break;
        default:
          errorType = ERRORS.SERVICE_UNAVAILABLE;
      }

      this.error = errorType;
    }

    const onCompleted = (): void => {
      this.submitted = false;
    };

    const { zipCode } = this.formGroup.value;

    this.forecastService.saveLocation(zipCode)
      .subscribe({ next: onSuccess, error: onError, complete: onCompleted });
  }

  private initForm(): void {
    const zipCodeControl = new FormControl(undefined, [Validators.required]);

    this.formGroup = new FormGroup({
      zipCode: zipCodeControl
    });

    this.formGroup.controls.zipCode.valueChanges.subscribe(() => this.clearError());
  }

  private clearError(): void {
    this.error = undefined;
  }

}
