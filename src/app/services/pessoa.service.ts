import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  public buscarTodos(paginaAtual: number, tamanho: number): Observable<any>{
    return this.http.get(Backend.pessoas + `?page=${paginaAtual}&size=${tamanho}`)
  }

  public deletarPorId(id: number): Observable<any>{
    return this.http.delete(Backend.pessoas + `/${id}`)
  }

  public gerarRelatorio(): Observable<any>{
    return this.http.get(Backend.pessoas + '/relatorio')
  }
}
