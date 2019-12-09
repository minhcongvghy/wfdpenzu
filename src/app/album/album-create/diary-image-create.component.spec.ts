import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryImageCreateComponent } from './diary-image-create.component';

describe('DiaryImageCreateComponent', () => {
  let component: DiaryImageCreateComponent;
  let fixture: ComponentFixture<DiaryImageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryImageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryImageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
