/**
 * @directive = sptInclusaoEstatica
 *
 * diretiva criada para incluir templates html sem a criação de um escopo
 *
 * diretiva criada a partir da fonte: http://stackoverflow.com/questions/12393703/how-to-include-one-partials-into-other-without-creating-a-new-scope
 */
define(['angularAMD'], function(app) {

	app.directive('sptInclusaoEstatica', sptInclusaoEstatica);

	sptInclusaoEstatica.$inject = ['$http', '$templateCache', '$compile'];

	function sptInclusaoEstatica($http, $templateCache, $compile) {

		return {
			replace: true,
			link: function(scope, element, attrs) {

				scope.$watch(function() {
					return attrs.templateUrl
				}, function() {
					var templatePath = "";
					templatePath = attrs.templateUrl;
					if (templatePath) {
						$http.get(templatePath, {
							cache: $templateCache
						}).success(function(response) {
							var contents = element.html(response).contents();
							$compile(contents)(scope);
						});
					} else {
						console.log("Template não definido, necessário informar o template via template-url");
					}
				});

			}
		}
	}

});