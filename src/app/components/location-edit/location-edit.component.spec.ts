import {FieldNames, LocationEditComponent} from './location-edit.component';
import {FormBuilder} from '@angular/forms';
import {Location, LocationService} from '../../services/location.service';

import {of} from 'rxjs';

describe('LocationEditComponent', () => {
  let component: LocationEditComponent;
  const location: Location = {
    id: 123,
    name: 'My location name',
    city: 'My city name'
  };
  let service: LocationService;

  beforeEach(() => {
    service = new LocationService();
    component = new LocationEditComponent(
      new FormBuilder(),
      service,
      location
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare form onInit', () => {
    component.ngOnInit();

    expect(component.formGroup).not.toBeUndefined();
    expect(component.formGroup?.controls[FieldNames.NAME]).not.toBeUndefined();
    expect(component.formGroup?.controls[FieldNames.CITY]).not.toBeUndefined();
  });

  it('should prefill values onInit based on provided data', () => {
    const component = new LocationEditComponent(new FormBuilder(), service, {name: 'TestName', city: 'TestCity'})
    component.ngOnInit();

    expect(component.formGroup?.controls[FieldNames.NAME].value).toBe("TestName");
    expect(component.formGroup?.controls[FieldNames.CITY].value).toBe("TestCity");
  });


  it('should have name and city as required', () => {
    component.ngOnInit();

    component.formGroup?.controls[FieldNames.NAME].setValue(null);
    component.formGroup?.controls[FieldNames.CITY].setValue(null);

    expect(component.formGroup?.controls[FieldNames.NAME].valid).toBe(false);
    expect(component.formGroup?.controls[FieldNames.CITY].valid).toBe(false);
  });


  it('should be able to save', () => {
    component.onSave();
  })

  it('should call service with modified location', () => {
    const newLocation = {id: 123, name: 'New Location', city: 'New City'};
    spyOn(service, "updateLocation").and.returnValues(of());

    component.formGroup?.controls[FieldNames.NAME].setValue(newLocation.name);
    component.formGroup?.controls[FieldNames.CITY].setValue(newLocation.city);

    component.onSave();

    expect(service.updateLocation).toHaveBeenCalledWith(newLocation);
  });
});
