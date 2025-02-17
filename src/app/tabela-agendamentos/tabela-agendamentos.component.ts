import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendamento } from 'src/Interfaces/agendamento';
import { AgendamentoService } from '../services/agendamento.service';
import { DataShareService } from '../services/data-share.service';
import { mensagemPadrao } from '../shared/helpers/mensagens-padronizadas';

@Component({
  selector: 'app-tabela-agendamentos',
  templateUrl: './tabela-agendamentos.component.html',
  styleUrls: ['./tabela-agendamentos.component.scss']
})
export class TabelaAgendamentosComponent implements OnInit {
  listaAgendamentos:any
  agendamentoSelecionado: Agendamento | undefined;
  mensagemPadrao: Function = mensagemPadrao

  constructor(
    private agensamentoService: AgendamentoService,
    private router: Router
    ) { }

  ngOnInit(): void {

    DataShareService.listaDeAgendamentos.subscribe(lista=>{
      this.listaAgendamentos=lista.reverse()
    })

    this.agensamentoService.listarAgendamentos()
    .subscribe(lista=>{
      this.listaAgendamentos=lista.reverse()
    })

  }
  

  registroSelecionado(registro:any){

    this.router.navigate(['agendamentos/registros/editar'],
      {queryParams: {'id': registro.data.id}});

    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); 
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

  registroDescelecionado(registro:any){
    this.router.navigate(['agendamentos/registros/editar'],
    {queryParams: {'id': "NoData"}});
  }

}
