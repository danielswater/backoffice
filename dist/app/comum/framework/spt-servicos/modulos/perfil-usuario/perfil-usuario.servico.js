define(['angularAMD', 'PerfilUsuarioModelo', 'servicosConfig'], function (app) {

    app.service('PerfilUsuarioServico', PerfilUsuarioServico);

    PerfilUsuarioServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function PerfilUsuarioServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/perfil-usuario';

        this.listarMotivo = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }

        this.ativar = function (sucesso, erro) {
            return $http.get(url + '/ope/inativar').then(sucesso).catch(erro);
        }

        this.filtrar = function (perfil, sucesso, erro) {
            // Necessario passar dataParam para  o interceptor poder encriptar os parametros
            return $http.get(url, { params: { dataParam: perfil } }).then(sucesso).catch(erro);
        }

        this.deletar = function (id, sucesso, erro) {
            return $http.delete(url + '/ope/' + id).then(sucesso).catch(erro);
        }

        this.salvar = function (editaPerfil, sucesso, erro) {
            return $http.put(url + '/ope', editaPerfil).then(sucesso).catch(erro);
        }

        this.criar = function (criaPerfil, sucesso, erro) {
            return $http.post(url + '/ope', criaPerfil).then(sucesso).catch(erro);
        }

        this.detalhar = function (PerfilUsuarioId, sucesso, erro) {
            return $http.get(url + '/ope/' + PerfilUsuarioId).then(sucesso).catch(erro);
        }
    }
});
