class AgrupamentoModelo {
	constructor(id=null,descricao=null,nome=null,nomeDiretorioImagem=null,nomeArquivoImagem=null,corFundo=null,corFonte=null,grupoId=null,nomeGrupo=null,numeroOrdenacao=null,registro=null) {
		this.id = id;
		this.descricao = descricao;
		this.nome = nome;
		this.nomeDiretorioImagem = nomeDiretorioImagem;
		this.nomeArquivoImagem = nomeArquivoImagem;
		this.corFundo = corFundo;
		this.corFonte = corFonte;
		this.grupoId = grupoId;
		this.nomeGrupo = nomeGrupo;
		this.numeroOrdenacao = numeroOrdenacao;
		this.registro = registro;
    }
}

try {
	module.exports = exports = AgrupamentoModelo;
} catch(e) {
	exports = AgrupamentoModelo;
}
