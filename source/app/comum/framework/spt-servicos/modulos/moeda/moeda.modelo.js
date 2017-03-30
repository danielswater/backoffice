/**
*
* @swagger
* definition:
*	  Moeda:
*	     type: "object"
*	     properties:
*	       id:
*	         type: "integer"
*	         description: "código identificador da Moeda"
*	       sigla:
*	         type: "string"
*	         description: "Sigla da Moeda."
*	       descricao:
*	         type: "string"
*	         description: "Nome da Moeda."
*	       dataVigenciaInicial:
*	         type: "string"
*	         format: "date-time"
*	         description: "Data inicio Moeda."
*	       dataVigenciaFinal:
*	         type: "string"
*	         format: "date-time"
*	         description: "Data fim Moeda."
*	       registro:
*	         $ref: "#/definitions/Registro"
*/

class MoedaModelo {
	constructor(id=null,sigla=null,descricao=null,dataVigenciaInicial=null,dataVigenciaFinal=null,registro=null) {
		this.id = id,
		this.sigla = sigla,
		this.descricao = descricao,
		this.dataVigenciaInicial = dataVigenciaInicial,
		this.dataVigenciaFinal = dataVigenciaFinal,
		this.registro = registro
    }
}

try {
	module.exports = exports = MoedaModelo;
} catch(e) {
	exports = MoedaModelo;
}
