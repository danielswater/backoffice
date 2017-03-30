/**
 * @directive = sptBotaoAlternar
 *
 * Diretiva que abre modal tratando condições (true or false)
 *  
 */

define(['angularAMD', 'app/comum/diretivas/spt-botao-alternar/spt-botao-alternar.controle.js'], function(app) {

	app.directive('sptBotaoAlternar', function() {

		return {
			restrict: 'E',
			scope: {
				callback: '&',
				trataObjeto: '&?',
				classeVerdadeiro: '@?',
				classeFalso: '@?',
				textoVerdadeiro: '@',
				textoFalso: '@',
				condicao: '=',
				posicao: '@',
				modulo: '@',
				objeto: '=',
				tituloVerdadeiro: '@?',
				tituloFalso: '@?',
				acao: '@',
				icone: '@'
			},
			controller: 'BotaoAlternarControle',
			templateUrl: 'app/comum/diretivas/spt-botao-alternar/spt-botao-alternar.html'
		}

	});

});