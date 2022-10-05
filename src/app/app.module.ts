import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { OkDialogComponent } from './shared/components/ok-dialog/ok-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ConfirmationDialogComponent,
    OkDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    NgxMaskModule.forRoot({ dropSpecialCharacters: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
