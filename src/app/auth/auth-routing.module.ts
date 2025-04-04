import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../shared/guards/auth.guard'; // Importar o AuthGuard

const routes: Routes = [
  {
    path: '', // Rota base do módulo de autenticação
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard] // Aplicar o guard à rota de perfil
      },
      { path: '**', redirectTo: 'login' } // Redireciona qualquer outra rota dentro de /auth para /login
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
