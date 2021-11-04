import {BehaviorSubject, Observable} from 'rxjs';

export interface Location {
  id: number;
  name: string;
}

export enum TimeResolution {
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK"
}

export interface Filter {
  timeResolution: TimeResolution;
}

export class FilterService {
  private subject = new BehaviorSubject<Filter>({timeResolution: TimeResolution.WEEK});

  public filterChanges(): Observable<Filter> {
    return this.subject.asObservable();
  }

  public setFilter(filter: Filter) {
    this.subject.next(filter);
  }

}
