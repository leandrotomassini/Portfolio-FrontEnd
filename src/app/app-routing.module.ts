import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './users/admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GuardService as guard } from './guards/guard.service';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'portfolio', component: PortfolioComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] },
  },

  // rutas a login 
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'portfolio', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
