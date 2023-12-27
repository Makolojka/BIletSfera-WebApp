import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBuilderComponent } from './room-builder.component';

describe('RoomBuilderComponent', () => {
  let component: RoomBuilderComponent;
  let fixture: ComponentFixture<RoomBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomBuilderComponent]
    });
    fixture = TestBed.createComponent(RoomBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
