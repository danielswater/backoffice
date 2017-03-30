define(['angularAMD'], function(app) {
	app.controller('InativarMotivoPerfilControle', InativarMotivoPerfilControle);

	InativarMotivoPerfilControle.$inject = ['$scope', '$uibModalInstance', 'modal',
		'$timeout'
	];

	function InativarMotivoPerfilControle($scope, $uibModalInstance, modal,
		$timeout
		) {

		$scope.modal = modal;
		$scope.inativar = modal.objeto;
		$scope.imgStyle = {};

		$scope.motivosInativacaoPerfil = [
			{
				id : 1,
				descricao : 'Motivo 1'
			},
			{
				id : 2,
				descricao : 'Motivo 2'
			},
			{
				id : 3,
				descricao : 'Motivo 3'
			},
			{
				id : 4,
				descricao : 'Motivo 4'
			},
			{
				id : 5,
				descricao : 'Motivo 5'
			},
		];

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

	};
});
