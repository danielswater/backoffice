define(['angularAMD', 'sptMensagemErro', 'TarifaServico', 'MoedaServico', 'EmissaoCreditoServico','ui-sortable'], function(app) {
	app.controller('IncluirTarifaControle', IncluirTarifaControle);

	IncluirTarifaControle.$inject = ['$scope', '$http','$uibModalInstance', 'modal', 'ModalFabrica', 'MensagensFabrica', 'TarifaServico', 'MoedaServico', 'EmissaoCreditoServico'
];

function IncluirTarifaControle($scope, $http, $uibModalInstance, modal, ModalFabrica, MensagensFabrica, TarifaServico, MoedaServico, EmissaoCreditoServico


) {

	$scope.modal = modal;
	$scope.incluir = new Tarifa;

	$scope.carregarTipos = function () {
		$scope.espera = TarifaServico.listarTipoTarifa(
			function(resposta){
				$scope.tarifasTipos = resposta.data;
				console.log(resposta);
				console.log($scope.tarifasTipos);
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
	};
	$scope.carregarTipos();



	$scope.carregarMoedas = function () {
		$scope.espera = MoedaServico.listarMoeda(
			function(resposta){
				$scope.moedasTipos = resposta.data;
				console.log(resposta);
				console.log($scope.moedasTipos);
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);
	};
	$scope.carregarMoedas();






	// Dual List
			$scope.DualList = function() {
				// Listar Modal
				$scope.espera = EmissaoCreditoServico.listarModal(
					function(resposta){
						// List 1
						$scope.Modal = resposta.data;
						// List 2
						$scope.incluir.listaModal = [];
						$scope.sortableOptions = {
							placeholder: "app",
							connectWith: ".apps-container"
						};
						$scope.moveAll = function(from, to,event) {
							console.log($scope.moveAll, 'move all');
							angular.forEach(from, function(item) {
								to.push(item);
							});
							from.length = 0;
						};
					}, function(resposta) {
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				);
			};

$scope.modal = modal;




	$scope.incluirSubmit = function() {
		// TODO: Pegar o usuario logado
		$scope.incluir.registro = {
			usuarioCriacao: 'SPTRANS',
			usuarioAlteracao: 'TESTE',
			// motivoSituacao: 'teste'
		};
// $scope.incluir.modal = $scope.incluir.listaModal;


// função transformar em array
		$scope.espera = TarifaServico.criar(
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
