import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  senha: string = '';
  loginError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.loginError$.subscribe(error => {
      this.loginError = error;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onLogin(): void {
    if (this.username.trim() && this.senha.trim()) {
      this.authService.login(this.username.trim(), this.senha.trim());
    } else {
      console.warn('Nome de usuário e senha não podem ser vazios.');
      this.loginError = true;
    }
  }
}
