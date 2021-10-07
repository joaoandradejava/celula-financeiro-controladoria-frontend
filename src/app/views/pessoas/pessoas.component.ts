import { RelatorioComponent } from './../../components/relatorio/relatorio.component';
import { CadastroclientefisicoComponent } from './../cadastroclientefisico/cadastroclientefisico.component';
import { PessoaModel } from './../../models/pessoa-model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  pessoas: PessoaModel[] = []
  paginaAtual: number = 0
  tamanho: number = 5
  totalElements: number = -1
  modalRef?: BsModalRef;

  constructor(private pessoaService: PessoaService, private router: Router, private alertaService: AlertaService, private ngxBootstrapConfirmService: NgxBootstrapConfirmService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  public buscarTodos(): void {
    this.pessoaService.buscarTodos(this.paginaAtual, this.tamanho).subscribe(data => {
      this.pessoas = data.content
      this.totalElements = data.totalElements
    })
  }

  isVazio(): boolean{
    return this.totalElements >0 ? false: true
  }

  editar(id: number, tipo: string): void {
    if(tipo = 'PF'){
      this.router.navigate(['formulario/cliente-fisico/' + id])

    }
  }

  deletar(id: number): void {

    let options ={
      title: 'Deseja realmente deletar está pessoa do sistema?',
      confirmLabel: 'Deletar',
      declineLabel: 'Cancelar'
    }
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {

        this.pessoaService.deletarPorId(id).subscribe(data => {
          this.alertaService.alertaSucesso('Pessoa deletada com sucesso!')
          this.paginaAtual = 0
          this.buscarTodos()
        })
      }
    });
  }

  pageChanged(event: any): void {
    this.paginaAtual = event.page - 1
    this.buscarTodos()
  }

  abrirModalRelatorio() {
    this.modalRef = this.modalService.show(RelatorioComponent, {
      class: 'modal-lg'
    });

    this.modalRef.content.closeBtnName = 'Close'
  }


}
