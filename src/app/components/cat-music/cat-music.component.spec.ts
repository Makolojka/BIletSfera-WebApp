import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMusicComponent } from './cat-music.component';

describe('CatMusicComponent', () => {
  let component: CatMusicComponent;
  let fixture: ComponentFixture<CatMusicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatMusicComponent]
    });
    fixture = TestBed.createComponent(CatMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
