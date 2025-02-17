import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AgendamentoService } from '../services/agendamento.service';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {

  agendamentos:any
  registroRecebido:any={}

  constructor(private route: ActivatedRoute,
    private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
    // CHAVEAMENTO CONDICIONAL DE 
    // EXIBIÇÃO DE BLOCOS DE TABELAS
    this.agendamentos=false   

    this.route.queryParams.subscribe(params=>{
      if(params.id){
        this.agendamentos=true
        if(params.id=='NoData'){
          // ENVIA OBJETO VAZIO PARA CLEAR DE CAMPOS NO PAINEL
          this.registroRecebido = {}
        } else {
          this.agendamentoService.carregaAgendamentoPorId(params.id)
          .subscribe(data=>{
            this.exibeAgendamentos(true)
            // RECEBE DADOS DE CAMPO SELECIONADO PARA 
            // POPULAR CAMPOS DE PAINEL DE EDIÇÃO
            // COM PARAM ID INFORMADO NA URL
            this.registroRecebido = data
          })
        }
      }
    })
  }

  exibeAgendamentos(event: any){
    this.agendamentos=event
  }


}
