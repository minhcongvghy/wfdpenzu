import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiaryComponent } from './detail-diary.component';

describe('DetailDiaryComponent', () => {
  let component: DetailDiaryComponent;
  let fixture: ComponentFixture<DetailDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
