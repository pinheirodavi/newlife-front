import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { VeiculosDetailsComponent } from './components/veiculos-details/veiculos-details.component';
import { VeiculosPanelComponent } from './components/veiculos-panel/veiculos-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeiculosRoutingModule } from './veiculos-routing.module';


@NgModule({
  declarations: [
    VeiculosPanelComponent,
    VeiculosDetailsComponent
  ],
  imports: [
    CommonModule,
    VeiculosRoutingModule,
    AppMaterialModule,
    NgxMaskModule.forChild()
  ]
})
export class VeiculosModule { }
