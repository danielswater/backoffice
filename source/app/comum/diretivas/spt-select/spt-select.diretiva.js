/**
 * @directive = sptSelect
 *
 * Cria um select com valor default
 *
 * *************************************************************************************************************
 *
 * Exemplo 1 bind com controller:	
 * 	
 * 	y = {1}, teste = [1,2,3];
 *
 * Exemplo 1 bind HTML:
 *
 * 	<spt-select model="y" options="teste" default="Selecione" required="true"></spt-select>
 *
 * *************************************************************************************************************
 *
 * Exemplo 2 bind com controller:	
 * 
 * 	situacao = {nome: 'Ativo', valor: 'A'};
 *  situacoes = [{nome: 'Ativo', valor: 'A'}, {nome: 'Inativo',valor: 'I'}];
 *
 * Exemplo 2 bind HTML:
 * 
 * 	<spt-select model="situacao" options="situacoes" label="nome" track-by="valor" default="Todos(as)"></spt-select>
 */

define(['angularAMD', 'app/comum/diretivas/spt-select/spt-select.controle.js'], function(app) {

	app.directive('sptSelect', function() {

		return {
			restrict: 'E',
			scope: {
				id: '@?',
				name: '&?',
				options: '=',
				model: '=',
				label: '@?',
				value: '@?',
				trackBy: '@?',
				required: '=?',
				default: '@?',
				type: "@"
			},
			replace: true,
			controller: 'SelectControle',
			templateUrl: 'app/comum/diretivas/spt-select/spt-select.html'
		};

	});

});