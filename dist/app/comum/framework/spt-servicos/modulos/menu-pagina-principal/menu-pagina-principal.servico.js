define(['angularAMD', 'MenuPaginaPrincipalModelo', 'servicosConfig'], function (app) {

    app.service('MenuPaginaPrincipalServico', MenuPaginaPrincipalServico);

    MenuPaginaPrincipalServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function MenuPaginaPrincipalServico($http, SERVICOS_CONFIG) {

        let urlGrupoUsuario = SERVICOS_CONFIG.url + '/v1/sbe/permissao/grupo-usuario';
        this.listarGruposUsuario = function (sucesso, erro) {
            return $http.get(urlGrupoUsuario).then(sucesso).catch(erro);
        }

        let url = SERVICOS_CONFIG.url + '/v1/sbe/pagina-principal';
        this.listarPaginas = function (sucesso, erro) {
            return $http.get(url + '/item-menu').then(sucesso).catch(erro);
        }
        this.filtrar = function (menuPaginaPrincipal, sucesso, erro) {
            filtro = {
                nome: menuPaginaPrincipal.nome,
                grupoId: menuPaginaPrincipal.grupoId
            };
            return $http.get(url + '/menu', { params: filtro }).then(sucesso).catch(erro);
        }
        this.detalhar = function (menuPaginaPrincipalId, sucesso, erro) {
            return $http.get(url + '/menu/ope/' + menuPaginaPrincipalId).then(sucesso).catch(erro);
        }
        this.incluir = function (novoMenuPaginaPrincipal, sucesso, erro) {
            return $http.post(url + '/menu/ope', novoMenuPaginaPrincipal).then(sucesso).catch(erro);
        }
        this.deletar = function (menuPaginaPrincipalId, sucesso, erro) {
            return $http.delete(url + '/menu/ope/' + menuPaginaPrincipalId).then(sucesso).catch(erro);
        }
        this.editar = function (novoMenuPaginaPrincipal, sucesso, erro) {
            return $http.put(url + '/menu/ope', novoMenuPaginaPrincipal).then(sucesso).catch(erro);
        }
    }
});