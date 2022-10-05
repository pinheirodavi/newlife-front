import { FuncionariosDetailsComponent } from './components/funcionarios-details/funcionarios-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosPanelComponent } from './components/funcionarios-panel/funcionarios-panel.component';

const routes: Routes = [
  { path: '', component: FuncionariosPanelComponent },
  { path: ':id', component: FuncionariosDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
