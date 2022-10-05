import { VeiculosDetailsComponent } from './components/veiculos-details/veiculos-details.component';
import { VeiculosPanelComponent } from './components/veiculos-panel/veiculos-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: VeiculosPanelComponent },
  { path: ':id', component: VeiculosDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
