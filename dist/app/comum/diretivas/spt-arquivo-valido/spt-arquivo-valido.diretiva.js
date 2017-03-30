/**
 * @directive = sptArquivoValido
 *
 * Diretiva para verificar se existe arquivo válido selecionado no input file
 *  
 */

define(['angularAMD'], function(app) {
	app.directive('sptArquivoValido',function(){
		return {
			require:'ngModel',
			link:function(scope,el,attrs,ngModel){
				//change event is fired when file is selected
				el.bind('change',function(){
					scope.$apply(function(){
						ngModel.$setViewValue(el.val());
						ngModel.$render();
					})
				})
			}
		}
	})
});
