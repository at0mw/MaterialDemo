import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSelectComponent } from './source-select.component';

describe('SourceSelectComponent', () => {
  let component: SourceSelectComponent;
  let fixture: ComponentFixture<SourceSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
