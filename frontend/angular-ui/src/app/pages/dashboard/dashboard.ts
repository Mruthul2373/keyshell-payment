import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';

import { DashboardService } from '../../services/dashboard.service';

@Component({
selector: 'app-dashboard',
standalone: true,
imports: [
CommonModule,
SidebarComponent,
NavbarComponent
],
templateUrl: './dashboard.html',
styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

dashboardData: any = {
total_users: 0,
total_payments: 0,
revenue: '₹0',
failed_transactions: 0
};

constructor(
private dashboardService: DashboardService
) {}

ngOnInit(): void {

this.loadDashboard();

}

loadDashboard(): void {

this.dashboardService.getDashboardData().subscribe({

  next: (data) => {

    this.dashboardData = data;

    console.log('Dashboard Data:', data);

  },

  error: (error) => {

    console.error('API Error:', error);

  }

});

}

}
