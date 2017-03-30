define(['angularAMD', '../recurso.js'], function(app) {
	app.controller('VisualizarFormularioControle', VisualizarFormularioControle);

	VisualizarFormularioControle.$inject = ['$scope', '$uibModalInstance', 'modal','$rootScope',
		'MensagensFabrica',
		'RecursoCredito'
	];
	
	function VisualizarFormularioControle($scope, $uibModalInstance, modal,MensagensFabrica,$rootScope,RecursoCredito) {

		$scope.filtro = {
			pergunta: '',
			resposta: ''
		}
		
 		
		$scope.categorias = ["Pesquisa Sócio Econômica", "Qualidade das Linhas", "Outros"];
		$scope.ocupacao = ["Apenas Estudando", "Estudando e Trabalhando", "Nem Estudando / Nem Trabalhando"];
		

		$scope.linhas = [
			{
				ordenacao:  '1',
				categoria : "Pesquisa sobre a qualidade das linhas",
				pergunta: "O ônibus chega pontualmente?",
				resposta: "Demora pra porra"
			},
			{
				ordenacao:  '2',
				categoria : "Pesquisa sobre a qualidade das linhas",
				pergunta: "Os pontos de parada são suficientes?",
				resposta: "Não devia ter parada"
			},
			{
				ordenacao:  '3',
				categoria : "Pesquisa sobre a qualidade das linhas",
				pergunta: "Você utiliza essa linha para quais finalidades?",
				resposta: "Por pura diversão"
			},
			{
				ordenacao:  '4',
				categoria : "Pesquisa sobre a qualidade das linhas",
				pergunta: "Qual sua opinião sobre o trajeto da linha?",
				resposta: "A mesma da sua irmã"
			},
		];

		$scope.sortableOptions = {
			stop: function(e, ui) {
				for (var index in $scope.linhas) {
					$scope.linhas[index].ordenacao = parseInt(index)+1;
				}
			}			
		};

            
		
		$scope.addRow = function(resposta){
			if(resposta)
				$scope.respostas.push(resposta)
				// $scope.filtro.resposta='';
		};
		
		$scope.removeRow = function($index){
			$scope.respostas.splice($index, 1 );
		};
		
	

		


		
		$scope.modal = modal;
		$scope.credito = new RecursoCredito;
		
		$scope.incluirSubmit = function() {

			// $scope.espera = RecursoCredito.create(

			// 	$scope.credito,
			// 	function(resposta) {
			// 		$scope.mensagemRetorno = MensagensFabrica.get(resposta.serverMessage.codigo);
			// 		$scope.limpar();
			// 	},
			// 	function(resposta) {
			// 		$scope.mensagemServidor = MensagensFabrica.get(resposta.data.serverMessage.codigo);
			// 	});
		}

		$scope.ok = function(form) {
			$uibModalInstance.close();
		}

		$scope.limpar = function(form) {
			$scope.formcredito.$setPristine();
			$scope.formcredito.$setUntouched();
			$scope.credito.razaoSocial = '';
			$scope.credito.cnpj = '';
			$scope.mensagemServidor = '';
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

});