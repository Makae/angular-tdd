import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location, LocationService} from 'src/app/services/location.service'

export enum FieldNames {
  NAME = 'name',
  CITY = 'city'
}

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit {

  public formGroup?: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private service: LocationService,
    @Inject(MAT_DIALOG_DATA) private location: Location
  ) {

  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [FieldNames.NAME]: [this.location.name, {validators: [Validators.required]}],
      [FieldNames.CITY]: [this.location.city, {validators: [Validators.required]}]
    });
  }

  public onSave(): void {

    this.location.name = this.formGroup?.controls[FieldNames.NAME].value;
    this.location.city = this.formGroup?.controls[FieldNames.CITY].value;

    this.service.updateLocation(this.location);
  }
}
