export function mensagemPadrao(tipo:any,parametro?:any){
    let mensagem:any = {
       'minimoCaracteres':`Mínimo de ${parametro} caracteres`,
       'maximoCaracteres':`Máximo de ${parametro} caracteres`,
       'campoObrigatorio':"Campo obrigatório",
       'sucessoDisparo':"Agendado com sucesso",
       'erroDisparo':"Houve erro no agendamento do disparo",
       'camposPendentes':"Preencher todos os campos",
       "cobrancaForaEstado":"Haverá cobrança para contatos fora do estado"
    }

    console.log(mensagem[tipo])
    return mensagem[tipo]
   }