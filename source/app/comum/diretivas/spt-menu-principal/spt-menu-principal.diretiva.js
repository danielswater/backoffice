define(['angularAMD', 'app/comum/diretivas/spt-menu-principal/spt-menu-principal.controle.js'], function(app) {

	app.directive('sptMenuPrincipal', function() {
		return {
			restrict: 'E',
			controller: 'MenuPrincipal',
			templateUrl: 'app/comum/diretivas/spt-menu-principal/spt-menu-principal.html'
		}

	});

});