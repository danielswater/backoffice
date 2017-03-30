class PerfilProdutoModelo {
    constructor(produto=null, identificadorPerfil=null, dataInicioVigencia=null, dataFimVigencia=null, perfilUtilizacao=null, perfilUsuarioTransporte=null, tipoPoliticaPublica=null, emissorCredito=null, creditoEletronico=null, tipoVigenciaCredito=null, tipoTarifario=null, tipoEmissaoCredito=null, registro=null) {
        this.produto = produto;
        this.identificadorPerfil = identificadorPerfil ;
        this.dataInicioVigencia = dataInicioVigencia ;
        this.dataFimVigencia = dataFimVigencia ;
        this.perfilUtilizacao = perfilUtilizacao  ;
        this.perfilUsuarioTransporte = perfilUsuarioTransporte  ;
        this.tipoPoliticaPublica = tipoPoliticaPublica ;
        this.emissorCredito = emissorCredito ;
        this.creditoEletronico = creditoEletronico ;
        this.tipoVigenciaCredito = tipoVigenciaCredito ;
        this.tipoTarifario =  tipoTarifario ;
        this.tipoEmissaoCredito =tipoEmissaoCredito  ;
        this.registro = registro 
    }
}

try {
	module.exports = exports = PerfilProdutoModelo;
} catch(e) {
	exports = PerfilProdutoModelo;
}