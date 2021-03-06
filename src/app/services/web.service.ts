import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  public buscarCep(cep: string): Observable<any>{
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
