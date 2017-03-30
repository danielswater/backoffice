define(['angularAMD', 'CartaoModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('CartaoServico', CartaoServico);

    CartaoServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function CartaoServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/cartao';

        this.filtrar = function (cartao, sucesso, erro) {
            return $http.get(url, { params: { dataParam: cartao } }).then(sucesso).catch(erro);
        }
        this.filtrarProdutos = function (cartao, sucesso, erro) {
            return $http.get(url + '/produto', { params: { dataParam: cartao } }).then(sucesso).catch(erro);
        }
        this.filtrarOcorrencias = function (cartao, sucesso, erro) {
            return $http.get(url + '/ocorrencia', { params: { dataParam: cartao } }).then(sucesso).catch(erro);
        }
    }
});