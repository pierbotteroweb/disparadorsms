import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AgendamentoService } from '../services/agendamento.service';
import { DataShareService } from '../services/data-share.service';
import { textMaskFormats } from '../shared/helpers/input-mask';
import { mensagemPadrao } from '../shared/helpers/mensagens-padronizadas';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {
  datemask = textMaskFormats('datemask');
  timemask = textMaskFormats('timemask');
  phonemask = textMaskFormats('phonemask'); 
  
  @Output() exibeAgendamentosEmmiter = new EventEmitter;
  @Input() registroRecebido = {}
  exibeAgendamentos:boolean=false
  modoEdicao:boolean=false
  idRegistroEditado:any
  camposPendentes:boolean=false
  registroSalvoComSucesso:boolean=false
  mensagemPadrao: Function = mensagemPadrao

  painelFormGroup: any;
  public arquivoCsv: any = '';


  constructor(
    private agendamentoService: AgendamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataShareService: DataShareService
  ) { 
    
    this.painelFormGroup = this.formBuilder.group({
        nomeFormControl: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        sobrenomeFormControl: [null, [Validators.minLength(2), Validators.maxLength(35)]],
        telefone1FormControl: [null, [Validators.required, Validators.minLength(11),Validators.maxLength(13),this.localDddValidator]],
        telefone2FormControl: [null, [Validators.minLength(11),Validators.maxLength(13),this.localDddValidator]],
        dataFormControl: [null, [Validators.required]],
        horaFormControl: [null, [Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
        mensagemFormControl: [null, [Validators.required, Validators.minLength(10),Validators.maxLength(160)]],
  })  
}


  get nomeFormControl() { return this.painelFormGroup.get('nomeFormControl') as FormControl;}
  get sobrenomeFormControl() { return this.painelFormGroup.get('sobrenomeFormControl') as FormControl;}
  get telefone1FormControl() { return this.painelFormGroup.get('telefone1FormControl') as FormControl;}
  get telefone2FormControl() { return this.painelFormGroup.get('telefone2FormControl') as FormControl;}
  get dataFormControl() { return this.painelFormGroup.get('dataFormControl') as FormControl;}
  get horaFormControl() { return this.painelFormGroup.get('horaFormControl') as FormControl;}
  get mensagemFormControl() { return this.painelFormGroup.get('mensagemFormControl') as FormControl;}

  ngOnInit(): void {
    this.modoEdicao=false
    DataShareService.registroParaEditar.subscribe((registro:any)=>{
      this.painelFormGroup.get('nomeFormControl').setValue(registro.nome)
      this.painelFormGroup.get('sobrenomeFormControl').setValue(registro.sobrenome)  
      this.painelFormGroup.get('telefone1FormControl').setValue(registro.telefone) 
    })

    this.painelFormGroup.valueChanges.subscribe((value:any)=>{
      this.registroSalvoComSucesso=false;    
    })
  }

  localDddValidator(telefone: AbstractControl){
    if(telefone.value&&telefone.value.substring(0,2)!="11"){
      return {
        onlyLocal: true
      }
    } else {
      return null
    }

  }

  ngOnChanges(changes: any){
    if(!changes.registroRecebido.firstChange){
      
      this.populandoFormularioPainel(changes.registroRecebido.currentValue)
      this.exibeAgendamentosEmmiter.emit(this.exibeAgendamentos)
    }
  }

  populandoFormularioPainel(registro:any){
    this.painelFormGroup.get('nomeFormControl').setValue(registro.nome)
    this.painelFormGroup.get('sobrenomeFormControl').setValue(registro.sobrenome)
    this.painelFormGroup.get('dataFormControl').setValue(registro.data)
    this.painelFormGroup.get('horaFormControl').setValue(registro.hora)
    this.painelFormGroup.get('telefone1FormControl').setValue(registro.telefone)
    this.painelFormGroup.get('mensagemFormControl').setValue(registro.mensagem)
    this.idRegistroEditado=registro.id

    if(registro.data){
      this.modoEdicao=true
    } else{
      this.modoEdicao=false
    }

  }

  dateFromat(date: Date){
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

  }

  toggleAgendamentos(){    
    this.exibeAgendamentos=!this.exibeAgendamentos
    let objToSend: NavigationExtras = { relativeTo: this.route }
    let destino = this.exibeAgendamentos?"registros":""
    this.router.navigate([destino], objToSend)
    this.exibeAgendamentosEmmiter.emit(this.exibeAgendamentos)
  }

  uploadCSV(event: any) {   
    this.arquivoCsv = event.target.files[0];    
    let arquivo = new FileReader();
    arquivo.readAsText(this.arquivoCsv);
    arquivo.onload = (event) => {
      let conteudo:any = arquivo.result
      let registros: any=[]
      let listaRegistros = conteudo.split('\n')
      listaRegistros.map((registro:any)=>{
        let regLimpo = registro.replace(/\s{2,}/g, ' ').trim();
        let arrRegLimpo = regLimpo.split(",")
        if(regLimpo){
          registros.push({
            "nome":arrRegLimpo[0],
            "telefone1":arrRegLimpo[1],
            "telefone2":arrRegLimpo[2]}
            )
        }
      })
      this.dataShareService.importaListaDeNovosContatos(registros) 
    }
  }

  deletarAgendamento(){
    this.agendamentoService.deletarAgendamento(this.idRegistroEditado)
    .subscribe(res=>{
      this.modoEdicao=false
      this.painelFormGroup.reset()
      this.dataShareService.atualizaListaDeAgendamentos()
      this.idRegistroEditado=null
    })
  }

  salvaAgendamento(novoAgendamento?:any){
    
    if(novoAgendamento){
      this.idRegistroEditado=null
    }

    let objetoregistro:any = {}
        objetoregistro['nome']=this.nomeFormControl.value
        objetoregistro['sobrenome']=this.sobrenomeFormControl.value
        objetoregistro['telefone']=this.telefone1FormControl.value
        objetoregistro['data']=this.dataFormControl.value
        objetoregistro['mensagem']=this.mensagemFormControl.value
        objetoregistro['hora']=this.horaFormControl.value

    if(this.idRegistroEditado){
      objetoregistro['id']=this.idRegistroEditado
    }

    if(this.painelFormGroup.valid){      
      this.agendamentoService.salvarOuEditar(objetoregistro).subscribe(response=>{
          this.camposPendentes=false
          this.modoEdicao=false
          this.painelFormGroup.reset()
          this.dataShareService.atualizaListaDeAgendamentos()
          this.idRegistroEditado=null
          this.registroSalvoComSucesso=true
          this.router.navigate(['agendamentos/registros'])
      })
    } else{
      this.camposPendentes=true
      this.registroSalvoComSucesso=false
    }
  }
}
