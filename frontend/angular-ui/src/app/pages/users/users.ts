import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users.service';
import { SidebarComponent } from '../../layout/sidebar/sidebar';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {

    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users:', data);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });

  }

}