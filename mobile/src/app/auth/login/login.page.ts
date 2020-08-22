import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/http/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private router: Router , private authService : AuthService ,
             private loadingController : LoadingController) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username   : ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.loadingController.create({
        message : "Connecting . . . "
    }).then(
        (loading) => {
            loading.present() ;
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
                response => {
                    const token = response.jwt;
                    this.authService.setToken(token)  ;
                    this.authService.setUser(response.user)  ;
                    if (token) {
                        if(response.user.authorities[0].authority == 'admin' ){
                            this.authService.setIsAdmin(true)
                        }
                        this.authService.setIsAuthenticated(true);
                        //this.authStatusListener.next(true);
                        const expiresInDuration = 60 * 60 * 10;
                        this.authService.setAuthTimer(expiresInDuration);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                        this.authService.saveAuthData(token, expirationDate ,this.authService.getUser());
                        loading.dismiss() ;
                        this.router.navigate(['/home']);
                    }
                },
                err => {
                    loading.dismiss() ;
                });
        }
    );

  }

}
