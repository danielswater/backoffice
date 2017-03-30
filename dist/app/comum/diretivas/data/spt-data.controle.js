define(['angularAMD'], function(app) {
	app.controller('DataControle', DataControle);

	DataControle.inject = ['$scope', '$rootScope'];

	function DataControle($scope, $rootScope) {

		$scope.id = $scope.id || '';
		$scope.$on($rootScope.EVENTO.LIMPAR_FORM, function() {
			delete $scope.model;
		});

	}
});