define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('AtivarEmissaoCreditoControle', AtivarEmissaoCreditoControle);

	AtivarEmissaoCreditoControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'EmissaoCreditoServico'];

	function AtivarEmissaoCreditoControle($scope, $uibModalInstance, modal, MensagensFabrica, EmissaoCreditoServico) {

		$scope.modal = modal;
		$scope.motivoLista = [];

		$scope.espera = EmissaoCreditoServico.detalhar(
			$scope.modal.objeto.id,
			function(resposta) {
				$scope.emissao = resposta.data;
				$scope.modal.situacao = $scope.emissao.registro.situacao.id;
				delete $scope.emissao.registro.motivo;
			},
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		if ($scope.modal.objeto.registro.situacao.id == 'A') {
			$scope.espera = EmissaoCreditoServico.listarMotivoInativacao(
				function(resposta) {
					$scope.motivoLista = resposta.data;
				}, function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
				}
			);
		}

		$scope.ok = function() {
			$uibModalInstance.close();
		}

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ativar = function() {
			// TODO: Pegar usuario logado
			$scope.emissao.registro.usuarioAlteracao = 'SPTRANS';

			$scope.espera = EmissaoCreditoServico.ativar(
				$scope.emissao,
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