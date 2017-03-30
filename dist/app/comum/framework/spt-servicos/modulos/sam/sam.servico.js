define(['angularAMD', 'SamModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('SamServico', SamServico);

    SamServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function SamServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/sam';

        this.listarTipoSAM = function (sucesso, erro) {
            return $http.get(url + '/tipo-sam').then(sucesso).catch(erro);
        }
        this.listarMotivoInativacao = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }
        this.filtrar = function (sam, sucesso, erro) {
            // Necessario passar dataParam para  o interceptor poder encriptar os parametros
            return $http.get(url, { params: {dataParam: sam} }).then(sucesso).catch(erro);
        }
        this.detalhar = function (samId, sucesso, erro) {
            return $http.get(url + '/ope/' + samId).then(sucesso).catch(erro);
        }
        this.criar = function (novaSam, sucesso, erro) {
            return $http.post(url + '/ope', novaSam).then(sucesso).catch(erro);
        }
        this.deletar = function (samId, sucesso, erro) {
            return $http.delete(url + '/ope/' + samId).then(sucesso).catch(erro);
        }
        this.salvar = function (novaSam, sucesso, erro) {
            return $http.put(url + '/ope', novaSam).then(sucesso).catch(erro);
        }
        this.ativar = function (sam, sucesso, erro) {
            return $http.put(url + '/ope', sam).then(function(resposta) {
                if (!resposta.data.dataExcecao) {
                    resposta.data.codigo = ServicoUtils.deParaMensagem(resposta.data.codigo, sam.registro.situacao.id);
                }
                sucesso(resposta);
            }).catch(erro);
        }
    }
});