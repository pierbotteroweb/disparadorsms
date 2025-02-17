import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-tabela-novos-contatos',
  templateUrl: './tabela-novos-contatos.component.html',
  styleUrls: ['./tabela-novos-contatos.component.scss']
})
export class TabelaNovosContatosComponent implements OnInit {
  listaNovosContatos:any
  contatoSelecionado: any;

  constructor(
    private dataShareService: DataShareService) { }

  ngOnInit(): void {
    DataShareService.listaDeNovosContatos.subscribe(lista=>{
      this.listaNovosContatos=lista
    })
  }

  selecionaContato(registro:any){
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); 
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
    let obj:any={}

    if(registro.data['nome'].includes(' ')){
      obj['nome']=registro.data['nome'].split(' ')[0]
      obj['sobrenome']=registro.data['nome'].split(' ')[1]
    } else {
      obj['nome']=registro.data['nome']
    }

    obj['telefone']=registro.data['telefone1']


    this.dataShareService.editaRegistroDeAgendamentos(obj)
  }

  deselecionaContato(registro:any){
    this.dataShareService.editaRegistroDeAgendamentos({})
  }

}
