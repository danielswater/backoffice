define(['angularAMD', 'AgrupamentoModelo', 'servicosConfig'], function (app) {

    app.service('AgrupamentoServico', AgrupamentoServico);

    AgrupamentoServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function AgrupamentoServico($http, SERVICOS_CONFIG) {

        let urlGrupoUsuario = SERVICOS_CONFIG.url + '/v1/sbe/permissao/grupo-usuario';
        this.listarGruposUsuario = function (sucesso, erro) {
            return $http.get(urlGrupoUsuario).then(sucesso).catch(erro);
        }

        let url = SERVICOS_CONFIG.url + '/v1/sbe/pagina-principal/agrupamento';
        this.filtrar = function (agrupamento, sucesso, erro) {
            filtro = {
                nome: agrupamento.nome,
                grupoUsuarioSistema: agrupamento.grupoUsuarioSistema
            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }
        this.detalhar = function (agrupamentoId, sucesso, erro) {
            return $http.get(url + '/ope/' + agrupamentoId).then(sucesso).catch(erro);
        }
        this.incluir = function (novoAgrupamento, sucesso, erro) {
            return $http.post(url + '/ope/', novoAgrupamento).then(sucesso).catch(erro);
        }
        this.deletar = function (agrupamentoId, sucesso, erro) {
            return $http.delete(url + '/ope/' + agrupamentoId).then(sucesso).catch(erro);
        }
        this.editar = function (novoAgrupamento, sucesso, erro) {
            return $http.put(url + '/ope/', novoAgrupamento).then(sucesso).catch(erro);
        }
    }
});