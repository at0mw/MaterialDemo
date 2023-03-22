import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicManagerComponent } from './dynamic-manager.component';

describe('DynamicManagerComponent', () => {
  let component: DynamicManagerComponent;
  let fixture: ComponentFixture<DynamicManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
