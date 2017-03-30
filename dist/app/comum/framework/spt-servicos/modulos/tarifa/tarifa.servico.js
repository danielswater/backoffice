define(['angularAMD', 'Tarifa', 'servicosConfig'], function (app) {

    app.service('TarifaServico', TarifaServico);

    TarifaServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function TarifaServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/tarifa';

        this.listarMotivo = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }


        this.listarTipoTarifa = function (sucesso, erro) {
            return $http.get(url + '/tipo-tarifa').then(sucesso).catch(erro);
        }


        this.ativar = function (sucesso, erro) {
            return $http.get(url + '/ope/inativar').then(sucesso).catch(erro);
        }



        this.filtrar = function (tarifa, sucesso, erro) {

            filtro = {
                id: tarifa.id,
                nome : tarifa.nome,
                tipo : tarifa.tipo,
                codigoLegislacao : tarifa.codigoLegislacao,
                dataReajuste : tarifa.dataReajuste,
                modal : tarifa.listaModal,
            };

            //
            // filtro.nome
            // filtro.tipo.descricao
            // filtro.codigoLegislacao
            // filtro.dataReajuste
            // filtro.listaModal
            //
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }


        this.deletar = function (id, sucesso, erro) {
            return $http.delete(url + '/ope/' + id).then(sucesso).catch(erro);
        }

        // this.detalhar = function (tarifaId, sucesso, erro) {
        //     return $http.get(url + '/' + tarifaId).then(sucesso).catch(erro);
        // }
        // this.criar = function (novaSam, sucesso, erro) {
        //     return $http.post(url, novaSam).then(sucesso).catch(erro);
        // }
        // this.deletar = function (samId, sucesso, erro) {
        //     return $http.delete(url + '/' + samId).then(sucesso).catch(erro);
        // }

        this.salvar = function (editaTarifa, sucesso, erro) {
            return $http.put(url + '/ope', editaTarifa).then(sucesso).catch(erro);
        }

        this.criar = function (novaTarifa, sucesso, erro) {
            return $http.post(url + '/ope', novaTarifa).then(sucesso).catch(erro);
        }

        this.detalhar = function (TarifaId, sucesso, erro) {
            return $http.get(url + '/ope/' + TarifaId).then(sucesso).catch(erro);
        }

    }
});
