define(['angularAMD', 'app/comum/diretivas/spt-modal/spt-modal-acao.controle.js'], function(app) {

	app.directive('sptModalAcao', sptModalAcao);
	
	function sptModalAcao() {
		return {
			restrict: 'A',
			scope: {
				modulo: '@',
				acao: '@',
				objeto: '=',
				titulo: '@',
				trataObjeto: '&?',
				caminhoModulo: '@?',
				callback: '&',				
				tamanho: '@?',
				nomeModal: '@?'
			},
			controller: 'sptModalAcaoControle',
			link: function(scope, element, attrs) {
				element.on('click', function() {
					if (!scope.bloqueado) {
						scope.bloqueado = !scope.bloqueado
						var objeto = scope.objeto;

						//verifica se existe funcao trataObjeto definida
						if (!!scope.trataObjeto()) {
							objeto = scope.trataObjeto();
						}

						var modal = {
							objeto: objeto
						}				

						scope.abrirModal(modal);						
					}
				})

			}
		}
	}

});