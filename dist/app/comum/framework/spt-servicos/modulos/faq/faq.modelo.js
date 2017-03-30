class FaqModelo {
	constructor(id=null,categoria=null,txPerguntaFrequente=null,txRespostaFaq=null,nrOrdenacao=null,registro=null) {
        this.id = id,
        this.categoria = categoria,
        this.txPerguntaFrequente = txPerguntaFrequente,
        this.txRespostaFaq = txRespostaFaq,
        this.nrOrdenacao = nrOrdenacao,
        this.registro = registro 
    }
}

try {
	module.exports = exports = FaqModelo;
} catch(e) {
	exports = FaqModelo;
}