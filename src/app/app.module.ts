import { ErrorInterceptor } from './interceptors/error-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './views/pessoas/pessoas.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CadastroclientefisicoComponent } from './views/cadastroclientefisico/cadastroclientefisico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { RelatorioComponent } from './components/relatorio/relatorio.component'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    CadastroclientefisicoComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxBootstrapConfirmModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
