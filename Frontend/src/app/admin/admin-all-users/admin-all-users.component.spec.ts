import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllUsersComponent } from './admin-all-users.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminAllUsersComponent', () => {
  let component: AdminAllUsersComponent;
  let fixture: ComponentFixture<AdminAllUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllUsersComponent ],
      imports: [SharedModule,  HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
