import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isRightPanelActive = false;
  incorrectCredentials = false;
  inSignUpCorrectCredentials = false;

  public signInCredentials = {
    login: '',
    password: ''
  };

  public signUpCredentials = {
    name: '',
    email: '',
    password: '',
  };

  public logged?: boolean;
  public logout?: boolean;
  public isFormSubmitted: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('cpasswordInput') cpasswordInput: any;
  public cpassword = '';
  isSignUpFormSubmitted = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const register = params['register'];
      if (register === 'true') {
        this.toggleRightPanel();
      }
    });
  }

  //Sign in
  validateForm(): boolean {
    if (!this.signInCredentials.login || !this.signInCredentials.password) {
      this.isFormSubmitted = true;
      return false;
    }
    return true;
  }

  signIn() {
    if (this.validateForm()) {
      return this.authService.authenticate(this.signInCredentials).subscribe(
        (result) => {
          if (!result) {
            this.logged = false;
            // console.log("Coś poszło nie tak");
            this.incorrectCredentials = true;
            // this.openSnackBar("Coś poszło nie tak, spróbuj ponownie", "");
          } else {
            this.logout = false;
            this.signInCredentials = {
              login: '',
              password: ''
            };
            this.router.navigate(['/']);
          }
        },
        (error) => {
          if (error.status === 401 || error.status === 404) {
            this.logged = false;
            console.log("Coś poszło nie tak");
            this.incorrectCredentials = true;
          } else {
            console.error(error);
          }
        }
      );
    }
    return;
  }

  // Sign Up
  submitForm() {
    this.isSignUpFormSubmitted = true;
    const cpassword = this.cpasswordInput.nativeElement.value;
    const password = this.signUpCredentials.password;

    if (this.isFormInvalid()) {
      // Empty fields
      return;
    } else if (this.signUpCredentials.password !== cpassword) {
      // Password mismatch
      return;
    } else if (!this.isPasswordStrong(password)) {
      // Weak password
      return;
    } else {
      // Form viable, create user
      this.create();
    }
  }

  create() {
    this.authService.createOrUpdate(this.signUpCredentials).subscribe((result) => {
        this.router.navigate(['/']);
        return result;
      },
      (error) => {
        if (error.status === 400) {
          // this.openSnackBar("Email lub login zajęte.", "");
          // console.log("Email lub login zajete")
          this.inSignUpCorrectCredentials = true;
        } else {
          console.error(error);
        }
      });
  }

  isFormInvalid() {
    return (
      !this.signUpCredentials.name ||
      !this.signUpCredentials.email ||
      !this.signUpCredentials.password
    );
  }

  isPasswordStrong(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/;
    return strongRegex.test(password);
  }

  // Toggle Panel
  toggleRightPanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
}
