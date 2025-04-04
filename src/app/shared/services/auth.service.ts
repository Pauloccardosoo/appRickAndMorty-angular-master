import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'currentUser'; // Chave para localStorage

  // BehaviorSubjects para emitir o estado atual
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<string | null>(this.getUserFromStorage());
  private loginErrorSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para o erro de login

  // Observables públicos para os componentes se inscreverem
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();
  public loginError$: Observable<boolean> = this.loginErrorSubject.asObservable(); // Observable para o erro de login

  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Simula o login do usuário.
   * @param username Nome de usuário (mock).
   * @param password Senha do usuário (mock).
   */
  login(username: string, password: string): void {
    this.validateCredentials(username, password).subscribe(isValid => {
      if (isValid) { // Simples validação para o mock
        localStorage.setItem(this.AUTH_KEY, JSON.stringify({ username }));
        this.updateAuthStatus(true, username);
        this.currentUserSubject.next(username); // Emitir o nome de usuário
        this.loginErrorSubject.next(false); // Limpar o erro de login
        this.router.navigate(['/characters']); // Redireciona para a página de personagens após login
      } else {
        // Lógica para lidar com credenciais inválidas (ex: exibir mensagem de erro)
        console.error('Credenciais inválidas');
        this.loginErrorSubject.next(true); // Emitir o erro de login
      }
    });
  }

  /**
   * Valida as credenciais do usuário (mock).
   * @param username Nome de usuário.
   * @param password Senha.
   * @returns True se as credenciais são válidas, false caso contrário.
   */
  private validateCredentials(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('assets/users.json').pipe(
      map(users => {
        return users.some(user => user.username === username && user.password === password);
      })
    );
  }

  /**
   * Realiza o logout do usuário.
   */
  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.updateAuthStatus(false, null);
    this.router.navigate(['/login']).then(() => { // Redireciona para login após logout
      window.location.reload(); // Recarrega a página
    });
  }

  /**
   * Verifica se o usuário está autenticado (baseado na presença do token/usuário no localStorage).
   * @returns true se autenticado, false caso contrário.
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /**
   * Obtém o nome do usuário atual logado.
   * @returns O nome do usuário ou null se não estiver logado.
   */
  getCurrentUser(): string | null {
    return this.getUserFromStorage();
  }

  // --- Métodos privados auxiliares ---

  /**
   * Verifica a presença de dados de autenticação no localStorage.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  /**
   * Obtém os dados do usuário do localStorage.
   */
  private getUserFromStorage(): string | null {
    const storedUser = localStorage.getItem(this.AUTH_KEY);
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.username || null;
      } catch (e) {
        localStorage.removeItem(this.AUTH_KEY); // Limpa se inválido
        return null;
      }
    }
    return null;
  }

  /**
   * Atualiza os BehaviorSubjects com o novo estado de autenticação.
   */
  private updateAuthStatus(isAuthenticated: boolean, username: string | null): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
    this.currentUserSubject.next(username);
  }
}
