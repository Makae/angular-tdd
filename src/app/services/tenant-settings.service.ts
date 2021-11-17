import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface TenantSettings {
  tenantId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenantSettingsService {

  private tenantSettingsSubject = new BehaviorSubject<TenantSettings>({
    tenantId: "my-initial-id"
  });

  public changeTenant(tenantId: string): void {
    this.tenantSettingsSubject.next({
      tenantId: tenantId
    });
  }

  public tenantSettingsChanges(): Observable<TenantSettings> {
    return this.tenantSettingsSubject.asObservable();
  }
}

