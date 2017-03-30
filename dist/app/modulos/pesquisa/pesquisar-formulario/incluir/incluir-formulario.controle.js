define(['angularAMD', '../recurso.js'], function(app) {
	app.controller('IncluirFormularioControle', IncluirFormularioControle);

	IncluirFormularioControle.$inject = ['$scope', '$uibModalInstance', 'modal','$rootScope',
		'MensagensFabrica',
		'RecursoCredito'
	];
	
	function IncluirFormularioControle($scope, $uibModalInstance, modal,MensagensFabrica,$rootScope,RecursoCredito) {

		$scope.filtro = {
			pergunta: '',
			resposta: ''
		}
		
 		
		$scope.categorias = ["Pesquisa Sócio Econômica", "Qualidade das Linhas", "Outros"];
		$scope.respostas = ["Apenas Estudando", "Estudando e Trabalhando", "Nem Estudando / Nem Trabalhando"];
		

		$scope.linhas = [
			{
				ordenacao:  '1',
				categoria : "Conselheiros Zona Norte",
				pergunta: "O ônibus chega pontualmente?",
				situacao : {
					ativo : true
				}
			},
			{
				ordenacao:  '2',
				categoria : "Conselheiros Zona Sul",
				pergunta: "Os pontos de parada são suficientes?",
				situacao : {
					ativo : false
				}
			},
			{
				ordenacao:  '3',
				categoria : "Conselheiros Zona Norte",
				pergunta: "Você utiliza essa linha para quais finalidades?",
				situacao : {
					ativo : true
				}
			},
			{
				ordenacao:  '4',
				categoria : "Conselheiros Zona Oeste?",
				pergunta: "Qual sua opinião sobre o trajeto da linha?",
				situacao : {
					ativo : false
				}
			},
		];

		$scope.sortableOptions = {
			stop: function(e, ui) {
				// Ordenar
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