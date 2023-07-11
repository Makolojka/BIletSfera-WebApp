import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isRightPanelActive = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const register = params['register'];
      if (register === 'true') {
        this.toggleRightPanel();
      }
    });
  }

  signIn() {
    console.log("Sign In");
  }

  signUp() {
    console.log("Sign Up");
  }

  toggleRightPanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
}
