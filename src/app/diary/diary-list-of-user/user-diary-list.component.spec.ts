import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiaryListComponent } from './user-diary-list.component';

describe('UserDiaryListComponent', () => {
  let component: UserDiaryListComponent;
  let fixture: ComponentFixture<UserDiaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDiaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
