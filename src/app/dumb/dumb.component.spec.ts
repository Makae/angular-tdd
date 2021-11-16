import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DumbComponent} from './dumb.component';
import {By} from '@angular/platform-browser';

describe('DumbComponent', () => {
  let component: DumbComponent;
  let fixture: ComponentFixture<DumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DumbComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button', () => {
    const button = fixture.debugElement.query(By.css("button"));
    expect(button).toBeTruthy();
  });

  it('should display content', () => {
    const p = fixture.debugElement.query(By.css("p"));
    expect(p.nativeElement.innerText as string).toContain("dumb works!");
  });

  it('should handle input', () => {
    const p = fixture.debugElement.query(By.css("p.input"));

    component.inputValue = 'input works!';

    fixture.detectChanges();

    expect(p.nativeElement.innerText as string).toContain("input works!");
  });

  // Event Handling
  it('should update content when onButtonClick is called', () => {
    const button = fixture.debugElement.query(By.css("button"));

    button.triggerEventHandler('click', {});
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css("p"));
    expect(p.nativeElement.innerText as string).toContain("other content");
  });

});
