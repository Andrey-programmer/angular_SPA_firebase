import { User } from 'src/app/shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'block-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(private authServise: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authServise.logout();
    this.router.navigate(['/login']);
    window.localStorage.clear();
  }

}
