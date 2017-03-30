define(['angularAMD'], function(app) {
	app.controller('DetalhesPerfilControle', DetalhesPerfilControle);

	DetalhesPerfilControle.$inject = ['$scope', '$uibModalInstance', 'modal',
	'MensagensFabrica', 'GrupoPerfilUsuarioServico'
	];

	function DetalhesPerfilControle($scope, $uibModalInstance, modal, MensagensFabrica, GrupoPerfilUsuarioServico
		) {

			$scope.modal = modal;
					$scope.modal.titulo = "Detalhes do Grupo de Perfil";
					$scope.perfil = new GrupoPerfilUsuarioModelo();

					$scope.espera = GrupoPerfilUsuarioServico.detalhar(
						$scope.modal.objeto.id,
						function(resposta) {
							$scope.perfil = resposta.data;
						},
						function(resposta) {
							$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
						}
					);


		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.quantidadeAnalise;
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};


	};
});
