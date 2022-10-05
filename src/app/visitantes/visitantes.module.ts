import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitantesRoutingModule } from './visitantes-routing.module';
import { VisitantesPanelComponent } from './components/visitantes-panel/visitantes-panel.component';
import { VisitantesDetailsComponent } from './components/visitantes-details/visitantes-details.component';


@NgModule({
  declarations: [
    VisitantesPanelComponent,
    VisitantesDetailsComponent
  ],
  imports: [
    CommonModule,
    VisitantesRoutingModule,
    AppMaterialModule,
    NgxMaskModule.forChild()
  ]
})
export class VisitantesModule { }
