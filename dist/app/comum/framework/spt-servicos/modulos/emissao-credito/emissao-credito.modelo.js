class EmissaoCreditoModelo {
	constructor(id=null, emissorCredito=null, creditoEletronico=null, vigenciaCreditoTemporal=null, dataInicioVigencia=null, dataFimVigencia=null,tipoTarifario=null,tipoAplicacaoTransporte=null,modal=null,registro=null) {	
        this.id = id;
		this.emissorCredito = emissorCredito;
		this.creditoEletronico = creditoEletronico; 
        this.vigenciaCreditoTemporal = vigenciaCreditoTemporal;
		this.dataInicioVigencia = dataInicioVigencia;
        this.dataFimVigencia = dataFimVigencia;
		this.tipoTarifario = tipoTarifario;
		this.tipoAplicacaoTransporte = tipoAplicacaoTransporte;
		this.modal = modal;
		this.registro = registro;
    }
}

try {
	module.exports = exports = EmissaoCreditoModelo;
} catch(e) {
	exports = EmissaoCreditoModelo;
}