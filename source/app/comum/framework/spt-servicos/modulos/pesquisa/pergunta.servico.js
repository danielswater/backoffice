define(['angularAMD', 'PerguntaModelo', 'servicosConfig', 'ServicoUtils'], function (app) {

    app.service('PerguntaServico', PerguntaServico);

    PerguntaServico.$injector = ['$http', 'SERVICOS_CONFIG', 'ServicoUtils'];

    function PerguntaServico($http, SERVICOS_CONFIG, ServicoUtils) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/gerenciar-pesquisa';
        this.listarCategoriaPergunta = function (sucesso, erro) {
            return $http.get(url + '/categoria-pergunta').then(sucesso).catch(erro);
        }
        this.listarTipoResposta = function (sucesso, erro) {
            return $http.get(url + '/tipo-resposta').then(sucesso).catch(erro);
        }
         this.listarMotivoInativacao = function (sucesso, erro) {
            return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
        }
        this.filtrar = function (pergunta, sucesso, erro) {
            filtro = {
                idCategoriaPergunta: (pergunta.CategoriaPergunta ? pergunta.CategoriaPergunta.id : ''),
                textoPergunta: (pergunta.textoPergunta ? pergunta.textoPergunta : '')
            };
            return $http.get(url+'/pergunta', { params: filtro }).then(sucesso).catch(erro);
        }
        this.criar = function (Pergunta, sucesso, erro) {
            return $http.post(url + '/ope', {Pergunta}).then(sucesso).catch(erro);
        }
        this.detalhar = function (perguntaId, sucesso, erro) {
            return $http.get(url + '/ope/' + perguntaId).then(sucesso).catch(erro);
        }
        this.salvar = function (Pergunta, sucesso, erro) {
            return $http.put(url + '/ope', {Pergunta}).then(sucesso).catch(erro);
        }
        this.salvarResposta = function (Resposta, sucesso, erro) {
            return $http.put(url + '/ope', {Resposta}).then(sucesso).catch(erro);
        }
        
        this.ativar = function (Pergunta, sucesso, erro) {
            return $http.post(url + '/pergunta/ativar', {Pergunta}).then(sucesso).catch(erro);
        }
        this.inativar = function (Pergunta, sucesso, erro) {
            return $http.post(url + '/pergunta/inativar', {Pergunta}).then(sucesso).catch(erro);
        }
        this.deletar = function (perguntaId, sucesso, erro) {
            return $http.delete(url + '/ope/' + perguntaId).then(sucesso).catch(erro);
        }
        this.deletarResposta = function (resposta, sucesso, erro) {
            return $http.delete(url + '/ope/' + resposta.idPergunta + '/' + resposta.idResposta).then(sucesso).catch(erro);
        }
        this.importar = function (pergunta,sucesso, erro) {
            return $http.post(url + '/ope/pergunta/importar',pergunta).then(sucesso).catch(erro);
        }
    }
});