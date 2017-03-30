class SamModelo {
	constructor(id=null, numeroSAM=null, numeroLegadoSAM=null, numeroSerie=null, tipoSAM=null, registro=null) {	
        this.id = id;
		this.numeroSAM = numeroSAM;
		this.numeroLegadoSAM = numeroLegadoSAM; 
        this.numeroSerie = numeroSerie;
		this.tipoSAM = tipoSAM;
        this.registro = registro;
    }
}

try {
	module.exports = exports = SamModelo;
} catch(e) {
	exports = SamModelo;
}