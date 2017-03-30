define(['angularAMD'], function(app) {

	app.controller('BotaoAlternarControle', BotaoAlternarControle);

	BotaoAlternarControle.$inject = ['$scope'];

	function BotaoAlternarControle($scope) {
		$scope.tituloVerdadeiro = (!!$scope.tituloVerdadeiro) ? $scope.tituloVerdadeiro : '';
		$scope.tituloFalso = (!!$scope.tituloFalso) ? $scope.tituloFalso : '';
		$scope.trataObjeto = (!!$scope.trataObjeto) ? $scope.trataObjeto : angular.noop;

		$scope.titulo = ($scope.condicao) ? $scope.tituloVerdadeiro : $scope.tituloFalso;
		$scope.texto = ($scope.condicao) ? $scope.textoVerdadeiro : $scope.textoFalso;
		$scope.classe = ($scope.condicao) ? $scope.classeVerdadeiro : $scope.classeFalso;		
	}
	
});