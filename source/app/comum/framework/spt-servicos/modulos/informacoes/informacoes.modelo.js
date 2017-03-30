class InformacoesModelo {
	constructor(id=null,categoria=null,tituloConteudo=null,textoResumoInformacao=null,textoInformacao=null,flagDestaque=null,dataPublicacao=null,dataInicioPublicacao=null,dataFimPublicacao=null,imagemDestaque=null,registro=null) {
        this.id = id,
        this.categoria = categoria,
        this.tituloConteudo = tituloConteudo,
        this.textoResumoInformacao = textoResumoInformacao,
        this.textoInformacao = textoInformacao,
        this.flagDestaque = flagDestaque,
        this.dataPublicacao = dataPublicacao,
        this.dataInicioPublicacao = dataInicioPublicacao,
        this.dataFimPublicacao = dataFimPublicacao,
        this.imagemDestaque = imagemDestaque,
        this.registro = registro
    }
}

try {
	module.exports = exports = InformacoesModelo;
} catch(e) {
	exports = InformacoesModelo;
}