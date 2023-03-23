import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNavigationComponent } from './room-navigation.component';

describe('RoomNavigationComponent', () => {
  let component: RoomNavigationComponent;
  let fixture: ComponentFixture<RoomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
