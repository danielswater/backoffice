define(['angularAMD', 'GrupoPerfilUsuarioServico'], function(app) {
	app.controller('AtivarGrupoPerfilUsuarioControle', AtivarGrupoPerfilUsuarioControle);

	AtivarGrupoPerfilUsuarioControle.$inject = ['$scope', '$uibModalInstance', 'modal', '$timeout', 'GrupoPerfilUsuarioServico', 'MensagensFabrica'
];

function AtivarGrupoPerfilUsuarioControle($scope, $uibModalInstance, modal,
	$timeout, GrupoPerfilUsuarioServico, MensagensFabrica
) {

	$scope.modal = modal;
	$scope.modal.situacao = $scope.modal.objeto.registro.situacao.id;
	console.log($scope.modal, 'SCOPE MODAL');
	$scope.inativar = modal.objeto;


	if ($scope.modal.objeto.registro.situacao.id == 'A') {
		$scope.espera = GrupoPerfilUsuarioServico.listarMotivo(
			function(resposta) {
				$scope.motivosInativacaoPerfil = resposta.data;
			}, function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
			}
		);
	}


	$scope.carregarPerfil= function(){
		$scope.perfis = [];
		delete $scope.mensagemServidor;
		$scope.espera = GrupoPerfilUsuarioServico.detalhar(id, callbackSucessoFiltro, callbackErroFiltro);
	}


	$scope.inativarSubmit = function() {
		// TODO: Pegar usuario logado
		$scope.perfil = {
			registro: {
				usuarioAlteracao : 'SPTRANS'
			}
		}
		// $scope.perfil.registro.usuarioAlteracao = 'SPTRANS';
		// $scope.perfil.registro.motivo.id = ($scope.perfil.registro.situacao.id == 'A' ? $scope.perfil.registro.motivo.id : 19);
		$scope.espera = GrupoPerfilUsuarioServico.ativar(
			$scope.perfil,
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


	// $scope.motivosInativacaoPerfil = [
	// 	{
	// 		id : 1,
	// 		descricao : 'Motivo 1'
	// 	},
	// 	{
	// 		id : 2,
	// 		descricao : 'Motivo 2'
	// 	},
	// 	{
	// 		id : 3,
	// 		descricao : 'Motivo 3'
	// 	},
	// 	{
	// 		id : 4,
	// 		descricao : 'Motivo 4'
	// 	},
	// 	{
	// 		id : 5,
	// 		descricao : 'Motivo 5'
	// 	},
	// ];

	$scope.fechar = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.ok = function() {
		$uibModalInstance.close();
	};

};
});
