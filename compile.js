var error = false;
var automato = [];
var estadoInicial;
var estadoAtual;
var tabelaSimbolos;

function Estado(tokens, msgErro, lerTokenEspecial, acaoSemantica) {
    this.tokens = tokens;
    this.msgErro = msgErro;
    this.lerTokenEspecial = lerTokenEspecial || function(token) { return false; };
    this.acaoSemantica = acaoSemantica || function(token) {};
    this.lerToken = function (token) {
        if (tokens[token]) {
            estadoAtual = automato[tokens[token]];
        } else if (this.lerTokenEspecial(token)) {
            estadoAtual = automato[this.lerTokenEspecial(token)];
            this.acaoSemantica(token);
        } else {
            error = true;
        }
    }
}

function palavrarPertenceALinguagem(palavra, regex) {
    var m = palavra.match(regex);
    return (m.length == 1 && m == palavra);
}

function checarVariavelEstado2(token) {
    return palavrarPertenceALinguagem(token, /[a-zA-Z][a-zA-Z0-9]*\$/) ? 3 : false;
}

function adicionarNaTabelaDeSimbolos(token) {
    tabelaSimbolos[token] = true;
}

function checarTabelaSimbolosEstado5(token) {
    return tabelaSimbolos[token] ? 6 : null;
}

function checarTabelaSimbolosEstado7(token) {
    return tabelaSimbolos[token] ? 8 : null;
}

function checarTabelaSimbolosEstado11(token) {
    return tabelaSimbolos[token] ? 12 : null;
}

function checarTabelaSimbolosOuNumInteiroEstado13(token) {
    if (tabelaSimbolos[token]) {
        return 15;
    } else {
        return palavrarPertenceALinguagem(token, /[0-9]+/) ? 14 : null;
    }
}

function checarTabelaSimbolosEstado16(token) {
    return tabelaSimbolos[token] ? 17 : null;
}

function lerTextoQualquerEstado9(token) {
    return 9;
}

estadoInicial = new Estado({ 'programa': 1 }, 'Esperado ID=programa');

/*Estado  0*/ automato.push(estadoInicial);
/*Estado  1*/ automato.push(new Estado({ 'var': 2 }, 'Esperado ID=var'));
/*Estado  2*/ automato.push(new Estado({ ';': 4 }, 'Esperado ID=;', checarVariavelEstado2, adicionarNaTabelaDeSimbolos));
/*Estado  3*/ automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
/*Estado  4*/ automato.push(new Estado({ 'leia': 5 }, 'Esperado ID=leia'));
/*Estado  5*/ automato.push(new Estado({ }, 'Esperado uma variável', checarTabelaSimbolosEstado5));
/*Estado  6*/ automato.push(new Estado({ 'leia': 5, 'escreva': 7 }, 'Esperando ID=leia ou escreva'));
/*Estado  7*/ automato.push(new Estado({ '(': 9 }, 'Esperado ID= ( ou uma variável', checarTabelaSimbolosEstado7));
/*Estado  8*/ automato.push(new Estado({ 'leia': 5, 'escreva': 7, 'at': 11 }, 'Esperado ID=at, escreva ou leia'));
/*Estado  9*/ automato.push(new Estado({ ')': 10 }, 'Esperado fecha parentese', lerTextoQualquerEstado9));
/*Estado 10*/ automato.push(new Estado({ 'leia': 5, 'escreva': 7, 'at': 11}, 'Esperado ID=at, escreva ou leia'));
/*Estado 11*/ automato.push(new Estado({ }, 'Esperado uma variavel', checarTabelaSimbolosEstado11));
/*Estado 12*/ automato.push(new Estado({ '=': 13 }, 'Esperado ID= ='));
/*Estado 13*/ automato.push(new Estado({ }, 'Esperado um número inteiro ou uma váriavel', checarTabelaSimbolosOuNumInteiroEstado13));
/*Estado 14*/ automato.push(new Estado({ 'at': 11, 'se': 16 }, 'Esperado ID= at ou se'));
/*Estado 15*/ automato.push(new Estado({ 'at': 11, 'se': 16 }, 'Esperado ID= at ou se'));
/*Estado 16*/ automato.push(new Estado({ }, 'Esperado uma variável', checarTabelaSimbolosEstado16));
/*Estado 16*/ automato.push(new Estado({ '>': 18, '<': 18, '>=': 18, '<=': 18, '==': 18, '!=': 18 }, 'Esperado Operadores (<, >, <=, >=, ==, !=)'));

function compilar() {
    estadoAtual = estadoInicial;
    tabelaSimbolos = {};
    error = false;
    var str = document.getElementById('txtEditor').value;
    var tokens = str.split(RegExp('[ \\n\\s\\r\\t]+'));

    for (token of tokens) {
        console.log(token);
        estadoAtual.lerToken(token);
        if (error) {
            alert(estadoAtual.msgErro);
            break;
        }
    }

    console.log(estadoAtual);
}