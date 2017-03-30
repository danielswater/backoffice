define(['angularAMD', 'PerfilProdutoModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('PerfilProdutoServico', PerfilProdutoServico);

    PerfilProdutoServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function PerfilProdutoServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/perfil-produto';

        this.listarTipoPagadorTarifa = function (sucesso, erro) {
            return $http.get(url + '/tipo-pagador-tarifa').then(sucesso).catch(erro);
        }

        this.filtrar = function (produto, sucesso, erro) {
            // Necessario passar dataParam para  o interceptor poder encriptar os parametros
            return $http.get(url, { params: {dataParam: produto} }).then(sucesso).catch(erro);
        }
        this.detalhar = function (produtoId, sucesso, erro) {
            return $http.get(url + '/ope/' + produtoId).then(sucesso).catch(erro);
        }
        this.criar = function (novoProduto, sucesso, erro) {
            return $http.post(url + '/ope', novoProduto).then(sucesso).catch(erro);
        }
        this.deletar = function (samId, sucesso, erro) {
            return $http.delete(url + '/ope/' + samId).then(sucesso).catch(erro);
        }
        this.salvar = function (novaSam, sucesso, erro) {
            return $http.put(url + '/ope', novaSam).then(sucesso).catch(erro);
        }
    }
});