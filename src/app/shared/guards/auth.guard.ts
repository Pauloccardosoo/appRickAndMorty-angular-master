import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Se a rota for /auth/login, permite o acesso
    if (state.url.includes('/auth/login')) {
      return true;
    }

    // Verifica se o usuário está autenticado usando o AuthService
    if (this.authService.isAuthenticated()) {
      return true; // Permite o acesso à rota
    } else {
      // Se não estiver autenticado, redireciona para a página de login
      console.log('AuthGuard: Usuário não autenticado, redirecionando para /auth/login');
      this.router.navigate(['/auth/login']);
      return false; // Bloqueia o acesso à rota atual
    }
  }

}
