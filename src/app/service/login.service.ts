import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  // loginRequest = {
  //   username: '',
  //   password: ''
  // };

  private keycloakAuthUrl = 'http://localhost:7080/realms/trainingHubV1/protocol/openid-connect/auth';
  private redirectUri = 'http://localhost:4200/callback';
  private keycloakTokenUrl = 'http://localhost:7080/realms/trainingHubV1/protocol/openid-connect/token';

  constructor(
    private http: HttpClient, 
    private router: Router,
  ) { }


  login() {
    const params = new URLSearchParams({
      client_id: 'client2', // Your client ID
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'openid',
    });
    window.location.href = `${this.keycloakAuthUrl}?${params.toString()}`;
  }

  //this implementation for the password grant flow 
  // onSubmit() {
  //   const body = new URLSearchParams();
  //   body.set('client_id', 'client2');
  //   body.set('client_secret', '0QuIpcVrmdH6z2WEeqYNb8e8iWXXiQDW');
  //   body.set('grant_type', 'password');
  //   body.set('username', this.loginRequest.username);
  //   body.set('password', this.loginRequest.password);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   });

  //   this.http.post(this.keycloakTokenUrl, body.toString(), {headers})
  //     .subscribe({
  //       next: (response: any) => {
  //         console.log('Login successful', response);
  //         this.router.navigate(['/home']);
  //       },
  //       error: (error) => {
  //         console.error('Login failed', error);
  //       }
  //     });
  // }

}
