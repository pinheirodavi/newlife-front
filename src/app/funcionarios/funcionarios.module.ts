import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosPanelComponent } from './components/funcionarios-panel/funcionarios-panel.component';
import { FuncionariosDetailsComponent } from './components/funcionarios-details/funcionarios-details.component';


@NgModule({
  declarations: [
    FuncionariosPanelComponent,
    FuncionariosDetailsComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    AppMaterialModule,
    NgxMaskModule.forChild()
  ]
})
export class FuncionariosModule { }
