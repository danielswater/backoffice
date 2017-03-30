(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', './recurso.js'], function(app) {

		app.controller('MidiaControle', MidiaControle);

		MidiaControle.$inject = ['$scope', '$uibModal',
			'FiltroRequisicao',
			'RecursoMidia',
			'MensagensFabrica'
		]

		function MidiaControle($scope, $uibModal,
			FiltroRequisicao,
			RecursoMidia,
			MensagensFabrica) {

			$scope.situacoes = [{
				nome: 'Todos(as)',
				valor: ''
			}, {
				nome: 'Ativo',
				valor: 'A'
			}, {
				nome: 'Inativo',
				valor: 'I'
			}];

			$scope.filtro = {
				aberto: true
			};

			$scope.tiposMidia = [];

			RecursoMidia.get({
					id: 'rds'
				},
				function(resposta) {
					$scope.tiposMidia = resposta.data.TipoMidia;
				});

			$scope.preFiltrar = function() {
				$scope.midias = [];
				delete $scope.mensagemServidor;
				$scope.filtroValor = {
					'tipo.id': $scope.filtro.tipoMidia.id || '',
					tipoMidia: $scope.filtro.tipoMidia.descricao,
					nomeMidia: $scope.filtro.nomeMidia,
					status: $scope.filtro.situacao.valor
				}
				$scope.filtrar(new FiltroRequisicao);
			}

			$scope.carregarItem = function(id) {
				$scope.midias = [];
				delete $scope.mensagemServidor;

				$scope.espera = RecursoMidia.get({
						id: id
					},
					function(resposta) {
						callbackSucessoFiltro(resposta);
					},
					function(resposta) {
						callbackErroFiltro(resposta);
					}
				);
			}

			$scope.filtrar = function(filtroRequisicao) {
				filtroRequisicao = _.merge(filtroRequisicao, $scope.filtroValor);

				$scope.espera = RecursoMidia.query(
					filtroRequisicao,
					function(resposta) {
						callbackSucessoFiltro(resposta);
					},
					function(resposta) {
						callbackErroFiltro(resposta);
					}
				);
			};

			var callbackSucessoFiltro = function(resposta) {
				if (!resposta.data.length) {
					resposta.data = [resposta.data.MidiaView.Midia];
				}
				$scope.midias = $scope.midias.concat(resposta.data);
				$scope.filtro.aberto = false;
			}

			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.midias.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			}

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				$scope.filtro.tipoMidia = '';
				$scope.filtro.nomeMidia = '';
				$scope.filtro.situacao = $scope.situacoes[0];
				$scope.mensagemServidor = '';
			};
		}
	});
})();