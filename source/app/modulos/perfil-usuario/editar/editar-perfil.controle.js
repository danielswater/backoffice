define(['angularAMD'], function(app) {
	app.controller('EditarPerfilControle', EditarPerfilControle);

	EditarPerfilControle.$inject = ['$scope', '$uibModalInstance', 'modal',
		'$timeout', 'MensagensFabrica', 'PerfilUsuarioServico', 'MensagensFabrica'
	];

	function EditarPerfilControle($scope, $uibModalInstance, modal, MensagensFabrica, PerfilUsuarioServico, MensagensFabrica
	) {

		$scope.modal = modal;
		$scope.editar = modal.objeto;


			$scope.espera = PerfilUsuarioServico.detalhar(
				modal.objeto.id,
				function(resposta){
					$scope.perfil = resposta.data;


				}, function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);

		$scope.editarSubmit = function(){
			console.log($scope.perfil, 'PERFIL');
				$scope.espera = PerfilUsuarioServico.salvar(
					$scope.perfil,
					function(resposta) {
						$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
						console.log($scope.mensagemRetorno);
						console.log(resposta, 'RESPOSTA');
					},
					function(resposta) {
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				);
		};





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
