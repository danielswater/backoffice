define(['angularAMD'], function(app) {

	app.controller('SelectControle', SelectControle);

	SelectControle.$inject = ['$scope', '$rootScope'];

	function SelectControle($scope, $rootScope) {
		$scope.required = (!!$scope.required) ? $scope.required : false;
		$scope.default = (!!$scope.default) ? $scope.default : "";		
		$scope.id = $scope.id || '';
		var value = (!!$scope.value) ? "." + $scope.value : '';
		var label = (!!$scope.label) ? "." + $scope.label : '';
		var trackBy = (!!$scope.trackBy) ? " track by item." + $scope.trackBy : '';
		var itemValor = "item" + value;
		var itemAlias = "item" + label;
		$scope.expressaoOptions = itemValor + " as " + itemAlias + " for item in options" + trackBy //monta expressao options e init
		$scope.$on($rootScope.EVENTO.LIMPAR_FORM, function() {
			delete $scope.model;
		});		
	}

});