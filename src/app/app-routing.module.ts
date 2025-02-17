import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path: "",
  pathMatch: "full",
  redirectTo: "agendamentos"
},
{
  path: "agendamentos",
  loadChildren: ()=>import('./agendamentos/agendamentos.module')
  .then(module=>module.AgendamentosModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
