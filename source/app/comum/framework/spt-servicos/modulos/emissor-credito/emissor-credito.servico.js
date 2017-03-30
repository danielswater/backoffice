define(['angularAMD', 'EmissorCreditoModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('EmissorCreditoServico', EmissorCreditoServico);

    EmissorCreditoServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function EmissorCreditoServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/emissor-credito';

        this.listarEmissorVigente = function (sucesso, erro) {
            return $http.get(url + '/vigente').then(sucesso).catch(erro);
        }
    }
});