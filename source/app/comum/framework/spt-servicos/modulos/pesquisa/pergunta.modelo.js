class PerguntaModelo {
    constructor(idPergunta=null, CategoriaPergunta=null, TipoResposta=null, ListaResposta=null, textoPergunta=null, textoOrientacao=null, registro=null) {
        this.idPergunta = idPergunta;
		this.CategoriaPergunta = CategoriaPergunta;
        this.TipoResposta = TipoResposta;
		this.textoPergunta = textoPergunta; 
		this.textoOrientacao = textoOrientacao;
        this.ListaResposta = ListaResposta
        this.registro = registro;
    }
}

try {
	module.exports = exports = PerguntaModelo;
} catch(e) {
	exports = PerguntaModelo;
}