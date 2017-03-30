define(['angularAMD', 'ui-sortable', 'TarifaServico', 'MoedaServico', 'EmissaoCreditoServico'], function(app) {
	app.controller('EditarTarifaControle', EditarTarifaControle);

	EditarTarifaControle.$inject = ['$scope', '$uibModalInstance', 'modal', 'MensagensFabrica',
		'$timeout', 'TarifaServico', 'MoedaServico', 'EmissaoCreditoServico'
	];

	function EditarTarifaControle($scope, $uibModalInstance, modal, MensagensFabrica, $timeout, TarifaServico, MoedaServico, EmissaoCreditoServico
		) {

		$scope.modal = modal;
		$scope.editar = modal.objeto;
		$scope.imgStyle = {};
		console.log('$scope.editar',$scope.editar);

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



		$scope.espera = TarifaServico.detalhar(
			modal.objeto.id,
			function(resposta){
				$scope.tarifa = resposta.data;
			}, function(resposta) {
				$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
			}
		);




		$scope.editarSubmit = function(){
			console.log($scope.tarifa, 'TARIFA');
				$scope.espera = TarifaServico.salvar(
					$scope.tarifa,
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
