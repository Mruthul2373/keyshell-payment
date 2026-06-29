import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';

import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './payments.html',
  styleUrls: ['./payments.scss']
})
export class PaymentsComponent implements OnInit {

  payments: any[] = [];

  constructor(
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {

    this.paymentsService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        console.log('Payments:', data);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}