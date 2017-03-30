(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('ExpurgoControle', ExpurgoControle);

		ExpurgoControle.$inject = ['$scope', '$rootScope', '$uibModal', '$http', '$state', '$timeout', 'RecursoExpurgo']

		function ExpurgoControle($scope, $rootScope, $uibModal, $http, $state, $timeout, RecursoExpurgo) {

			// $scope.espera = new Espera;
			$scope.config = {};

			$scope.espera = RecursoExpurgo.get({},
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

			$scope.expurgoLimiteAutomatico = function(){
				$scope.config.periodoAutomatico
				if($scope.config.periodoAutomatico != undefined){
					if($scope.config.periodoAutomatico.length > 1){
						$scope.config.periodoAutomatico = $scope.config.periodoAutomatico.substring(0, 1);
					}
					if($scope.config.periodoAutomatico < 2){
						$scope.config.periodoAutomatico = 2;
					}
					if($scope.config.periodoAutomatico > 5){
						$scope.config.periodoAutomatico = 5;
					}
				}
			};

			$scope.expurgoLimiteManual = function(){
				if($scope.config.periodoManual != undefined){
					if($scope.config.periodoManual.length > 1){
						$scope.config.periodoManual = $scope.config.periodoManual.substring(0, 1);
					}
					if($scope.config.periodoManual < 2){
						$scope.config.periodoManual = 2;
					}
					if($scope.config.periodoManual > 5){
						$scope.config.periodoManual = 5;
					}
				}
			};

			$scope.salvar = function(){
				$scope.espera = RecursoExpurgo.create(
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
