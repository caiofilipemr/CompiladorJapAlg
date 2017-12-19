var error = false;
var automato = [];
var estadoInicial;
var estadoAtual;
var tabelaSimbolos;
var estadoFinal;
var linguagemCompilada;

window.onload = function() {
	function readSingleFile(e) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			displayContents(contents);
		};
		reader.readAsText(file);
	}

	function displayContents(contents) {
		document.getElementById('txtEditor').value = contents.trim();
	}
	
	document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);
}
  
function Estado(tokens, msgErro, lerTokenEspecial, acaoSemantica) {
    this.tokens = tokens;
    this.msgErro = msgErro;
    this.lerTokenEspecial = lerTokenEspecial || function(token) { return false; };
    this.acaoSemantica = acaoSemantica || function(token) {};
    this.lerToken = function (token) {
        if (tokens[token]) {
            var par = tokens[token];
            estadoAtual = automato[par[0]];
            linguagemCompilada += par[1];
        } else if (this.lerTokenEspecial(token)) {
            var par = this.lerTokenEspecial(token);
            estadoAtual = automato[par[0]];
            linguagemCompilada += par[1];
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
    return palavrarPertenceALinguagem(token, /[a-zA-Z][a-zA-Z0-9]*\$/) ? [3, token] : false;
}

function checarVariavelEstado3(token) {
    return palavrarPertenceALinguagem(token, /[a-zA-Z][a-zA-Z0-9]*\$/) ? [3, ', '+token] : false;
}

function adicionarNaTabelaDeSimbolos(token) {
    tabelaSimbolos[token] = true;
}

function checarTabelaSimbolosEstado5(token) {
    return tabelaSimbolos[token] ? [6, token+');\n'] : null;
}

function checarTabelaSimbolosEstado7(token) {
    return tabelaSimbolos[token] ? [8, token+');\n'] : null;
}

function lerTextoQualquerEstado9(token) {
    return [9,' '+token];
}

function checarTabelaSimbolosEstado11(token) {
    return tabelaSimbolos[token] ? [12, token] : null;
}

function checarTabelaSimbolosOuNumInteiroEstado13(token) {
    if (tabelaSimbolos[token]) {
        return [15, token+';\n'];
    } else {
        return palavrarPertenceALinguagem(token, /[0-9]+/) ? [14, token+';\n'] : null;
    }
}

function checarTabelaSimbolosEstado16(token) {
    return tabelaSimbolos[token] ? [17, token] : null;
}

function checarTabelaSimbolosOuNumInteiroEstado18(token) {
    if (tabelaSimbolos[token]) {
        return [20, token];
    } else {checarTabelaSimbolosEstado5
        return palavrarPertenceALinguagem(token, /[0-9]+/) ? [19, token] : null;
    }
}

function checarTabelaSimbolosEstado22(token) {
    return tabelaSimbolos[token] ? [23, token] : null;
}

function checarTabelaSimbolosOuNumInteiroEstado24(token) {
    if (tabelaSimbolos[token]) {
        return [25, token];
    } else {
        return palavrarPertenceALinguagem(token, /[0-9]+/) ? [27, token] : null;
    }
}

function checarTabelaSimbolosOuNumInteiroEstado26(token) {
    if (tabelaSimbolos[token]) {
        return [25, token];
    } else {
        return palavrarPertenceALinguagem(token, /[0-9]+/) ? [27, token] : null;
    }
}

function lerTextoQualquerEstado31(token) {
    return [31, ' '+token];
}

estadoInicial = new Estado({ 'programa': [1, '#include <stdio.h>\n\n'] }, 'Esperado ID=programa');

/*Estado  0*/ automato.push(estadoInicial);
/*Estado  1*/ automato.push(new Estado({ 'var': [2, 'int '] }, 'Esperado ID=var'));
/*Estado  2*/ automato.push(new Estado({ ';': [4, ';\n\nint main()\n{\n'] }, 'Esperado ID=;', checarVariavelEstado2, adicionarNaTabelaDeSimbolos));
/*Estado  3*/ automato.push(new Estado({ ';': [4, ';\n\nint main()\n{\n'] }, 'Esperado ID=;', checarVariavelEstado3, adicionarNaTabelaDeSimbolos));
/*Estado  4*/ automato.push(new Estado({ 'leia': [5, '\tscanf("%d",'] }, 'Esperado ID=leia'));
/*Estado  5*/ automato.push(new Estado({ }, 'Esperado uma variável', checarTabelaSimbolosEstado5));
/*Estado  6*/ automato.push(new Estado({ 'leia': [5, '\tscanf("%d",'], 'escreva': [7, '\tprintf'] }, 'Esperando ID=leia ou escreva'));
/*Estado  7*/ automato.push(new Estado({ '(': [9, '("'] }, 'Esperado ID= ( ou uma variável', checarTabelaSimbolosEstado7));
/*Estado  8*/ automato.push(new Estado({ 'leia': [5, '\tscanf("%d",'], 'escreva': [7, '\tprintf'], 'at': [11, '\t'] }, 'Esperado ID=at, escreva ou leia'));
/*Estado  9*/ automato.push(new Estado({ ')': [10, '");\n'] }, 'Esperado fecha parentese', lerTextoQualquerEstado9));
/*Estado 10*/ automato.push(new Estado({ 'leia': [5, '\tscanf("%d",'], 'escreva': [7, '\tprintf'], 'at': [11, '\t'] }, 'Esperado ID=at, escreva ou leia'));
/*Estado 11*/ automato.push(new Estado({ }, 'Esperado uma variavel', checarTabelaSimbolosEstado11));
/*Estado 12*/ automato.push(new Estado({ '=': [13, ' = '] }, 'Esperado ID= ='));
/*Estado 13*/ automato.push(new Estado({ }, 'Esperado um número inteiro ou uma váriavel', checarTabelaSimbolosOuNumInteiroEstado13));
/*Estado 14*/ automato.push(new Estado({ 'at': [11, '\t'], 'se': [16, '\tif ('] }, 'Esperado ID= at ou se'));
/*Estado 15*/ automato.push(new Estado({ 'at': [11, '\t'], 'se': [16, '\tif ('] }, 'Esperado ID= at ou se'));
/*Estado 16*/ automato.push(new Estado({ }, 'Esperado uma variável', checarTabelaSimbolosEstado16));
/*Estado 17*/ automato.push(new Estado({ '>': [18, ' > '], '<': [18, ' < '], '>=': [18, ' >= '], '<=': [18, ' <= '], '==': [18, ' == '], '!=': [18, ' != '] }, 'Esperado Operadores (<, >, <=, >=, ==, !=)'));
/*Estado 18*/ automato.push(new Estado({ }, 'Esperado um número inteiro ou uma váriavel', checarTabelaSimbolosOuNumInteiroEstado18));
/*Estado 19*/ automato.push(new Estado({ 'entao': [21, ')\n\t{\n'] }, 'Esperado Id= entao'));
/*Estado 20*/ automato.push(new Estado({ 'entao': [21, ')\n\t{\n'] }, 'Esperado Id= entao'));
/*Estado 21*/ automato.push(new Estado({ 'at': [22, '\t\t'] }, 'Esperado ID= at'));
/*Estado 22*/ automato.push(new Estado({ }, 'Esperado uma variável', checarTabelaSimbolosEstado22));
/*Estado 23*/ automato.push(new Estado({ '=': [24, ' = '] }, 'Esperado Id= ='));
/*Estado 24*/ automato.push(new Estado({ }, 'Esperado um número inteiro ou uma váriavel', checarTabelaSimbolosOuNumInteiroEstado24));
/*Estado 25*/ automato.push(new Estado({ '+': [26, ' + '], '-': [26, ' - '], '*': [26, ' * '], ';': [28, ';\n'] }, 'Esperado Operacoes (+,-,*) ou ;'));
/*Estado 26*/ automato.push(new Estado({ }, 'Esperado um número inteiro ou uma váriavel', checarTabelaSimbolosOuNumInteiroEstado26));
/*Estado 27*/ automato.push(new Estado({ '+': [26, ' + '], '-': [26, ' - '], '*': [26, ' * '], ';': [28, ';\n'] }, 'Esperado Operacoes (+,-,*) ou ;'));
/*Estado 28*/ automato.push(new Estado({ 'senao': [29, '\t}\n\telse\n'] }, 'Esperado Id= senao'));
/*Estado 29*/ automato.push(new Estado({ 'escreva': [30, '\t\tprintf'] }, 'Esperado Id= escreva'));
/*Estado 30*/ automato.push(new Estado({ '(': [31, '("'] }, 'Esperado Id= ('));
/*Estado 31*/ automato.push(new Estado({ ')': [32, '");\n'] }, 'Esperado fecha parentese', lerTextoQualquerEstado31));
/*Estado 32*/ automato.push(new Estado({ 'fim': [33, '\texit(0);\n}'] }, 'Esperado Id= fim'));
estadoFinal = new Estado({ }, 'Compilado');
/*Estado 33*/ automato.push(estadoFinal);

function compilar() {
    estadoAtual = estadoInicial;
    tabelaSimbolos = {};
    error = false;
    linguagemCompilada = '';
    var str = document.getElementById('txtEditor').value.trim();
    var tokens = str.split(RegExp('[ \\n\\s\\r\\t]+'));

    for (token of tokens) {
        console.log(token);
        estadoAtual.lerToken(token);
        if (error) {
            alert(estadoAtual.msgErro);
            break;
        }
    }
    if (estadoAtual == estadoFinal){
        console.log('Programa Compilado Com Sucesso');
        document.getElementById('compilado').value  = linguagemCompilada;
        //document.getElementById('txtEditor').value;
    }
    else
        console.log('Erro');
}
