let fii_user = [];
let fii_table = [];

async function carregarDadosUser(url){
    await fetch(url)
            .then(resp => resp.json())
            .then(json => fii_user = json);
    carregarDadosFundos();
}

async function carregarDadosFundos(){
    
    for (let fii of fii_user){
        let json = await fetch(`https://api-simple-flask.herokuapp.com/api/${fii.nome}`)
                        .then(resp => resp.json());
        fii_table.push(json);  
    }
     
    exibirTabela();
}

carregarDadosUser("json/fii.json");

function exibirTabela(){ 
    console.log(fii_user)

    //for(let fii of fii_user){
    //    let dados_fii = fii_table.find( (item) => item.fundo.index);
    //    if(dados_fii.proximoRendimento.rendimento != "-"){
    //        provento = dados_fii.proximoRendimento.rendimento;
    //        data_base = dados_fii.proximoRendimento.dataBase;
    //        data_pagamento = dados_fii.proximoRendimento.dataPag;
    //    } else{
    //        provento = dados_fii.ultimoRendimento.rendimento;
    //        data_base = dados_fii.ultimoRendimento.dataBase;
    //        data_pagamento = dados_fii.ultimoRendimento.dataPag;
    //    }
    //}

    for(i = 0; i < 14; i++ ){
        let fundo = fii_user[i].nome.toUpperCase();
        let setor = fii_table[i].setor;
        let data_base = fii_table[i].ultimoRendimento.dataBase;
        let data_pagamento = fii_table[i].ultimoRendimento.dataPag;
        let provento = fii_table[i].ultimoRendimento.rendimento;
        let cotaAtual = fii_table[i].valorAtual;
        let qtde = fii_user[i].qtde;
        let total_investimento = fii_user[i].totalgasto;
        let precoMedio = total_investimento / qtde;
        let percentual = provento * 100 / cotaAtual;
        let dy = fii_table[i].dividendYield;
        let rendimentoMedio = provento * 100 / cotaAtual;
        document.querySelector("table").innerHTML +=`  <td id='td'>${fundo}</td>
        <td>${setor}</td>
        <td>${data_base}</td>
        <td>${data_pagamento}</td>
        <td>R$ ${provento}</td>
        <td>R$ ${cotaAtual}</td>
        <td>${qtde}</td>
        <td>R$ ${total_investimento}</td>
        <td>R$ ${precoMedio.toFixed(2)}</td>
        <td>R$ ${percentual.toFixed(2)}%</td>
        <td>${dy}%</td>
        <td>R$ ${rendimentoMedio.toFixed(2)}</td>`
    }

    
    let total_gasto = 0;
    let total_provento = 0;
    let total_cotas = cotaAtual * (cotaAtual+i);
    document.querySelector("table").innerHTML += ` <tr class='fundo_total'>
                                                    <td colspan = '4'> Total Geral</td>
                                                    <td>R$ ${total_provento}</td>
                                                    <td>-</td>
                                                    <td>${total_cotas}</td>
                                                    <td>R$ ${total_gasto.toFixed(2)}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    </tr>`;
    
    /* Implemente aqui os cálculos solicitados no PDF,
    os cálculos devem ter como base, uma repetição no vetor fii_user
    e para cada fundo, consulte suas demais informações no vetor fii_table

    DICA para procurar um fundo do vetor fii_user no vetor fii_table
    let dados_fii = fii_table.find( (item) => item.fundo.indexOf(fii.nome.toUpperCase()) >= 0);

    Dentro da repetição, após os cálculos, monte a linha na tabela com o comando

    document.querySelector("table").innerHTML += variável

    Note que o cabeçalho da tabela já está pronto no HTML.
    Fora do for, adicione na tabela a linha final de total conforme exemplo no PDF.
    */ 
}