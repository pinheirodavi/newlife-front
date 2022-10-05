import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RgPipe } from '../pipe/rg.pipe';
import { CpfPipe } from './../pipe/cpf.pipe';
import { TelefonePipe } from './../pipe/telefone.pipe';
import { TextoPipe } from './../pipe/texto.pipe';


@NgModule({
  declarations: [
    CpfPipe,
    RgPipe,
    TelefonePipe,
    TextoPipe
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    CpfPipe,
    RgPipe,
    TelefonePipe,
    TextoPipe,
    MatDialogModule,
    MatTableModule],

})
export class AppMaterialModule { }
