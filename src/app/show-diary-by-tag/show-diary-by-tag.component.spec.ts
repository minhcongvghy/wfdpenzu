import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiaryByTagComponent } from './show-diary-by-tag.component';

describe('ShowDiaryByTagComponent', () => {
  let component: ShowDiaryByTagComponent;
  let fixture: ComponentFixture<ShowDiaryByTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDiaryByTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDiaryByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
