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

function checarVariavel(token) {
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

estadoInicial = new Estado({ 'programa': 1 }, 'Esperado ID=programa');

automato.push(estadoInicial);
automato.push(new Estado({ 'var': 2 }, 'Esperado ID=var'));
automato.push(new Estado({ ';': 4 }, 'Esperado ID=;', checarVariavel, adicionarNaTabelaDeSimbolos));
automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
automato.push(new Estado({ 'leia': 5 }, 'Esperado ID=leia'));

function compilar() {
    estadoAtual = estadoInicial;
    tabelaSimbolos = {};
    error = false;
    var str = document.getElementById('txtEditor').value;
    var tokens = str.split(RegExp(' |\\n|\\s|\\r'));

    for (token of tokens) {
        estadoAtual.lerToken(token);
        if (error) {
            alert(estadoAtual.msgErro);
            break;
        }
    }
}