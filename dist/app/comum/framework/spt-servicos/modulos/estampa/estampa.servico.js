define(['angularAMD', 'EstampaModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('EstampaServico', EstampaServico);

    EstampaServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function EstampaServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/estampa-cartao';

        this.listarMotivoInativacao = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }
        this.filtrar = function (estampa, sucesso, erro) {
            return $http.get(url, { params: { dataParam: estampa } }).then(sucesso).catch(erro);
        }
        this.criar = function (novaEstampa, sucesso, erro) {
            return $http.post(url + '/estampa/ope', novaEstampa).then(sucesso).catch(erro);
        }
        this.salvar = function (estampa, sucesso, erro) {
            return $http.put(url + '/estampa/ope', estampa).then(sucesso).catch(erro);
        }
        this.deletar = function (estampaId, sucesso, erro) {
            return $http.delete(url + '/ope/' + estampaId).then(sucesso).catch(erro);
        }
        this.ativar = function (estampa, sucesso, erro) {
            return $http.put(url + '/estampa/ope', estampa).then(function(resposta) {
                if (!resposta.data.dataExcecao) {
                    resposta.data.codigo = ServicoUtils.deParaMensagem(resposta.data.codigo, estampa.registro.situacao.id);
                }
                sucesso(resposta);
            }).catch(erro);
        }
        // Vinculo estampa
        this.listarTipoCasco = function (sucesso, erro) {
            return $http.get(url + '/tipo-casco').then(sucesso).catch(erro);
        }
        this.filtrarVinculo = function (vinculadas, sucesso, erro) {
            return $http.get(url + '/vinculadas', { params: { dataParam: vinculadas } }).then(sucesso).catch(erro);
        }
        this.criarVinculo = function (novoVinculo, sucesso, erro) {
            return $http.post(url + '/vinculo/ope', novoVinculo).then(sucesso).catch(erro);
        }
        this.deletarVinculo = function (vinculoId, sucesso, erro) {
            return $http.delete(url + '/vinculo/ope/' + vinculoId).then(sucesso).catch(erro);
        }
    }
});