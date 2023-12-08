import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthComponent } from './user-auth.component';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {AuthService} from "../../services/auth.service";
//
// describe('LoginComponent', () => {
//   let component: UserAuthComponent;
//   let fixture: ComponentFixture<UserAuthComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UserAuthComponent]
//     });
//     fixture = TestBed.createComponent(UserAuthComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

class MockAuthService {
  authenticate(credentials: any): Observable<boolean> {
    // Mock the behavior of the authenticate method as needed for your tests
    return of(true); // Return a mock observable, adjust as necessary
  }
}
describe('UserAuthComponent', () => {
  let component: UserAuthComponent;
  let fixture: ComponentFixture<UserAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [UserAuthComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ register:"true" }) } } },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },
        { provide: Router, useValue: {router: Router} },
        { provide: AuthService, useClass: MockAuthService },
      ]
    });
    fixture = TestBed.createComponent(UserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should return false when sign-in form is invalid', () => {
    component.signInCredentials.login = ''; // Empty login
    component.signInCredentials.password = 'password'; // Valid password

    const isValid = component.validateForm();
    expect(isValid).toBe(false);
  });

  it('should return true when sign-in form is valid', () => {
    component.signInCredentials.login = 'john@example.com'; // Valid login
    component.signInCredentials.password = 'StrongPassword123'; // Valid password

    const isValid = component.validateForm();
    expect(isValid).toBe(true);
  });

});
