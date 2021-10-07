import { AlertaService } from './../../services/alerta.service';
import { WebService } from './../../services/web.service';
import { FormularioValidator } from './../../utils/formulario-validator';
import { ClienteFisicoService } from './../../services/cliente-fisico.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastroclientefisico',
  templateUrl: './cadastroclientefisico.component.html',
  styleUrls: ['./cadastroclientefisico.component.scss']
})
export class CadastroclientefisicoComponent implements OnInit {

  formulario: FormGroup
  id: number = -1
  texto: string = ''


  constructor(private formBuilder: FormBuilder, private clienteFisicoService: ClienteFisicoService, private webService: WebService,  private alertaService: AlertaService, private route: ActivatedRoute, private router: Router) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      "telefone": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      "cpf": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      "endereco": formBuilder.group({
        "cep": ['', [Validators.minLength(1), Validators.maxLength(11)]],
        "rua": ['', [Validators.minLength(1), Validators.maxLength(255)]],
        "numero": ['', [Validators.minLength(1), Validators.maxLength(255)]],
        "complemento": ['', [Validators.minLength(1), Validators.maxLength(255)]],
        "bairro": ['', [Validators.minLength(1), Validators.maxLength(255)]],
        "cidade": ['', [Validators.minLength(1), Validators.maxLength(255)]],
        "uf": ['', [Validators.minLength(1), Validators.maxLength(255)]],
      })
    })

    this.inicializarComponente()
   }

  ngOnInit(): void {
  }

  inicializarComponente(): void {
    this.route.params.subscribe(data => {
      if(data.id){
        this.id = data.id
      }
    })

    this.texto = this.isAtualizar() ? 'Atualizar': 'Salvar'

    if(this.isAtualizar()){
      this.clienteFisicoService.buscarPorId(this.id).subscribe(data => {
        this.formulario.get('nome')?.setValue(data.nome)
        this.formulario.get('telefone')?.setValue(data.telefone)
        this.formulario.get('cpf')?.setValue(data.cpf)
        this.formulario.get('endereco.cep')?.setValue(data.endereco.cep)
        this.formulario.get('endereco.rua')?.setValue(data.endereco.rua)
        this.formulario.get('endereco.numero')?.setValue(data.endereco.numero)
        this.formulario.get('endereco.complemento')?.setValue(data.endereco.complemento)
        this.formulario.get('endereco.bairro')?.setValue(data.endereco.bairro)
        this.formulario.get('endereco.cidade')?.setValue(data.endereco.cidade)
        this.formulario.get('endereco.uf')?.setValue(data.endereco.uf)

      })
    }
  }

  public isAtualizar(): boolean{
    return this.id > 0? true : false
  }

  buscarCep(): void {
    if(this.formulario.get('endereco.cep')?.value.length == 8){
      this.webService.buscarCep(this.formulario.get('endereco.cep')?.value).subscribe(data => {
        if(data.erro){
          this.alertaService.alertaAviso('Cep inválido!')
          return
        }
        this.formulario.get('endereco.rua')?.setValue(data.logradouro)
        this.formulario.get('endereco.bairro')?.setValue(data.bairro)
        this.formulario.get('endereco.cidade')?.setValue(data.localidade)
        this.formulario.get('endereco.uf')?.setValue(data.uf)
      })
    }
  }

  public salvar(): void {
    if(this.formulario.invalid){
      return
    }

    let mensagem: string = `Cliente físico ${this.isAtualizar()? 'Atualizado': 'Inserido'} com sucesso!`

    if(this.isAtualizar()){
      this.clienteFisicoService.atualizar(this.formulario.value, this.id).subscribe(data => {
        this.alertaService.alertaSucesso(mensagem)
        this.router.navigate([''])
      })
    }else{
      this.clienteFisicoService.salvar(this.formulario.value).subscribe(data => {
        this.alertaService.alertaSucesso(mensagem)
        this.router.navigate([''])

      })
    }

  }

  getCssFormulario(field: string): any{
    return FormularioValidator.getCssValidator(this.formulario, field)
  }

}
