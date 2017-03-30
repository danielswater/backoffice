define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('ExcluirPerfilProdutoControle', ExcluirPerfilProdutoControle);

	ExcluirPerfilProdutoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'PerfilProdutoServico'];

	function ExcluirPerfilProdutoControle($scope, $uibModalInstance, modal, MensagensFabrica, PerfilProdutoServico) {

		$scope.modal = modal;

        $scope.mensagemServidor = MensagensFabrica.get(3);

		/**
		 * Funcao do botao ok da modal
		 */
		$scope.ok = function() {
			$uibModalInstance.close();
		}

		/**
		 * Funcao do botao fechar da modal
		 */
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		/**
		 * Funcao que exclui a Perfil do Produto
		 */
		$scope.excluir = function() {
			$scope.espera = PerfilProdutoServico.deletar(
				$scope.modal.objeto.produto.id,
				function(resposta) {
					if (!resposta.data.dataExcecao) {
						// sucesso
						$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
					} else {
						// erro
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		}

	}
});