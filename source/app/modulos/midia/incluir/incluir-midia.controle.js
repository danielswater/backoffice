define(['angularAMD', '../recurso.js'], function(app) {
	app.controller('IncluirMidiaControle', IncluirMidiaControle);

	IncluirMidiaControle.$inject = ['$scope', '$uibModalInstance', 'modal',
		'MensagensFabrica',
		'RecursoMidia'
	];

	function IncluirMidiaControle($scope, $uibModalInstance, modal,
		MensagensFabrica,
		RecursoMidia) {

		$scope.modal = modal;
		$scope.midia = new RecursoMidia;

		$scope.tipos = [];

		RecursoMidia.get({
            id: 'rds'
        },
        function(resposta) {
            $scope.tipos = resposta.data.TipoMidia;
        })

		$scope.incluir = function() {
			delete $scope.midia.id;
			$scope.espera = RecursoMidia.create(
				$scope.midia,
				function(resposta) {
					$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
					$scope.limpar();
				},
				function(resposta) {
					$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
				});
		}

		$scope.ok = function(form) {
			$uibModalInstance.close();
		}

		$scope.limpar = function(form) {
			$scope.formMidia.$setPristine();
			$scope.formMidia.$setUntouched();
			$scope.midia.tipo = '';
			$scope.midia.nome = '';
			$scope.midia.descricao = '';
			$scope.midia.memoriaBytes = '';
			$scope.midia.velocidadeTransmissao = '';
			$scope.midia.distanciaOperacao = '';
			$scope.midia.normasTecnicas = '';
			$scope.mensagemServidor = '';
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});