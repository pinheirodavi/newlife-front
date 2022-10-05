import { MoradoresDetailsComponent } from './components/moradores-details/moradores-details.component';
import { MoradoresPanelComponent } from './components/moradores-panel/moradores-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MoradoresPanelComponent },
  { path: ':id', component: MoradoresDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoradoresRoutingModule { }
