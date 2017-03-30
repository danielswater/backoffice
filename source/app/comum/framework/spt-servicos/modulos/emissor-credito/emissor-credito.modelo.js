class EmissorCreditoModelo {
    constructor(id = null, numeroDocumento = null, razaoSocial = null, nomeFantasia = null, endereco = null) {
        this.id = id;
        this.numeroDocumento = numeroDocumento
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.endereco = endereco;
    }
}

try {
    module.exports = exports = EmissorCreditoModelo;
} catch (e) {
    exports = EmissorCreditoModelo;
}