class EstampaModelo {
    constructor(
        identificadorVinculo = null
        , identificadorEstampa = null
        , nome = null
        , descricao = null
        , imagemClob = null
        , tipoCasco = null
        , produto = null
        , cartao = null
        , dataInicioVigencia = null
        , dataFimVigencia = null
        , registro = null
    ) {
        this.identificadorVinculo = identificadorVinculo;
        this.identificadorEstampa = identificadorEstampa;
        this.nome = nome;
        this.descricao = descricao;
        this.imagemClob = imagemClob;
        this.tipoCasco = tipoCasco;
        this.produto = produto;
        this.cartao = cartao;
        this.dataInicioVigencia = dataInicioVigencia;
        this.dataFimVigencia = dataFimVigencia;
        this.registro = registro;
    }
}

try {
    module.exports = exports = EstampaModelo;
} catch (e) {
    exports = EstampaModelo;
}