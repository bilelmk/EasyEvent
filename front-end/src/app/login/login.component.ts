import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/http/auth.service';
import { NotificationService } from '../shared/services/interne/notification.service';
import { SpinnerService } from '../shared/services/interne/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error : string = null ;

  constructor(private formBuilder: FormBuilder , private router: Router , private authService : AuthService ,
              private spinnerService: SpinnerService , private notificationService : NotificationService ) {}

  ngOnInit(): void
  {
    this.loginForm = this.formBuilder.group({
      username   : ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }


  onLogin() {
    this.spinnerService.activate();
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      response => {
        const token = response.jwt;
        this.authService.setToken(token)  ;
        this.authService.setUser(response.user)  ;
        if (token && response.user.authorities[0].authority == 'admin' ) {
          this.authService.setIsAuthenticated(true);
          //this.authStatusListener.next(true);
          const expiresInDuration = 60 * 60 * 10;
          this.authService.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.authService.saveAuthData(token, expirationDate ,this.authService.getUser());
          this.router.navigate(['/main/events']);
          this.notificationService.openSnackBar('Login successful' , 'green-snackbar')
        }
        else {
          this.notificationService.openSnackBar('You are not authorized' , 'red-snackbar')
        }
        this.spinnerService.deactivate();

      },
      err => {
        this.spinnerService.deactivate();
        this.notificationService.openSnackBar('Erreur : Check your username and password' , 'red-snackbar')
      });
  }
}
