(function() {

	'use strict';

	define(['angularAMD', 'dirPagination', 'CartaoServico'], function(app) {

		app.controller('CartaoControle', CartaoControle);

		CartaoControle.$inject = ['$scope', 'MensagensFabrica', 'CartaoServico']

		function CartaoControle($scope, MensagensFabrica, CartaoServico) {

            // Inicializacao
            $scope.filtroCartao = new CartaoModelo();

			$scope.situacoes = [{
				descricao: 'Ativo',
				id: 'A'
			}, {
				descricao: 'Inativo',
				id: 'I'
			}];

			$scope.filtro = {
				aberto: true
			};

			$scope.preFiltrar = function() {
				$scope.cartoes = [];
				delete $scope.mensagemServidor;
				$scope.espera = CartaoServico.filtrar(filtroCartao, callbackSucessoFiltro, callbackErroFiltro);
			}

			$scope.carregarCartao = function(id) {
				$scope.cartoes = [];
				delete $scope.mensagemServidor;

				$scope.espera = CartaoServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
			}

			var callbackSucessoFiltro = function(resposta) {
				if (!resposta.data.length) {
					resposta.data = [resposta.data];
				}
				$scope.cartoes = $scope.cartoes.concat(resposta.data);
				$scope.filtro.aberto = false;
			}

			var callbackErroFiltro = function(resposta) {
				if (resposta.status == 404 && $scope.cartoes.length == 0) {
					$scope.mensagemServidor = MensagensFabrica.get(20008);
				} else {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			}

			$scope.limpar = function() {
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
				$scope.filtroCartao.numeroLogico = '';
				$scope.filtroCartao.numeroFisico = '';
				$scope.filtroCartao.situacao = '';
				$scope.mensagemServidor = '';
			};
		}
	});
})();