import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/users/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService: AuthService){}

  logoutUser() {
    this.authService.logout();
  }
}
