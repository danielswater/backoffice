define(['angularAMD', '../recurso.js', 'sptMensagemErro'], function(app) {
	app.controller('AtivarSamControle', AtivarSamControle);

	AtivarSamControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica', 'RecursoSam'];

	function AtivarSamControle($scope, $uibModalInstance, modal, MensagensFabrica, RecursoSam) {

		$scope.modal = modal;
		$scope.ativacao = {};

		$scope.espera = RecursoSam.get({
				'id': modal.objeto.id
			},
			function(resposta) { 
				$scope.sam = resposta.data.SAMView.SAM;				
				$scope.modal.situacao = $scope.sam.registro.status;
			},
			function(resposta) {
				$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			}
		);

		$scope.ok = function() {
			$uibModalInstance.close();
		}

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ativar = function() {
			var sam = angular.copy($scope.sam);
			sam.registro.status = ($scope.sam.registro.status == 'A' || $scope.sam.registro.status == 'S' ) ? 'I' : 'A'			
			sam.registro.justificativa = (sam.registro.status == 'A' || sam.registro.status == 'S') ? $scope.sam.registro.justificativa : $scope.ativacao.justificativa;

			$scope.espera = RecursoSam.save(
				sam,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
                }
            );
		}
		
	}
});