(function() {

	'use strict';

	define(['angularAMD', 'dirPagination','sptBotaoAlternar','PerguntaServico', './recurso.js'], function(app) {

		app.controller('PesquisaPerguntaControle', PesquisaPerguntaControle);

		PesquisaPerguntaControle.$inject = ['$scope', '$rootScope', '$uibModal','FiltroRequisicao','RecursoCredito','MensagensFabrica','PerguntaServico'
		]

		function PesquisaPerguntaControle ($scope, $rootScope, $uibModal,FiltroRequisicao,RecursoCredito,MensagensFabrica,PerguntaServico){
			
			$scope.filtro = {
				aberto: true
			};

			/**
		 	* Categoria da Pergunta
			*/
			$scope.espera = PerguntaServico.listarCategoriaPergunta(
				function(resposta){
					$scope.CategoriaPergunta = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
			/**
			* Pesquisar
			*/
			$scope.preFiltrar = function() {
				$scope.pergunta = [];
				delete $scope.mensagemServidor;
				$scope.espera = PerguntaServico.filtrar($scope.filtro, callbackSucessoFiltro, callbackErroFiltro);
			};
			
			/**
			* Funcao callback de sucesso
			*/
			var callbackSucessoFiltro = function(resposta) {
				if (resposta.data.dataExcecao) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				} else {
					if (!angular.isArray(resposta.data)) {
						resposta.data = [resposta.data];
					}
				}

				$scope.filtro.aberto = false;
				$scope.pergunta = resposta.data[0].Pergunta;
				
				(!$scope.pergunta) ? ($scope.filtro.aberto = true,$scope.mensagemRetorno = MensagensFabrica.get(8)) : $scope.mensagemRetorno = '';
			}
			/**
			 * Funcao callback de erro
			 */
			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.pergunta.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			}
			$scope.fechar = function() {
				$uibModalInstance.dismiss('cancel');
			};
	
			$scope.limpar = function() {
				$scope.pergunta = [];
				$scope.mensagemRetorno = ''
				$scope.filtro.textoPergunta = '';
				$scope.filtro.CategoriaPergunta = '';
				$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			};
		}
	});
})();