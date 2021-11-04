import {switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of, timer} from 'rxjs';

export interface Location {
  id: number;
  name: string;
}

export interface LocationGroup {
  name: string;
  locationIds: number[];
}

export interface LocationsAndGroups {
  locations: Location[];
  groups: LocationGroup[];
}

const locations: Location[] = [
  {id: 1, name: 'Downtown'},
  {id: 2, name: 'Westside'},
  {id: 3, name: 'Eastside'},
]

const locationGroups: LocationGroup[] = [
  {name: 'Bern', locationIds: [1, 2]},
  {name: 'Matte', locationIds: [2, 3]},
]

export class LocationService {
  public getLocationGroups(): Observable<LocationGroup[]> {
    return timer(10).pipe(switchMap(() => of(locationGroups)));
  }

  public getLocations(): Observable<Location[]> {
    return timer(10).pipe(switchMap(() => of(locations)));
  }

  public updateLocation(location: Location): Observable<void> {
    return timer(10).pipe(switchMap(() => EMPTY));
  }

}
