import {switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of, timer} from 'rxjs';

export interface Location {
  id?: number;
  name: string;
  city?: string;
}

export interface LocationGroup {
  name: string;
  locationIds: number[];
}

export interface LocationsAndGroups {
  locations: Location[];
  groups: LocationGroup[];
}


export class LocationService {
  private locations: Location[] = [
    {id: 1, name: 'Downtown'},
    {id: 2, name: 'Westside'},
    {id: 3, name: 'Eastside'},
  ]

  private locationGroups: LocationGroup[] = [
    {name: 'Bern', locationIds: [1, 2]},
    {name: 'Matte', locationIds: [2, 3]},
  ]

  public getLocationGroups(): Observable<LocationGroup[]> {
    return timer(10).pipe(switchMap(() => of(this.locationGroups)));
  }

  public getLocations(): Observable<Location[]> {
    return timer(10).pipe(switchMap(() => of(this.locations)));
  }

  public updateLocation(location: Location): Observable<void> {
    return timer(10).pipe(switchMap(() => {
      this.locations.push(location);
      return EMPTY;
    }));
  }

}
