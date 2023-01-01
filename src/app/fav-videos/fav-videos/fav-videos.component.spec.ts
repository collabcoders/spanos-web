import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavVideosComponent } from './fav-videos.component';

describe('FavVideosComponent', () => {
  let component: FavVideosComponent;
  let fixture: ComponentFixture<FavVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
