define(['angularAMD', 'dirPagination','sptBotaoAlternar','FaqServico'], function(app) {
	app.controller('FaqControle', FaqControle);

	FaqControle.$inject = ['$scope','$window','$rootScope','$uibModal','ModalFabrica','$filter','MensagensFabrica','FaqServico']

	function FaqControle ($scope,$window,$rootScope,$uibModal,ModalFabrica,$filter,MensagensFabrica,FaqServico) {
		$scope.filtro = {
			aberto: true
		};

		$scope.formatData = function(data){
			if(data == 'Atual') return data;
			else {
				return data = moment(data).format('DD/MM/YYYY');
			}
		};

		$scope.categoriasFaq = [];

		$scope.espera = FaqServico.listarCategoriasFaq(
			function(resposta){
				if(resposta.data){
					$scope.categoriasListSelectField = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar', resposta);
			}
		);

		$scope.erroFiltro = false;
		$scope.preFiltrar = function() {
			if(
				($scope.filtro.pergunta == '' ||
				$scope.filtro.pergunta == undefined ||
				$scope.filtro.pergunta == null) &&
				($scope.filtro.categoria == '' ||
				$scope.filtro.categoria == undefined ||
				$scope.filtro.categoria == null)
				){
				$scope.erroFiltro = true;

				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Preencha ao menos um dos campos indicados para realizar a pesquisa',
					function(){ }
				);
			} else {
				$scope.faqs = [];
				$scope.categoriasFaq = [];
				$scope.espera = FaqServico.listarCategoriasFaq(
					function(resposta){
						if(resposta.data){
							$scope.categoriasFaq = $filter('orderBy')(resposta.data, 'descricao');

							$scope.faq = {
								categoria : $scope.filtro.categoria == undefined ? null : $scope.filtro.categoria,
								pergunta : $scope.filtro.pergunta == undefined ? null : $scope.filtro.pergunta,
							};

							$scope.espera = FaqServico.filtrar(
								$scope.faq,
								function(resposta){
									$scope.faqs = resposta.data;
									console.log('$scope.faqs',$scope.faqs);

									if($scope.faqs.length == 0){
										$scope.categoriasFaq = [];
									} else {
										for(let c=0; c<$scope.categoriasFaq.length;c ++){
											$scope.categoriasFaq[c].faqs = [];
										}
										
										for(let c=0; c<$scope.categoriasFaq.length;c ++){
											for(var f=0; f<$scope.faqs.length; f++){
												if($scope.faqs[f].categoria.id == $scope.categoriasFaq[c].id){
													$scope.categoriasFaq[c].faqs.push($scope.faqs[f]);
												}
											}
										}
									}
									
									console.log('$scope.categoriasFaq',$scope.categoriasFaq);
								},
								function(resposta){
									console.log('Erro ao carregar', resposta);
								}
							);
						}
					}, 
					function(resposta){
						console.log('Erro ao carregar', resposta);
					}
				);
			}
		};

		$scope.moverItem = function(position, object){
			$scope.editar = object;
			position == 'up' ? $scope.editar.nrOrdenacao = object.nrOrdenacao - 1 : $scope.editar.nrOrdenacao = object.nrOrdenacao + 1;

			$scope.espera = FaqServico.editar(
				$scope.editar,
				function(resposta){
					$scope.preFiltrar();
				}, 
				function(resposta){
					new ModalFabrica.abrirModalMensagem(
						'erro',
						resposta.mensagem,
						function(){ }
					);
					
					return false;
				}
			);
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.filtro.categoria;
			delete $scope.filtro.pergunta;
			$scope.mensagemServidor = '';
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
			$scope.categoriasFaq = $scope.categoriasBkp;
		};

	}
});
