import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      { path: 'moradores', loadChildren: () => import('./moradores/moradores.module').then(m => m.MoradoresModule) },
      { path: 'visitantes', loadChildren: () => import('./visitantes/visitantes.module').then(m => m.VisitantesModule) },
      { path: 'veiculos', loadChildren: () => import('./veiculos/veiculos.module').then(m => m.VeiculosModule) },
      { path: 'funcionarios', loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
