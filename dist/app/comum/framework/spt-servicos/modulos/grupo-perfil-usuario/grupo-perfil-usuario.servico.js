define(['angularAMD', 'GrupoPerfilUsuarioModelo', 'servicosConfig'], function (app) {

    app.service('GrupoPerfilUsuarioServico', GrupoPerfilUsuarioServico);

    GrupoPerfilUsuarioServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function GrupoPerfilUsuarioServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/grupo-perfil-usuario';

        this.listarMotivo = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }

        this.ativar = function (sucesso, erro) {
            return $http.get(url + '/ope/inativar').then(sucesso).catch(erro);
        }

        this.filtrar = function (perfil, sucesso, erro) {
            filtro = {
                id: perfil.id,
                nomeGrupoPerfil: perfil.nomeGrupoPerfil,
                nomeExibicaoPerfil: perfil.nomeExibicaoPerfil,

            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
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

        this.detalhar = function (GrupoPerfilUsuarioId, sucesso, erro) {
            return $http.get(url + '/ope/' + GrupoPerfilUsuarioId).then(sucesso).catch(erro);
        }

    }
});
