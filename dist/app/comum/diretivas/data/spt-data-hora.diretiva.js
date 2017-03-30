/**
 * @directive = sptDataHora
 *
 * Diretiva que cria campo para hora
 *  
 */

define(['angularAMD', 'angular-daterangepicker'], function(app) {

	app.directive('sptDataHora', sptDataHora);

	sptDataHora.inject = [];

	function sptDataHora() {

		return {
			restrict: 'E',
			replace: true,
			controller: function($scope) {
				$scope.horas = montaTempo(0, 24);
				$scope.minutos = montaTempo(0, 60);

				if (!!$scope.model) {
					$scope.data = {
						hora: ('0' + moment($scope.model).hours()).slice(-2),
						minuto: ('0' + moment($scope.model).minutes()).slice(-2)
					}
				}

				function montaTempo(minimo, maximo) {
					var tempo = [];

					for (var i = minimo || 0; i <= maximo - 1; i++) {
						tempo.push(('0' + i).slice(-2));
					}
					return tempo;
				}
			},
			templateUrl: 'app/comum/diretivas/data/spt-data-hora.html',
			scope: {
				model: '=',
				maxima: '=?',
				minima: '=?'
			}
		}
	}
});