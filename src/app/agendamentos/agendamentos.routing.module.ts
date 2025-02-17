import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabelaAgendamentosComponent } from "../tabela-agendamentos/tabela-agendamentos.component";
import { AgendamentosComponent } from "./agendamentos.component";


const agendamentosRoutes=[
    {path: '', component: AgendamentosComponent,
     children:[         
        {path: "registros", component:TabelaAgendamentosComponent,
            children:[
                {path: "editar",
                 children:[
                    {path:":id",AgendamentosComponent}
                 ]}
            ]}
     ]}
]

@NgModule({
    imports: [RouterModule.forChild(agendamentosRoutes)],
    exports: [RouterModule]
})
export class AgendamentosRoutingModule {}

