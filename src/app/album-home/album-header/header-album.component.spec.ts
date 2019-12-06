import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlbumComponent } from './header-album.component';

describe('HeaderAlbumComponent', () => {
  let component: HeaderAlbumComponent;
  let fixture: ComponentFixture<HeaderAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
