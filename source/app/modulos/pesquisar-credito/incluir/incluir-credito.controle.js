define(['angularAMD', 'dirPagination', 'sptMensagemErro', 'CreditoServico'], function(app) {
	app.controller('IncluirCreditoControle', IncluirCreditoControle);

	IncluirCreditoControle.$inject = ['$scope', '$rootScope', '$uibModal', '$uibModalInstance', 'modal',
	'FiltroRequisicao',
	'MensagensFabrica',
	'CreditoServico'
];

function IncluirCreditoControle($scope, $rootScope, $uibModal, $uibModalInstance, modal,
	FiltroRequisicao,MensagensFabrica, CreditoServico


) {

	$scope.modal = modal;
	$scope.incluir = new Credito;


	var carregarTipos = function () {
		$scope.espera = CreditoServico.listarCreditos(
			function(resposta) {
				$scope.creditoTipos = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
			}
		);
	};

	carregarTipos();



	// $scope.carregarCreditos = function () {
	// 	$scope.espera = CreditoServico.listarCreditos(
	// 		function(resposta){
	// 			$scope.creditoTipos = resposta.data;
	// 			console.log(resposta, 'retornado na busca de tarifas');
	// 			console.log($scope.creditoTipos);
	// 		}, function(resposta) {
	// 			$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
	// 		}
	// 	);
	// };
	// $scope.carregarCreditos();


	$scope.carregarCreditos = function () {
		$scope.espera = CreditoServico.listarCreditos(
			function(resposta){
				$scope.creditoTipos = resposta.data;
				console.log(resposta, 'retornado na busca de tarifas');
				console.log($scope.creditoTipos);
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
	};
	$scope.carregarCreditos();


	$scope.incluirSubmit = function() {
		// TODO: Pegar o usuario logado
		$scope.incluir.registro = {
			usuarioCriacao: 'SPTRANS',
			usuarioAlteracao: 'TESTE',
			// motivoSituacao: 'teste'
		};
		// $scope.incluir.modal = $scope.incluir.listaModal;


		// função transformar em array
		$scope.espera = CreditoServico.criar(
			$scope.incluir,
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
