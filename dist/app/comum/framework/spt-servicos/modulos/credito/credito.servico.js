define(['angularAMD', 'CreditoModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('CreditoServico', CreditoServico);

    CreditoServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function CreditoServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/credito';

        this.listarCreditos = function (sucesso, erro) {
            return $http.get(url).then(sucesso).catch(erro);
        }
        this.filtrar = function (credito, sucesso, erro) {
            filtro = {
                id: credito.id,
                nome: credito.nmCreditoEletronico,
                tipo: credito.familiaCredito,
                codigoLegislacao: credito.tipoCreditoEletronico,
                dataReajuste: credito.temporalidadeCredito,
            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }

        this.criar = function (novoCredito, sucesso, erro) {
            return $http.post(url + '/ope', novoCredito).then(sucesso).catch(erro);
        }

        this.detalhar = function (CredtitoId, sucesso, erro) {
            return $http.get(url + '/ope/' + CreditoId).then(sucesso).catch(erro);
        }

        this.listarCreditosPorEmissor = function (emissorId, sucesso, erro) {
            return $http.get(url + '/emissor/' + emissorId).then(sucesso).catch(erro);
        }
    }
});