define(['angularAMD', 'CartaoServico'], function (app) {
	app.controller('DetalhesCadastroControle', DetalhesCadastroControle);

	DetalhesCadastroControle.$inject = ['$scope', '$q', '$uibModalInstance', 'modal', 'CartaoServico', 'ModalFabrica'];

	function DetalhesCadastroControle($scope, $q, $uibModalInstance, modal, CartaoServico, ModalFabrica) {

		$scope.modal = modal;

		$scope.filtro = new CartaoModelo();
		$scope.filtro.usuario = {
			id: modal.objeto.id
		}
		var promises = [];

		promises.push(
			CartaoServico.filtrar(
				$scope.filtro,
				function (resposta) {
					$scope.cartoes = resposta.data;
					listaProdutos();
				},
				function (resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			)
		);

		var listaProdutos = function () {
			var filtroProduto;

			($scope.cartoes).forEach(function (cartao) {
				filtroProduto = {
					cartao: {
						identificadorCartao: cartao.identificadorCartao
					}
				};
				promises.push(
					CartaoServico.filtrarProdutos(
						filtroProduto,
						function (resposta) {
							cartao.produtos = resposta.data;
						},
						function (resposta) {
							$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
						}
					)
				);
			}, this);
		};

		$scope.espera = $q.all(promises);

		$scope.abreOseModal = function (cartao) {
			var options = {
				templateUrl: 'app/modulos/cadastro/templates/ose.modal.html',
				controller: function ($uibModalInstance, $scope) {
					$scope.fechar = function () {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.oseModal = {
						codigoOSE: cartao.codigoOSE,
						situacao: cartao.situacaoOSE
					};
				}
			};
			ModalFabrica.abrirModal(options);
		};

		$scope.abreSituacaoModal = function (cartao) {
			console.log(cartao);
			$scope.espera = CartaoServico.filtrarOcorrencias(
				{identificadorCartao: cartao.identificadorCartao},
				function(resposta) {
					if (!angular.isArray(resposta.data)) {
						resposta.data = [resposta.data];
					}

					var options = {
						templateUrl: 'app/modulos/cadastro/templates/situacao.modal.html',
						size: 'modal-meio-grande',
						controller: function ($uibModalInstance, $scope) {
							$scope.ocorrencias = resposta.data
							$scope.cartao = cartao;
							$scope.fechar = function () {
								$uibModalInstance.dismiss('cancel');
							};
						}
					};
					ModalFabrica.abrirModal(options);
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		};

		$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.fechar = function () {
			$uibModalInstance.dismiss('cancel');
		};

	};

});