/**
*
* @swagger
* definition:
*   Tarifa:
*     type: object
*     properties:
*       id:
*         type: integer
*         description: Códido tarifa
*       nome:
*         type: string
*         description: Nome atribuido à tarifa
*       codigoLegislacao:
*         type: string
*         description: codigo legislacao atribuido à tarifa
*       descricao:
*         type: string
*         description: Descrição atribuido à tarifa
*       dataLegislacao:
*         type: string
*         format: date
*         description: data Legislacao atribuido à tarifa
*       tipo:
*         $ref: '#/definitions/TipoTarifa'
*       dataReajuste:
*         type: string
*         format: date
*         description: data Reajuste atribuido à tarifa
*       valor:
*         type: number
*         description: Valor atribuido à tarifa
*       idMoeda:
*         type: integer
*         description: Moeda atribuido à tarifa
*       listaModal:
*         $ref: '#/definitions/ListaModal'
*       registro:
*         $ref: '#/definitions/Registro'
* @swagger
* definition:
*  ListaModal:
*      type: array
*      properties:
*        idModal:
*          type: integer
*/

class Tarifa {
  constructor(id = null,
    tipo = null,
    nome = null,
    codigoLegislacao = null,
    dataLegislacao = null,
    descricao = null,
    dataReajuste = null,
    idMoeda = null,
    valor = null,
    listaModal = null,
    registro = null
  )
  {
    this.id = id;
    this.tipo = tipo;
    this.nome = nome;
    this.codigoLegislacao = codigoLegislacao;
    this.dataLegislacao = dataLegislacao;
    this.descricao = descricao;
    this.dataReajuste = dataReajuste;
    this.idMoeda = idMoeda;
    this.valor = valor;
    this.listaModal = listaModal;
    this.registro = registro;
  }
}

try {
  module.exports = exports = Tarifa;
} catch(e) {
  exports = Tarifa;
}
