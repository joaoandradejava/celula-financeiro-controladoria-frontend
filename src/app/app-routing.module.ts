import { CadastroclientefisicoComponent } from './views/cadastroclientefisico/cadastroclientefisico.component';
import { PessoasComponent } from './views/pessoas/pessoas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'pessoas', pathMatch: 'full'},
  {path: 'pessoas', component: PessoasComponent},
  {path: 'formulario/cliente-fisico', component: CadastroclientefisicoComponent},
  {path: 'formulario/cliente-fisico/:id', component: CadastroclientefisicoComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
