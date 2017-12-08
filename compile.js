var error = false;
var automato = [];
var estadoAtual;

function Estado(tokens, msgErro) {
    this.tokens = tokens;
    this.msgErro = msgErro;
    this.lerToken = function (token) {
        console.log(tokens);
        console.log(token);
        if (tokens[token])
            estadoAtual = automato[tokens[token]];
        else
            error = true;
    }
}

estadoAtual = new Estado({ 'programa': 1 }, 'Esperado ID=programa');

automato.push(estadoAtual);
automato.push(new Estado({ 'var': 2 }, 'Esperado ID=var'));
automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
automato.push(new Estado({ ';': 4 }, 'Esperado ID=;'));
automato.push(new Estado({ 'leia': 5 }, 'Esperado ID=leia'));

function compilar() {
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