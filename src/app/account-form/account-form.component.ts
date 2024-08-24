import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {

constructor(private accountService: AccountService) {}

  accountRequest: AccountRequestDto = {
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  };

  onSubmit() {
    this.accountService.createAccount(this.accountRequest).subscribe({
      next: (response) => console.log('Account created successfully', response),
      error: (error) => console.error('There was an error!', error)
    });
    console.log('Form Submitted!', this.accountRequest);
  }

}

export interface AccountRequestDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
