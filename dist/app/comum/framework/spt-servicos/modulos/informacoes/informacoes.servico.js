define(['angularAMD', 'InformacoesModelo', 'servicosConfig'], function (app) {

    app.service('InformacoesServico', InformacoesServico);

    InformacoesServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function InformacoesServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/informacao';

        this.listarMotivosInformacoes = function (sucesso, erro) {
            return $http.get(url + '/motivos').then(sucesso).catch(erro);
        }
        this.listarCategoriasInformacoes = function (sucesso, erro) {
            return $http.get(url + '/categoria').then(sucesso).catch(erro);
        }
        this.listar = function (sucesso, erro) {
            return $http.get(url).then(sucesso).catch(erro);
        }
        this.filtrar = function (informacoes, sucesso, erro) {
            var filtro = {
                'categoria.id' : informacoes.categoria ? informacoes.categoria.id : null,
                tituloConteudo: informacoes.tituloConteudo,
                'registro.motivo.id': (informacoes.registro && informacoes.registro.motivo) ? informacoes.registro.motivo.id : null,
                flagDestaque: informacoes.flagDestaque
            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }
        this.detalhar = function (informacoesId, sucesso, erro) {
            return $http.get(url + '/ope/' + informacoesId).then(sucesso).catch(erro);
        }
        this.incluir = function (novaInformacoes, sucesso, erro) {
            return $http.post(url + '/ope', novaInformacoes).then(sucesso).catch(erro);
        }
        this.excluir = function (informacoesId, sucesso, erro) {
            return $http.delete(url + '/ope/' + informacoesId).then(sucesso).catch(erro);
        }
        this.editar = function (novaInformacoes, sucesso, erro) {
            return $http.put(url + '/ope', novaInformacoes).then(sucesso).catch(erro);
        }
    }
});