class MenuPaginaPrincipalModelo {
	constructor(id=null,descricao=null,nome=null,nomeDiretorioImagem=null,nomeArquivoImagem=null,corFundo=null,corFonte=null,grupoId=null,agrupamentoId=null,agrupmentoNome=null,numeroOrdenacao=null,registro=null) {
		this.id = id;
		this.descricao = descricao;
		this.nome = nome;
		this.nomeDiretorioImagem = nomeDiretorioImagem;
		this.nomeArquivoImagem = nomeArquivoImagem;
		this.corFundo = corFundo;
		this.corFonte = corFonte;
		this.grupoId = grupoId;
		this.agrupamentoId = agrupamentoId;
		this.agrupmentoNome = agrupmentoNome;
		this.numeroOrdenacao = numeroOrdenacao;
		this.registro = registro;
    }
}

try {
	module.exports = exports = MenuPaginaPrincipalModelo;
} catch(e) {
	exports = MenuPaginaPrincipalModelo;
}
