define(['angularAMD', 'FaqModelo', 'servicosConfig'], function (app) {

    app.service('FaqServico', FaqServico);

    FaqServico.$injector = ['$http', 'SERVICOS_CONFIG'];

    function FaqServico($http, SERVICOS_CONFIG) {

        let url = SERVICOS_CONFIG.url + '/v1/sbe/faq';

		this.listaMotivoInativacao = function(sucesso, erro){
			return $http.get(url + '/motivo-inativacao').then(sucesso).catch(erro);
		}
        this.listarCategoriasFaq = function (sucesso, erro) {
            return $http.get(url + '/categoria').then(sucesso).catch(erro);
        }
        this.filtrar = function (faq, sucesso, erro) {
			console.log('faq',faq);
			
            filtro = {
                'categoria.id': (faq.categoria ? faq.categoria.id : ''),
                txPerguntaFrequente: (faq.pergunta ? faq.pergunta : '')
            };
            return $http.get(url, { params: filtro }).then(sucesso).catch(erro);
        }
        this.detalhar = function (faqId, sucesso, erro) {
            return $http.get(url + '/ope/' + faqId).then(sucesso).catch(erro);
        }
        this.incluir = function (novaFaq, sucesso, erro) {
            return $http.post(url + '/ope', novaFaq).then(sucesso).catch(erro);
        }
        this.excluir = function (faqId, sucesso, erro) {
            return $http.delete(url + '/ope/' + faqId).then(sucesso).catch(erro);
        }
        this.editar = function (novaFaq, sucesso, erro) {
            return $http.put(url + '/ope', novaFaq).then(sucesso).catch(erro);
        }
    }
});