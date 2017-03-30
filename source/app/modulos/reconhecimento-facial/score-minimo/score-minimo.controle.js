(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('ScoreMinimoControle', ScoreMinimoControle);

		ScoreMinimoControle.$inject = ['$scope', '$rootScope', '$uibModal', '$http', '$state', '$timeout', 
			'FiltroRequisicao',
			'RecursoScore',
			'MensagensFabrica'
		]

		function ScoreMinimoControle($scope, $rootScope, $uibModal, $http, $state, $timeout, 
			FiltroRequisicao,
			RecursoScore,
			MensagensFabrica) {

			$scope.config = {};

			$scope.espera = RecursoScore.get({},
				function(resposta) {
					$scope.config.score = resposta.score;
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

			$scope.scoreMinimoLimite = function(){
				let score = $scope.config.score;
				if(score != undefined){
					if(score.length > 3){
						$scope.config.score = score.substring(0, 3);
					}
					if(score > 100){
						$scope.config.score = 100;
					}
				}
			};

			$scope.salvar = function(){
				$scope.espera = RecursoScore.create(
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