import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { AgendamentosComponent } from './agendamentos.component';
import { PainelComponent } from '../painel/painel.component';
import { TabelaAgendamentosComponent } from '../tabela-agendamentos/tabela-agendamentos.component';
import { TabelaNovosContatosComponent } from '../tabela-novos-contatos/tabela-novos-contatos.component';

// FRAMEWORKS
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { TableModule } from 'primeng/table';
import { MaterialModule } from '../shared/Modules/material/material.module';

// ROTAS
import { AgendamentosRoutingModule } from './agendamentos.routing.module';
import { LocalOnlyPipe } from '../shared/pipes/local-only.pipe';


@NgModule({
  declarations: [
    // COMPONENTES USADOS NO MODULO
    AgendamentosComponent,
    PainelComponent,
    TabelaAgendamentosComponent,
    TabelaNovosContatosComponent,
    LocalOnlyPipe
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 

    // MODULO COM RECURSOS DO MATERIAL USADOS NO PROJETO
    MaterialModule,

    // MODULO FLEXLAYOUT USADO PARA DIAGRAMAÇÃO DE TEMPLATE
    FlexLayoutModule,

    // PACOTE NPM USADO PARA MASCARAS CUSTOMIZADAS DE CAMPOS
    TextMaskModule,
    
    // FRAMEWORK PRIMENG USADO EM SABELAS
    TableModule,
    
    // IMPORT DE ROTAS DO MODULO AGENDAMENTOS
    AgendamentosRoutingModule    
  ]

})
export class AgendamentosModule { }
