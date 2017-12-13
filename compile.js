var error = false;
var automato = [];
var estadoInicial;
var estadoAtual;

function Estado(tokens, msgErro, lerTokenEspecial, acaoSemantica) {
    this.tokens = tokens;
    this.msgErro = msgErro;
    this.lerTokenEspecial = lerTokenEspecial || function(token) { return false; };
    this.acaoSemantica = acaoSemantica || function(token) {};
    this.lerToken = function (token) {
        if (tokens[token] || this.lerTokenEspecial(token)) {
            estadoAtual = automato[tokens[token] || this.lerTokenEspecial(token)];
            this.acaoSemantica(token);
        } else {
            error = true;
        }
    }
}

function checarVariavel(token) {
    console.log(/([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*$/.test(token));
    if (token.search("([a-z]|[A-Z])([a-z]|[A-Z]|[0-9])*$")) {
        return 3;
    } else {
        return false;
    }
}

estadoInicial = new Estado({ 'programa': 1 }, 'Esperado ID=programa');

automato.push(estadoInicial);
automato.push(new Estado({ 'var': 2 }, 'Esperado ID=var'));
automato.push(new Estado({}, 'Esperado ID=;', checarVariavel));
automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
automato.push(new Estado({ 'leia': 5 }, 'Esperado ID=leia'));

function compilar() {
    estadoAtual = estadoInicial;
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