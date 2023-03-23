import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AModuleComponent } from './a-module.component';

describe('AModuleComponent', () => {
  let component: AModuleComponent;
  let fixture: ComponentFixture<AModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
