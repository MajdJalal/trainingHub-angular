import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountRequestDto } from '../account-form/account-form.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8072/accounts/v1';

  

  constructor(private http : HttpClient) { }

  createAccount(accountRequestDto : AccountRequestDto) : Observable<any> {
    return this.http.post<any>(this.apiUrl, accountRequestDto);
  } 

  getAccounts(tokenResponse: any) : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${tokenResponse.access_token}`
    });
    return this.http.get(this.apiUrl, {headers})
  }
}
