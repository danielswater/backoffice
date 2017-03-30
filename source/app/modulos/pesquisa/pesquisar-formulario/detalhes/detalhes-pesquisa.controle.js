define(['angularAMD'], function(app) {
	app.controller('DetalhesPesquisaControle', DetalhesPesquisaControle);

	DetalhesPesquisaControle.$inject = ['$scope', '$uibModalInstance', 'modal'
	];

	function DetalhesPesquisaControle($scope, $uibModalInstance, modal
		) {

		$scope.modal = modal;
		$scope.pesquisar = modal.objeto;
		
		
		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

	
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
	};
})