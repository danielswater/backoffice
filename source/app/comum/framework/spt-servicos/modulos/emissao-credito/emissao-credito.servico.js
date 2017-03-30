define(['angularAMD', 'EmissaoCreditoModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('EmissaoCreditoServico', EmissaoCreditoServico);

    EmissaoCreditoServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function EmissaoCreditoServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/tipo-emissao-credito';

        this.listarTipoVigencia = function (sucesso, erro) {
            return $http.get(url + '/tipo-vigencia-credito').then(sucesso).catch(erro);
        }
        this.listarAplicaoCredito = function (sucesso, erro) {
            return $http.get(url + '/tipo-aplicacao-credito').then(sucesso).catch(erro);
        }
        this.listarTipoTarifario = function (sucesso, erro) {
            return $http.get(url + '/tipo-tarifario').then(sucesso).catch(erro);
        }
        this.filtrar = function (emissao, sucesso, erro) {
            filtro = {
                'id': (emissao.id ? emissao.id : ''),
                emissorCredito: emissao.emissorCredito,
                'creditoEletronico': (emissao.creditoEletronico ? emissao.creditoEletronico.id : ''),
                'vigenciaCreditoTemporal': (emissao.vigenciaCreditoTemporal ? emissao.vigenciaCreditoTemporal.id : ''),
                'tipoTarifario': (emissao.tipoTarifario ? emissao.tipoTarifario.id : ''),
                'tipoAplicacaoTransporte': (emissao.tipoAplicacaoTransporte ? emissao.tipoAplicacaoTransporte.id : '')
            };
            // Necessario passar dataParam para  o interceptor poder encriptar os parametros
            return $http.get(url, { params: { dataParam: filtro } }).then(sucesso).catch(erro);
        }
        this.detalhar = function (emissaoId, sucesso, erro) {
            return $http.get(url + '/ope/' + emissaoId).then(sucesso).catch(erro);
        }
        this.salvar = function (novaEmissao, sucesso, erro) {
            return $http.put(url + '/ope', novaEmissao).then(sucesso).catch(erro);
        }
        this.listarMotivoInativacao = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }
        this.listarModal = function (sucesso, erro) {
            return $http.get(url + '/modal').then(sucesso).catch(erro);
        }
        this.ativar = function (emissao, sucesso, erro) {
            return $http.put(url + '/ope', emissao).then(function (resposta) {
                if (!resposta.data.dataExcecao) {
                    resposta.data.codigo = ServicoUtils.deParaMensagem(resposta.data.codigo, emissao.registro.situacao.id);
                }
                sucesso(resposta);
            }).catch(erro);
        }
        this.deletar = function (emissaoId, sucesso, erro) {
            return $http.delete(url + '/ope/' + emissaoId).then(sucesso).catch(erro);
        }
        this.criar = function (novaEmissao, sucesso, erro) {
            return $http.post(url + '/ope', novaEmissao).then(sucesso).catch(erro);
        }
    }
});