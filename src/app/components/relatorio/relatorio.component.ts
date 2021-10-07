import { Component, OnInit } from '@angular/core';
import { Relatorio } from 'src/app/models/relatorio';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {


  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {

    this.pessoaService.gerarRelatorio().subscribe(data => {
      document.querySelector('iframe')!.src = data.relatorio

    })
  }

}
