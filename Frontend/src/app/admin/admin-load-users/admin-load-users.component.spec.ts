import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoadUsersComponent } from './admin-load-users.component';

describe('AdminLoadUsersComponent', () => {
  let component: AdminLoadUsersComponent;
  let fixture: ComponentFixture<AdminLoadUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoadUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoadUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
