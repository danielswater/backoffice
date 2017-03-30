/**
 * @directive = sptMensagemErro
 *
 * diretiva criada para a geração de mensagem de erro
 * 
 */
define(['angularAMD', 'app/comum/diretivas/spt-mensagem-erro/spt-mensagem-erro.controle.js'], function(app) {

	app.directive('sptMensagemErro', function() {

		return {
			restrict: 'E',
			scope: {
				form: '=',
				mensagemServidor: '=?',
				contexto: '@'
			},
			controller: 'MensagemErroControle',
			templateUrl: 'app/comum/diretivas/spt-mensagem-erro/spt-mensagem-erro.html'
		}

	});

});