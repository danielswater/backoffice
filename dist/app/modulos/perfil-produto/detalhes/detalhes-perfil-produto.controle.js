define(['angularAMD'], function (app) {
	app.controller('DetalhesPerfilProdutoControle', DetalhesProdutoControle);

	DetalhesProdutoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'PerfilProdutoServico', 'MensagensFabrica'];

	function DetalhesProdutoControle($scope, $uibModalInstance, modal, PerfilProdutoServico, MensagensFabrica) {

		$scope.modal = modal;
		$scope.modal.titulo = "Consultar Detalhes do Produto";
		$scope.produto = new PerfilProdutoModelo();

		$scope.aplicacaolista = [];
		$scope.aplicacaolista['S'] = 'Transporte';
		$scope.aplicacaolista['N'] = 'Não Transporte';
		$scope.aplicacaolista['A'] = 'Ambas';

		$scope.espera = PerfilProdutoServico.detalhar(
			$scope.modal.objeto.produto.id,
			function (resposta) {
				$scope.produto = resposta.data;
			},
			function (resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function () {
			$uibModalInstance.dismiss('cancel');
		};

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function () {
			$uibModalInstance.close();
		};

	};

});