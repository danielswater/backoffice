(function() {

	'use strict';

	define(['angularAMD', './recurso.js'], function(app) {

		app.controller('TipoArquivoControle', TipoArquivoControle);

		TipoArquivoControle.$injector = ['$scope', '$rootScope', '$uibModal',
			'FiltroRequisicao',
			'RecursoTipoArquivo',
			'MensagensFabrica'
		]

		function TipoArquivoControle($scope, $rootScope, $uibModal,
			FiltroRequisicao,
			RecursoTipoArquivo,
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

			$scope.comboFiltros = [{
				descricao: 'Todos(as)',
				id: ''
			}]

			RecursoTipoArquivo.get('', function(resposta) {
				$scope.tipoArquivoFiltro = resposta.data;
				$scope.comboFiltros = $scope.comboFiltros.concat($scope.tipoArquivoFiltro);
			});

			$scope.filtro = {
				aberto: true
			};

			$scope.carregarItem = function(id) {
				$scope.tiposArquivo = [];
				delete $scope.mensagemServidor;				

				$scope.espera = RecursoTipoArquivo.get({
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

			$scope.preFiltrar = function() {
				$scope.tiposArquivo = [];
				delete $scope.mensagemServidor;
				$scope.filtroValor = {
					id: $scope.filtro.tipoArquivo.id,
					status: $scope.filtro.situacao.valor
				}
				$scope.filtrar(new FiltroRequisicao);
			}

			$scope.filtrar = function(filtroRequisicao) {
				filtroRequisicao = _.merge(filtroRequisicao, $scope.filtroValor);

				$scope.espera = RecursoTipoArquivo.query(
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
					resposta.data = [resposta.data];
				}
				$scope.tiposArquivo = $scope.tiposArquivo.concat(resposta.data);
				$scope.filtro.aberto = false;
			}

			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.tiposArquivo.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			}			

			$scope.listaTipoArquivo = function() {
				RecursoTipoArquivo.get('', function(data) {
					$scope.tiposArquivo = data.data;
				});
			}

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				// verificar os campos limpos
				$scope.filtro.tipoArquivo = $scope.comboFiltros[0];
				$scope.filtro.situacao = $scope.situacoes[0];
			};
		}

	});

})();