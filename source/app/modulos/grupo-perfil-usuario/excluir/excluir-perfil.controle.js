define(['angularAMD'], function(app) {
	app.controller('ExcluirPerfilControle', ExcluirPerfilControle);
		ExcluirPerfilControle.$inject = ['$scope', '$rootScope', '$http','$uibModalInstance', 'modal', 'ModalFabrica', 'GrupoPerfilUsuarioServico', 'MensagensFabrica'
	];

			function ExcluirPerfilControle($scope, $rootScope, $http, $uibModalInstance, modal, ModalFabrica, GrupoPerfilUsuarioServico, MensagensFabrica
		) {

		$scope.modal = modal;
		$scope.item = $scope.modal.objeto;
console.log(modal.objeto.id);

		// $scope.updateLista = function(){
		// 	var itens = $rootScope.perfis;
		// 	for(var i=0 ; i < itens.length ; i++){
		// 		var ord = i+1;
		// 		$rootScope.perfis[i] = {
		// 			ordenacao : ord,
		// 			perfil : itens[i].perfil,
		// 			nomeExibicao : itens[i].nomeExibicao,
		// 			grupoPerfil: itens[i].grupoPerfil,
		// 			politicaPublica : itens[i].politicaPublica,
		// 			situacaoCadastral : itens[i].situacaoCadastral,
		// 			situacao : itens[i].situacao,
		// 		};
		// 	}
		// };

		// $scope.excluir = function(item){
		// 	var index = $rootScope.perfis.indexOf(item);
		// 	$rootScope.perfis.splice(index, 1);
		// 	$uibModalInstance.close();
		// 	$scope.updateLista();
		// };




		// $scope.excluir = function() {
		// 	$scope.espera = GrupoPerfilUsuarioServico.deletar(
		// 		modal.objeto.id,
		//
		// 		function(resposta, serverMessage) {
		// 			$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
		// 		},
		//
		// 		function(resposta, serverMessage) {
		// 			$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
		// 		}
		// 	);
		// }



		$scope.excluir = function() {
		$scope.espera = GrupoPerfilUsuarioServico.deletar(
			modal.objeto.id,

				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.codigo);
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
				}
			);
		};


		$scope.ok = function(){
			$uibModalInstance.close();
		};

		$scope.fechar = function(){
			$uibModalInstance.dismiss('cancel');
		};

		// $scope.limpar = function() {
		// 	$scope.formFiltro.$setPristine();
		// 	$scope.formFiltro.$setUntouched();
		// 	delete $scope.quantidadeAnalise;
		// 	$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		// };
	}
});
