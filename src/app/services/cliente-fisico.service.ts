import { ClienteFisicoInput } from './../models/cliente-fisico-input';
import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteFisicoService {

  constructor(private http: HttpClient) { }

  public buscarPorId(id: number): Observable<any>{
    return this.http.get(Backend.clienteFisico + `/${id}`)
  }

  public salvar(clienteFisicoInput: ClienteFisicoService): Observable<any>{
    return this.http.post(Backend.clienteFisico, clienteFisicoInput)
  }

  public atualizar(clienteFisicoInput: ClienteFisicoInput, id: number): Observable<any>{
    return this.http.put(Backend.clienteFisico + `/${id}`, clienteFisicoInput)
  }

}
