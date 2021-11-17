import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  public unsubscribes: Date[] = [];

  constructor() {
  }

  public lookupTypeAhead(value: string): Observable<string[]> {
    return new Observable<string[]>(subscriber => {

      setTimeout(() => {
        subscriber.next([
          'Hello Dolly',
          'Hello Mr. Bond',
          'Hello World'
        ]);
        subscriber.complete();
      }, 250);

      return () => {
        this.unsubscribes.push(new Date());
      }
    });
  }
}
