import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/libs/users/services/auth.service';
import { LocalstorageService } from 'src/app/libs/users/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;


  constructor(private localStorage: LocalstorageService,
    private authService: AuthService){}

  ngOnInit(){
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user-edit'
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-prime',
        routerLink: '/admin',
        visible: this.showAdmin()
      },
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logoutUser()
      }
    ]

  }

  userLogIn(){
    console.log("Log in");

  }

  userDetails(){}

  isUserLoggedIn(){
    const token = this.localStorage.getToken();
    let tokenDecode;
    if(token){
       tokenDecode = JSON.parse(atob(token.split('.')[1]));

    }
    if(token && !this.localStorage._tokenExpired(tokenDecode.exp)){
        return true;
    }else{
      return false;
    }

  }

  showAdmin(){
    const token = this.localStorage.getToken();
    let tokenDecode;
    if(token){
       tokenDecode = JSON.parse(atob(token.split('.')[1]));

    }
    if(token && tokenDecode.isAdmin && !this.localStorage._tokenExpired(tokenDecode.exp)){
        return true;
    }else{
      return false;
    }
  }

  logoutUser(){
    this.authService.logout();
  }

}
