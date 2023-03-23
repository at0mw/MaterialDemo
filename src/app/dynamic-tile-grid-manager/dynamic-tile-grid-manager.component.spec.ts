import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTileGridManagerComponent } from './dynamic-tile-grid-manager.component';

describe('DynamicTileGridManagerComponent', () => {
  let component: DynamicTileGridManagerComponent;
  let fixture: ComponentFixture<DynamicTileGridManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTileGridManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTileGridManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
