/**
 * @directive = sptDataIntervalo
 *
 * Diretiva que cria um calendário de intervalo
 *  
 */


define(['angularAMD', 'angular-daterangepicker', 'app/comum/diretivas/data/spt-data-intervalo.controle.js'], function(app) {

	app.directive('sptDataIntervalo', sptDataIntervalo);

	sptDataIntervalo.inject = [];

	function sptDataIntervalo() {

		return {
			restrict: 'E',
			replace: true,
			controller: 'DataIntervaloControle',
			templateUrl: function(element, attrs) {
				var url = 'app/comum/diretivas/data/spt-data-intervalo';
				if (!!attrs.templateUrl) url = url + '-' + attrs.templateUrl;
				return url+'.html';
			},
			scope: {
				inicio: '=?',
				fim: '=?',
				classeLabel: '@?',
				labelDataInicio: '@?',
				labelDataFim: '@?',
				labelHora: '@?',
				labelHoraInicio: '@?',
				labelHoraFim: '@?',
				requiredInicio: '=?',
				requiredFim: '=?',
				required: '=?',
				horaPosSelecaoData: '=?',
				hora:'=?'
			}
		}
	}

});