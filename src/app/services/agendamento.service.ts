import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { take } from "rxjs/operators";
import { Agendamento } from 'src/Interfaces/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  static listaDeAgendamentos = new EventEmitter<any>()

  private readonly API = `${environment.API}data`;

  constructor(private http: HttpClient) { }

  listarAgendamentos(){
    return this.http.get<Agendamento[]>(this.API)
  }

  private novoAgendamento(agendamento:any){
    return this.http.post(this.API, agendamento).pipe(take(1))
  }

  private atualizaAgendamento(agendamento:any){
    return this.http.put(`${this.API}/${agendamento.id}`, agendamento).pipe(take(1))
  }

  salvarOuEditar(agendamento:any){
    if(agendamento.id){
      return this.atualizaAgendamento(agendamento)
    } 
    return this.novoAgendamento(agendamento)
  }

  deletarAgendamento(id:any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }

  carregaAgendamentoPorId(id:any){
    return this.http.get<any>(`${this.API}/${id}`).pipe(take(1))
  }
}
