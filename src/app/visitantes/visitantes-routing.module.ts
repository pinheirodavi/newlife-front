import { VisitantesDetailsComponent } from './components/visitantes-details/visitantes-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitantesPanelComponent } from './components/visitantes-panel/visitantes-panel.component';

const routes: Routes = [
  { path: '', component: VisitantesPanelComponent },
  { path: ':id', component: VisitantesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitantesRoutingModule { }
