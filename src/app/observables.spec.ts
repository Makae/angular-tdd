import {Location, LocationsAndGroups, LocationService} from './services/location.service';
import {combineLatest, forkJoin, Observable} from 'rxjs';

describe('Observables', () => {
  const locationService = new LocationService();
  const myNewLocation: Location = {id: 42, name: 'My Location'};

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });


  describe('[Setup] Test services', () => {
    it('should fetch locations', () => {
      let result;
      locationService.getLocations().subscribe((locations) => {
        result = locations;
      });
      jasmine.clock().tick(100);

      expect(result).toHaveSize(3);
    });

    it('should fetch locationGroups', () => {
      let result;
      locationService.getLocationGroups().subscribe((groups) => {
        result = groups;
      });
      jasmine.clock().tick(100);

      expect(result).toHaveSize(2);
    });

    it('should trigger correct callbacks when EMPTY observable', () => {
      let nextCalled = false;
      let completeCalled = false;
      let errorCalled = false;
      locationService.updateLocation(myNewLocation)
        .subscribe({
          next: () => nextCalled = true,
          complete: () => completeCalled = true,
          error: () => errorCalled = true
        });
      jasmine.clock().tick(100);

      expect(nextCalled).toBe(false);
      expect(completeCalled).toBe(true);
      expect(errorCalled).toBe(false);
    });
  });

  describe('[Basics] Custom Observable', () => {
    /**
     * An Observable is just a Promise which has 0 or more return values over its lifetime
     */
    it('should work with custom observable ', () => {
      const emittedValues: string[] = [];
      let completeCalled = false;
      let errorCalled = false;

      const observable = new Observable<string>(observer => {
        observer.next("first");
        observer.next("second");
        observer.next("third");
        observer.complete();
      });

      observable.subscribe({
        next: value => emittedValues.push(value),
        complete: () => completeCalled = true,
        error: () => errorCalled = true
      });

      expect(emittedValues).toEqual(["first", "second", "third"]);
      expect(completeCalled).toBeTrue();
      expect(errorCalled).toBeFalse();
    });
  });

  describe('[Combine / Coordinate Requests]', () => {
    it('should fetch locationGroups and locations in parallel with combineLatest', () => {
      let result: LocationsAndGroups | undefined;
      /**
       * combineLatest triggers the <next> callback with latest values of each Observables
       * if an observable does not emit a <next> value it will also not trigger the change
       * This is often the case for HTTP responses with an empty body
       */
      combineLatest([
        locationService.getLocations(),
        locationService.getLocationGroups()
      ]).subscribe(([locations, groups]) => {
        result = {locations, groups};
      });
      jasmine.clock().tick(100);

      expect(result?.locations).toHaveSize(3);
      expect(result?.groups).toHaveSize(2);
    });

    it('should fetch locationGroups and locations in parallel with forkJoin', () => {
      /**
       * forkJoin waits for the COMPLETION of all its inner observables after which it calls next()
       * on its outer observable. The content of arguments passed to the subscribe methods are the last next values of the
       * observables.
       *
       * See also "Should return last next value with fork Join"
       */
      let result: LocationsAndGroups | undefined;
      forkJoin({
        locations: locationService.getLocations(),
        groups: locationService.getLocationGroups()
      }).subscribe((groups) => {
        result = groups;
      });
      jasmine.clock().tick(100);

      expect(result?.locations).toHaveSize(3);
      expect(result?.groups).toHaveSize(2);
    });
  });

  describe('[Bad Examples]', () => {
    it('should not trigger with combineLatest when Fetching after Update', () => {
      let result;

      // Do not use it this way, as updateLocation will never emit a <next> value,
      // so there is one of the 2 values missing which combineLatest requires
      // for triggering the outer observables' <next> callback
      combineLatest([
        locationService.updateLocation(myNewLocation),
        locationService.getLocationGroups()
      ]).subscribe(([locations, groups]) => {
        result = {locations, groups};
      });
      jasmine.clock().tick(100);

      expect(result).toBeUndefined();
    });
  });

});
