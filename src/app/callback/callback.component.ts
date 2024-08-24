import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { CallbackService } from '../service/callback.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{

  constructor(
      private callbackService: CallbackService
  ) {}

  ngOnInit(): void {
    this.callbackService.handleExchangeCode();
  }

 




}
