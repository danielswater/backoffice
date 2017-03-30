class CartaoModelo {
	constructor(identificadorCartao = null, numeroFisico = null, usuario = null, casco = null, estampa = null, dataEmissaoCartao = null, codigoOSE = null, situacaoOSE = null, numeroViaEmissao = null, identificadorCartaoAnterior = null, solicitacao = null, tipoCartao = null, tipoLocalEntrega = null, perfilUtilizacao = null, registro = null) {
        this.identificadorCartao = identificadorCartao;
        this.numeroFisico = numeroFisico;
        this.usuario = usuario;
        this.casco = casco;
        this.estampa = estampa;
        this.dataEmissaoCartao = dataEmissaoCartao;
        this.codigoOSE = codigoOSE;
        this.situacaoOSE = situacaoOSE;
        this.numeroViaEmissao = numeroViaEmissao;
        this.identificadorCartaoAnterior = identificadorCartaoAnterior;
        this.solicitacao = solicitacao; 
        this.tipoCartao = tipoCartao;                
        this.tipoLocalEntrega = tipoLocalEntrega; 
        this.perfilUtilizacao = perfilUtilizacao; 
        this.registro = registro;
	}
}

try {
	module.exports = exports = CartaoModelo;
} catch (e) {
	exports = CartaoModelo;
}