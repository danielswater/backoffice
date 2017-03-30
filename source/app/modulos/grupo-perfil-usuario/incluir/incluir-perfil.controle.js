define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('IncluirPerfilControle', IncluirPerfilControle);

	IncluirPerfilControle.$inject = ['$scope', '$uibModalInstance', 'modal',
	'MensagensFabrica', 'GrupoPerfilUsuarioServico'
];

function IncluirPerfilControle($scope, $uibModalInstance, modal, MensagensFabrica, GrupoPerfilUsuarioServico
) {

	$scope.modal = modal;
	$scope.editar = modal.objeto;

		//
		// $scope.espera = GrupoPerfilUsuarioServico.detalhar(
		// 	modal.objeto.id,
		// 	function(resposta){
		// 		$scope.perfil = resposta.data;
		//
		//
		// 	}, function(resposta) {
		// 		$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
		// 	}
		// );

		$scope.incluirSubmit = function() {
			// TODO: Pegar o usuario logado
			$scope.perfil.registro = {
				usuarioCriacao: 'SPTRANS'
			};

			$scope.espera = GrupoPerfilUsuarioServico.criar(
				$scope.perfil,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.data.codigo);
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
