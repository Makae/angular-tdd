import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface TypingSimulator {
  onKeyUp$: Observable<string>,
  nextKeyStroke: () => void,
  waitForResults: () => void
}

@Injectable({
  providedIn: 'root'
})
export class TypingSimulatorService {

  constructor() {
  }

  public getTypingSimulator(): TypingSimulator {
    return {
      onKeyUp$: new Observable<string>(subscriber => {
        setTimeout(() => subscriber.next("H"), 200);
        setTimeout(() => subscriber.next("He"), 400);
        setTimeout(() => subscriber.next("Hel"), 600);
        setTimeout(() => subscriber.next("Hell"), 800);
      }),
      nextKeyStroke: () => {
        jasmine.clock().tick(201);
      },
      waitForResults: () => {
        jasmine.clock().tick(300);
      }
    }
  }
}
