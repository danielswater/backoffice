(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('PermanenciaControle', PermanenciaControle);

		PermanenciaControle.$inject = ['$scope', '$rootScope', '$uibModal', '$http', '$state',
			 'FiltroRequisicao',
			'RecursoPermanencia',
			'MensagensFabrica'
		]

		function PermanenciaControle($scope, $rootScope, $uibModal, $http, $state,
			 FiltroRequisicao,
			RecursoPermanencia,
			MensagensFabrica) {

			// $scope.espera = new Espera;
			$scope.config = {};

			$scope.espera = RecursoPermanencia.get({},
				function(resposta) {
					$scope.config = resposta;
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
				$scope.espera = RecursoPermanencia.create(
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
