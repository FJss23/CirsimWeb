import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoadUsersComponent } from './admin-load-users.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminLoadUsersComponent', () => {
  let component: AdminLoadUsersComponent;
  let fixture: ComponentFixture<AdminLoadUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoadUsersComponent ],
      imports: [SharedModule, HttpClientModule, RouterTestingModule ]
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
