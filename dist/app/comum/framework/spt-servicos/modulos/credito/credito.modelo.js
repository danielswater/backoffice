class CreditoModelo {
	constructor(id=null, familiaCredito=null, temporalidadeCredito=null, tipoCreditoEletronico=null, nmCreditoEletronico=null, deCreditoEletronico=null,registro=null) {	
        this.id = id;
		this.familiaCredito = familiaCredito;
		this.temporalidadeCredito = temporalidadeCredito; 
        this.tipoCreditoEletronico = tipoCreditoEletronico;
		this.nmCreditoEletronico = nmCreditoEletronico;
        this.deCreditoEletronico = deCreditoEletronico;
		this.registro = registro;
    }
}

try {
	module.exports = exports = CreditoModelo;
} catch(e) {
	exports = CreditoModelo;
}