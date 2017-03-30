define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('CongelarPesquisaControle', CongelarPesquisaControle);
	CongelarPesquisaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica'];
	function CongelarPesquisaControle($scope, $uibModalInstance, modal, MensagensFabrica) {

		$scope.modal = modal;

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.congelar = function() {
			console.log("congelar");
			$uibModalInstance.close();
		}
		$scope.descongelar = function() {
			console.log("descongelar");
			$uibModalInstance.close();
		}
	}
});