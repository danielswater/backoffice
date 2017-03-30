define(['angularAMD','InformacoesServico'], function(app) {
	app.controller('DetalhesInformacoesControle', DetalhesInformacoesControle);

	DetalhesInformacoesControle.$inject = ['$scope','$timeout','$filter', '$uibModalInstance', 'modal','InformacoesServico','$sce'];

	function DetalhesInformacoesControle($scope,$timeout,$filter, $uibModalInstance, modal,InformacoesServico,$sce) {
		$scope.modal = modal;
		$scope.informacoes = modal.objeto;
		console.log('$scope.informacoes',$scope.informacoes);
		
		
		if(typeof($scope.informacoes.textoInformacao) != 'object'){
			$scope.informacoes.textoInformacaoPreview = $sce.trustAsHtml($scope.informacoes.textoInformacao);
		}

		var imagemPreviewGenerate = function(){
			var canvas = document.getElementById('imagemDestaquePreview');
			
			if(canvas != null && canvas != undefined && canvas != ''){
				var ctx = canvas.getContext("2d");
				var image = new Image();
				image.crossOrigin = 'Anonymous';
				image.src = $scope.informacoes.imagemDestaque;
				image.onload = function() {
					// $("#imagemDestaquePreview").width(this.width);
					// $("#imagemDestaquePreview").height(this.height);
					$("#imagemDestaquePreview").width(200);
					$("#imagemDestaquePreview").height(200);
					ctx.drawImage(image,0,0,this.width, this.height,0,0,canvas.width,canvas.height);
				}
			}
		};
		
		if( $scope.informacoes.imagemDestaque != undefined && $scope.informacoes.imagemDestaque != '' && $scope.informacoes.imagemDestaque != null ){
			var imagemPreviewExists = setInterval(function(){
				if(document.getElementById('imagemDestaquePreview')){
					clearInterval(imagemPreviewExists);
					imagemPreviewGenerate();
				}
			});
		}

		var meses = [];
		meses[0] = null;
		meses[1] = 'Janeiro';
		meses[2] = 'Fevereiro';
		meses[3] = 'Março';
		meses[4] = 'Abril';
		meses[5] = 'Maio';
		meses[6] = 'Junho';
		meses[7] = 'Julho';
		meses[8] = 'Agosto';
		meses[9] = 'Setembro';
		meses[10] = 'Outubro';
		meses[11] = 'Novembro';
		meses[12] = 'Dezembro';

		var mesSalvo = $filter('date')($scope.informacoes.dataPublicacao, 'M');
		var mesPublicacao = meses[mesSalvo];

		$scope.mesPublicacao = mesPublicacao;

		$scope.espera = InformacoesServico.listarCategoriasInformacoes(
			function(resposta){
				if(resposta.data){
					$scope.categoriasInformacoes = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar as categorias informacoes', resposta);
			}
		);

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};
	};
});