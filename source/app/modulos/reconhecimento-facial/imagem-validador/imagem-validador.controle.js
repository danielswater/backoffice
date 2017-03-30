(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('ImagemValidadorControle', ImagemValidadorControle);

		ImagemValidadorControle.$inject = ['$scope', '$rootScope', '$uibModal', 'ImagemValidadorRequisicao',
			'RecursoImagemValidador',
			'MensagensFabrica'
		]

		function ImagemValidadorControle ($scope, $rootScope, $uibModal,
			 ImagemValidadorRequisicao,
			RecursoImagemValidador,
			MensagensFabrica) {


			$scope.mensagemServidor = {};
			$scope.filtro = {
				aberto: true
			};

			$scope.preFiltrar = function() {
				let inicio = $scope.filtro.dataInicio.split('T');
				inicio = inicio[0];
				let fim = $scope.filtro.dataTermino.split('T');
				fim = fim[0];

				$scope.imagensValidador = [];
				$scope.mensagemServidor = {};
				$scope.filtroValor = {
					nroRegistro: 1,
					nroCartao: $scope.filtro.nroCartao,
					dataInicio: inicio,
					dataTermino: fim
				}
				$scope.filtrar(new ImagemValidadorRequisicao($scope.filtroValor));
			}

			$scope.carregarItem = function(id) {
				$scope.imagensValidador = [];
				$scope.mensagemServidor = {};

				$scope.espera = RecursoImagemValidador.get({
						id: id
					},
					function(resposta) {
						if (!resposta.data.length) {
							resposta.data = [resposta.data];
						}
						$scope.imagensValidador = $scope.imagensValidador.concat(resposta.data);
						$scope.filtro.aberto = false;
					},
					function(resposta) {
						if (resposta.status == 404 && $scope.imagensValidador.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
						}
					}
				);
			}

			$scope.filtrar = function(filtro) {
				filtro = _.merge(filtro, $scope.filtroValor);

				$scope.espera = RecursoImagemValidador.query(
					filtro,
					function(resposta) {
						if (resposta != null && resposta != "null" && resposta != undefined) {
							if(resposta.imagemValidador){
								$scope.imagensValidador = $scope.imagensValidador.concat(resposta.imagemValidador);
								$scope.filtro.aberto = false;
							}
						} else {
							$scope.mensagemServidor.descricao = "Nenhum resultado encontrado com os filtros escolhidos!";
						}
					},
					function(resposta) {
						if (resposta.status == 404 && $scope.imagensValidador.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
						}
					}
				);
			};

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
				$scope.mensagemServidor = {};
				delete $scope.filtro.numeroCartao;
			};
		}
	});
})();
