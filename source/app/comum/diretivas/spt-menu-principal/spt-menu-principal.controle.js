define(['angularAMD'], function(app) {
	app.controller('MenuPrincipal', MenuPrincipal);
	
	// MenuPrincipal.$inject = ['$scope'];
	function carregarInicial() {
		var menu = [
			{label: "Página Inicial", url: 'pagina-inicial', "icone": "fa-home"},
			{label: "Tipo de Arquivo", url: 'tipo-arquivo'},
			{label: "Tipo de Documento - RDS", url: 'rds'},
			{label: "Fabricante", url: 'fabricante'},
			{label: "Fornecedor", url: 'fornecedor'},
			{label: "Operadora", url: 'operadora'},
			{label: "Mídia", url: 'midia'},
			{label: "Moeda", url: 'moeda'},
			{label: "SAM", url: 'sam'},
			{label: "Feriado", url: 'feriado'}
		];
		return menu;
	};

	function MenuPrincipal($scope) {
		$scope.menu = carregarInicial();
	}
});