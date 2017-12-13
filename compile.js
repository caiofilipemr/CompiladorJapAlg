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

function checarVariavelEstado2(token) {
    var m = token.match(/[a-zA-Z][a-zA-Z0-9]*\$/);
    console.log(m);
    if (m.length == 1 && m == token) {
        return 3;
    } else {
        return false;
    }
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

estadoInicial = new Estado({ 'programa': 1 }, 'Esperado ID=programa');

/*Estado 0*/ automato.push(estadoInicial);
/*Estado 1*/ automato.push(new Estado({ 'var': 2 }, 'Esperado ID=var'));
/*Estado 2*/ automato.push(new Estado({ ';': 4 }, 'Esperado ID=;', checarVariavelEstado2, adicionarNaTabelaDeSimbolos));
/*Estado 3*/ automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
/*Estado 4*/ automato.push(new Estado({ 'leia': 5 }, 'Esperado ID=leia'));
/*Estado 5*/ automato.push(new Estado({ }, 'Esperando uma variável', checarTabelaSimbolosEstado5));
/*Estado 6*/ automato.push(new Estado({ 'leia': 5, 'escreva': 7 }, 'Esperando ID=leia ou escreva'));
/*Estado 7*/ automato.push(new Estado({ '(': 9 }, 'Esperado ID= ( ou uma variável'), checarTabelaSimbolosEstado7);
/*Estado 8*/ automato.push(new Estado({ 'leia': 5, 'escreva': 7, 'at': 11 }, 'Esperado ID=at ou leia'));
/*Estado 9*/ automato.push(new Estado({ ')': 10 }, 'Esperado ID=at ou leia'));

function compilar() {
    estadoAtual = estadoInicial;
    tabelaSimbolos = {};
    error = false;
    var str = document.getElementById('txtEditor').value;
    var tokens = str.split(RegExp('[ \\n\\s\\r\\t]+'));

    for (token of tokens) {
        estadoAtual.lerToken(token);
        if (error) {
            alert(estadoAtual.msgErro);
            break;
        }
    }
}