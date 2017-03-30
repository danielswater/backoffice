/**
 * @directive = sptFiltro
 *
 * Diretiva de filtro
 *  
 */
define(['angularAMD'], function(app) {

	app.directive('sptFiltro', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/comum/diretivas/spt-filtro/spt-filtro.html',
			link: function(scope, element, attrs, controller) {
				var modulo = attrs.modulo;
				var caminhoModulo = (!!attrs.caminhoModulo) ? 'app/modulos/' + attrs.caminhoModulo : 'app/modulos/' + modulo;
				var nomeFiltro = attrs.nomeFiltro || modulo;								
				var filtrado = caminhoModulo + '/filtro/filtro-' + nomeFiltro + '-selecionado.html';
				var formulario = caminhoModulo + '/filtro/filtro-' + nomeFiltro + '-formulario.html';

				scope.sptFiltro = {
					template: {
						filtrado: filtrado,
						formulario: formulario,
					}
				};
			}
		}
	});
});