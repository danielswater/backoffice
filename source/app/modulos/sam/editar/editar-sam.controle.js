define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('EditarSamControle', EditarSamControle);

	EditarSamControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'SamServico'];

	function EditarSamControle($scope, $uibModalInstance, modal, MensagensFabrica, SamServico) {

		$scope.modal = modal;
		/**
		 * Chama servico para carregar os tipos de SAM
		 */
		var carregarTipos = function () {
			$scope.espera = SamServico.listarTipoSAM(
				function(resposta){
					$scope.samsTipos = resposta.data;
				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				}
			);
		};

		carregarTipos();

		$scope.espera = SamServico.detalhar(
			modal.objeto.id,
			function (resposta){
				$scope.sam = resposta.data;
			},
			function (resposta){
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		/**
		 * Edita uma SAN
		 */
		$scope.editar = function() {
			$scope.sam.registro = {
				usuarioAlteracao: 'SPTRANS'
			};
			$scope.espera = SamServico.salvar(
				$scope.sam,
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
	}

});