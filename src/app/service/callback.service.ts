import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  private keycloakTokenUrl = 'http://localhost:7080/realms/trainingHubV1/protocol/openid-connect/token';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}


  
  handleExchangeCode(): void {
    //keycload send the authorization code as a parameter in the redirect uri
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.exchangeCodeForToken(code);
      console.log('Authorization code found');
    } else {
      // Handle error or missing code
      console.log('No authorization code found');
    }
  }

  private exchangeCodeForToken(code: string) {
    const body = new URLSearchParams();
    body.set('client_id', 'client2');
    body.set('client_secret', '0QuIpcVrmdH6z2WEeqYNb8e8iWXXiQDW');
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', 'http://localhost:4200/callback'); // Should match the redirect URI used in the login request

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http.post(this.keycloakTokenUrl, body.toString(), { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Token received', response);
          this.accountService.getAccounts(response).subscribe({
            next: (response) => console.log('Accounts retreived', response),
            error: (error) => console.error('There was an error!', error)
          });
          // Handle successful token response (e.g., store token)
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Token exchange failed', error);
          // Handle error
        }
      });
  }}
