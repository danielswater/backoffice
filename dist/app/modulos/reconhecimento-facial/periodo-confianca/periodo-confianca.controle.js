(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('PeriodoConfiancaControle', PeriodoConfiancaControle);

		PeriodoConfiancaControle.$inject = ['$scope', '$rootScope', '$uibModal', '$http', '$state',
			 'FiltroRequisicao',
			'RecursoPeriodoConfianca',
			'MensagensFabrica'
		]

		function PeriodoConfiancaControle($scope, $rootScope, $uibModal, $http, $state,
			 FiltroRequisicao,
			RecursoPeriodoConfianca,
			MensagensFabrica) {

			// $scope.espera = new Espera;
			$scope.config = {};

			$scope.espera = RecursoPeriodoConfianca.get({},
				function(resposta) {
					$scope.config = resposta;
					$scope.inicio = $scope.config.inicio;
					$scope.fim = $scope.config.termino;
				},
				function(resposta) {
					if(resposta.data == null){
						$scope.mensagemControle = {
							"tipo" : "ERRO",
							"class": "mensagem-erro",
							"data" : {
								"mensagem" : "Não foi possível conectar no servidor."
							}
						};
						console.log('resposta',resposta);
					} else {
						$scope.mensagemControle = MensagensFabrica.get(resposta.serverMessage.codigo);
					}
				}
			);

			$scope.salvar = function(){
				let inicio = $scope.inicio.split('T');
				$scope.config.inicio = inicio[0];
				let fim = $scope.fim.split('T');
				$scope.config.termino = fim[0];

				$scope.espera = RecursoPeriodoConfianca.create(
					$scope.config
				,
				function(resposta) {
					$scope.mensagemControle = MensagensFabrica.get(resposta);
					// Se aconteceu algum problema para salvar o registo, o tipo de resposta vai ser ERRO
					// Entâo enviamos para o console a resposta completa
					if(resposta.tipo == "ERRO"){
						console.log('resposta',resposta);
					}
				},
				function(resposta) {
					if(resposta.data == null){
						$scope.mensagemControle = {
							"tipo" : "ERRO",
							"class": "mensagem-erro",
							"data" : {
								"mensagem" : "Não foi possível conectar no servidor."
							}
						};
						console.log('resposta',resposta);
					} else {
						$scope.mensagemControle = MensagensFabrica.get(resposta.serverMessage.codigo);
					}
				});
			}

			$scope.cancelar = function(){
				$state.go('inicio');
			}
		}
	});
})();
