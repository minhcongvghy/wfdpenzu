import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageToAlbumComponent } from './add-image-to-album.component';

describe('AddImageToAlbumComponent', () => {
  let component: AddImageToAlbumComponent;
  let fixture: ComponentFixture<AddImageToAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageToAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageToAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
