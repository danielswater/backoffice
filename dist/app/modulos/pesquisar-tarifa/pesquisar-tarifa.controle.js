(function() {

	'use strict';

	//
	// sptData': 'app/comum/diretivas/data/spt-data.diretiva',
	// 'dataUtils': 'app/comum/utils/data-utils',
	// 'angular-daterangepicker'

	define(['angularAMD', 'dirPagination', 'sptMensagemErro', 'TarifaServico', 'EmissaoCreditoServico'], function(app) {

		app.controller('PesquisarTarifaControle', PesquisarTarifaControle);

		PesquisarTarifaControle.$injector = ['$scope', '$rootScope', '$uibModal',
		'FiltroRequisicao',
		'MensagensFabrica',
		'TarifaServico',
		'EmissaoCreditoServico'

	]

	function PesquisarTarifaControle($scope, $rootScope, $uibModal,
		FiltroRequisicao,MensagensFabrica, TarifaServico, EmissaoCreditoServico) {

			// $scope.tarifas=[];
			$scope.filtro = {
				aberto: true
			};
			// $rootScope.tarifas = [
			// 	{
			// 		ordenacao : '1',
			// 		nomeTarifa : 'Tarifa única - Pneu Municipal',
			// 		numeroLegislacao : 'Portaria 121/15',
			// 		tipoTarifa : 'Base',
			// 		dataReajuste : '09/01/2016',
			// 		dataLegislação : '09/01/2016',
			// 		modal : 'Onibus',
			// 		valorTarifaBase : 'R$ 3,80',
			// 		valorTarifa : 'R$ 3,80',
			// 		descricaoTarifa : 'teste de descrição da tarifa',
			// 		tipoMoeda : 'Real(R$)'
			// 	},
			// 	{
			// 		ordenacao : '2',
			// 		nomeTarifa : 'Tarifa única - Pneu Municipal',
			// 		numeroLegislacao : 'Portaria 121/15',
			// 		tipoTarifa : 'Base',
			// 		dataReajuste : '09/01/2016',
			// 		dataLegislação : '09/01/2016',
			// 		modal : 'Onibus',
			// 		valorTarifaBase : 'R$ 3,80',
			// 		valorTarifa : 'R$ 3,80',
			// 		descricaoTarifa : 'teste de descrição da tarifa',
			// 		tipoMoeda : 'Real(R$)'
			// 	},
			// 	{
			// 		ordenacao : '3',
			// 		nomeTarifa : 'Tarifa única - Pneu Municipal',
			// 		numeroLegislacao : 'Portaria 121/15',
			// 		tipoTarifa : 'Integração',
			// 		dataReajuste : '09/01/2016',
			// 		dataLegislação : '09/01/2016',
			// 		modal : 'Onibus',
			// 		valorTarifaBase : 'R$ 3,80',
			// 		valorTarifa : 'R$ 3,80',
			// 		descricaoTarifa : 'teste de descrição da tarifa',
			// 		tipoMoeda : 'Real(R$)'
			// 	}
			// ];



			$scope.carregarTipos = function () {
				$scope.espera = TarifaServico.listarTipoTarifa(
					function(resposta){
						$scope.tarifasTipos = resposta.data;
						console.log(resposta, 'retornado na busca de tarifas');
						console.log($scope.tarifasTipos);
					}, function(resposta) {
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				);
			};
			$scope.carregarTipos();


			$scope.carregarModal = function () {
				$scope.espera = EmissaoCreditoServico.listarModal(
					function(resposta){
						$scope.listarModal = resposta.data;
						console.log(resposta, 'modal');
						console.log($scope.listarModal, 'modalll');
					}, function(resposta) {
						$scope.mensagemServidor = MensagensFabrica.get(resposta.data.codigo);
					}
				);
			};
			$scope.carregarModal();



			$scope.preFiltrar = function(){
				$scope.tarifas=[];
				console.log('callback');

				TarifaServico.filtrar(
					$scope.filtro,
					function(resultado){
						console.log(resultado);

						if(resultado.data.length == 0 ){
							console.log('Não há registro retornado na pesquisa.');
							console.log($scope.tarifas.length);
							$scope.mensagemControle = {
								"tipo" : "ERRO",
								"class": "mensagem-erro",
								"data" : {
									"mensagem" : "Não há registro retornado na pesquisa."
								}
							};
							return false
						}else{
							$scope.tarifas = resultado.data;
						}
					},
					function(resultado){
						if (resultado.status == 404 && $scope.tarifas.length == 0) {
							$scope.mensagemServidor = MensagensFabrica.get(20008);
						} else {
							$scope.mensagemServidor = MensagensFabrica.get(resultado.data.codigo);
						}
					}
				);



			};





			// a qualquer variação após a mensagem de erro, apagar a mesma
			$scope.changeInput = function() {
				delete $scope.mensagemControle
			};

			// $scope.filtro.nomeExibicaoPerfil = '';
			// $scope.filtro.nomeGrupoPerfil = '';
			// $scope.minlength = function(){
			// 	console.log('minlength');
			// 	}
			// };

			// limpar o form
			$scope.limpar = function () {
				// delete $scope.filtro.nomeGrupoPerfil;
				// delete $scope.filtro.nomeExibicaoPerfil;
				$scope.formFiltro.$setPristine();
				$scope.formFiltro.$setUntouched();
			};


			// $scope.limpar = function() {
			// 	$scope.formFiltro.$setPristine();
			//
			// 	$scope.formFiltro.$setUntouched();
			// 	delete $scope.filtro.nomeAgrupamento;
			// 	delete $scope.filtro.grupoUsuarioSistema;
			// 	$scope.mensagemServidor = '';
			// 	$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			// };
		}
	});

})();
