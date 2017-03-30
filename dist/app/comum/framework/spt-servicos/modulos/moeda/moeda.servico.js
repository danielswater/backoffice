define(['angularAMD', 'MoedaModelo', 'servicosConfig'], function (app) {

    app.service('MoedaServico', MoedaServico);

    MoedaServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function MoedaServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/moeda';

        this.listar = function (sucesso, erro) {
            return $http.get(url).then(sucesso).catch(erro);
        }
        this.filtrar = function (moeda, sucesso, erro) {
            var filtro = {
				id : moeda.id ? moeda.id : null,
				descricao : moeda.descricao ? moeda.descricao : null,
				sigla : moeda.sigla ? moeda.sigla : null,
				dataVigenciaInicial	 : moeda.dataVigenciaInicial ? moeda.dataVigenciaInicial : null,
				dataVigenciaFinal : moeda.dataVigenciaFinal ? moeda.dataVigenciaFinal : null,
                'registro.motivo.id': (moeda.registro && moeda.registro.motivo) ? moeda.registro.motivo.id : null
            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }
        this.detalhar = function (moedaId, sucesso, erro) {
            return $http.get(url + '/ope/' + moedaId).then(sucesso).catch(erro);
        }
        this.incluir = function (novaMoeda, sucesso, erro) {
            return $http.post(url + '/ope', novaMoeda).then(sucesso).catch(erro);
        }
        this.excluir = function (moedaId, sucesso, erro) {
            return $http.delete(url + '/ope/' + moedaId).then(sucesso).catch(erro);
        }
        this.editar = function (novaMoeda, sucesso, erro) {
            return $http.put(url + '/ope', novaMoeda).then(sucesso).catch(erro);
        }
    }
});
