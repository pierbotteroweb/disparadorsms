import { Injectable, EventEmitter } from '@angular/core';
import { AgendamentoService } from './agendamento.service';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  static listaDeAgendamentos = new EventEmitter<any>()
  static listaDeNovosContatos = new EventEmitter<any>()
  static registroParaEditar = new EventEmitter<any>()

  constructor(private agensamentoService: AgendamentoService) { 
    }
    atualizaListaDeAgendamentos(){
      this.agensamentoService.listarAgendamentos()
      .subscribe(lista=>{        
         DataShareService.listaDeAgendamentos.emit(lista)
      })
    }
    importaListaDeNovosContatos(listaNovosContatos:any){
      DataShareService.listaDeNovosContatos.emit(listaNovosContatos)
    }
    editaRegistroDeAgendamentos(registroParaEditar:any){
      DataShareService.registroParaEditar.emit(registroParaEditar)
    }
}
