import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {PanelManagerService} from "../../services/panel-manager.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../snackbars/snackbar-error/snackbar.component";
import {SnackbarSuccessComponent} from "../snackbars/snackbar-success/snackbar-success.component";
import {User} from "../../interfaces/user";
import {UserPreferences} from "../../interfaces/user-preferences";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  user: User = {
    name: '',
    email: '',
    id: '',
    preferences: {
      selectedCategories: [],
      selectedSubCategories: []
    }
  };

  // selectedCategories: string[] = [];
  // selectedSubCategories: string[] = [];

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, public service: DataService,) {}
  ngOnInit() {
    this.getUserDetails();
    this.getUserPreferences();
  }

  isCategorySelected(category: string) {
    return this.user.preferences.selectedCategories.includes(category);
  }
  isSubCategorySelected(subCategory: string) {
    return this.user.preferences.selectedSubCategories.includes(subCategory);
  }

  toggleCategory(type: string, value: string) {
    if(type==='category'){
      const index = this.user.preferences.selectedCategories.indexOf(value);
      if (index !== -1) {
        this.user.preferences.selectedCategories.splice(index, 1);
      } else {
        this.user.preferences.selectedCategories.push(value);
      }
    }
    else if(type==='subCategory'){
      const index = this.user.preferences.selectedSubCategories.indexOf(value);
      if (index !== -1) {
        this.user.preferences.selectedSubCategories.splice(index, 1);
      } else {
        this.user.preferences.selectedSubCategories.push(value);
      }
    }
  }

  getUserDetails(){
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      console.log("currentUser:", currentUser)
      this.user.name = currentUser.name;
      this.user.email = currentUser.email;
      this.user.id = currentUser.userId;
    }
  }
  // Update user details
  updateUserDetails() {
    console.log("this.user: ",this.user)
    if(this.user.name === '' || this.user.email === ''){
      this.openSnackBarError("Pola Nazwa konta oraz Email nie mogą być puste.");
      return;
    }
    this.authService.updateUserDetails(this.user).subscribe((result) => {
        // this.router.navigate(['/']);
        this.openSnackBarSuccess("Pomyślnie zaktualizowano konto.");
        return result;
      },
      (error) => {
        this.openSnackBarError("Wystąpił błąd, spróbuj ponownie później.");
      });
  }

  getUserPreferences() {
    this.service.getPreferencesById(this.user.id).subscribe(
      (data: UserPreferences) => { // Specify the type as UserPreferencesResponse
        // Check if data.preferences is not null or undefined before assigning
        if (data && data.preferences) {
          this.user.preferences = data.preferences;
          console.log('User preferences:', this.user.preferences);
        }
      },
      (error) => {
        console.error('Error fetching user preferences:', error);
      }
    );
  }

  // Snackbar messages
  openSnackBarError(errorMsg: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data: { errorMsg: errorMsg },
      panelClass: ['snackbar-error-style']
    });
  }
  openSnackBarSuccess(msg: string) {
    this._snackBar.openFromComponent(SnackbarSuccessComponent, {
      duration: 5000,
      data: { msg: msg },
      panelClass: ['snackbar-success-style']
    });
  }
}
