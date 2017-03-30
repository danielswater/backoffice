(function() {
	'use strict';

	define(['angularAMD', 'dirPagination'], function(app) {
		
		app.controller('PaginaInicialControle', PaginaInicialControle);

		PaginaInicialControle.$inject = ['$scope', '$rootScope', '$http', '$state',
			'MensagensFabrica'
		]

		function PaginaInicialControle($scope,$rootScope,$http,$state,MensagensFabrica) {
			// $scope.reconPages = carregarRecon();
			$scope.boPages = carregarBo();
		}
		function carregarRecon() {
			var recon = [
				{label: "Parametrização Score Mínimo", url: 'reconhecimento-facial/score-minimo'},
				{label: "Parametrização de Periodicidade de Expurgo", url: 'reconhecimento-facial/expurgo'},
				{label: "Parametrização do Período de Confiança", url: 'reconhecimento-facial/periodo-confianca'},
				{label: "Parametrização Permanência nos Cadastros Positivo/Negativo", url: 'reconhecimento-facial/permanencia'},
				{label: "Análise de Fotos - Reconhecimento Facial", url: 'reconhecimento-facial/analise/automatica'},
				{label: "Pesquisa de Análises Realizadas", url: 'reconhecimento-facial/analise/manual'},
				{label: "Relatório", url: 'reconhecimento-facial/relatorio'},
				{label: "Pesquisa de Fotos de Utilização por Cartão", url: 'reconhecimento-facial/imagem-validador'},
				{label: "Cadastro Positivo", url: 'reconhecimento-facial/cartao/cadastro/positivo'},
				{label: "Cadastro Negativo", url: 'reconhecimento-facial/cartao/cadastro/negativo'}
			];
			return recon;
		};
		function carregarBo() {
			var backoffice = [
				{label: "Pesquisar Pergunta", url: 'pesquisa/pesquisar-pergunta'},
				{label: "Pesquisar Entrevistado", url: 'pesquisa/pesquisar-entrevistado'},
				{label: "Pesquisar Formulário de Pesquisa", url: 'pesquisa/pesquisar-formulario'},
				{label: "Pesquisar Formulário de Pesquisa (Pendentes de Aprovação)", url: 'pesquisa/pesquisar-formulario-aprovacao'},
				{label: "Grupo de Perfil do Usuário do Transporte Público", url: 'grupo-perfil-usuario'},
				{label: "Perfil do Usuário do Transporte Público", url: 'perfil-usuario'},
				{label: "Agrupamento", url: 'agrupamento'},
				{label: "Menu da Página Principal", url: 'menu-pagina-principal'},
				{label: "FAQ", url: 'faq'},
				{label: "Informações", url: 'informacoes'},
				{label: "Cadastro", url: 'cadastro'},
				{label: "Estampa", url: 'estampa'},
				{label: "Vinculo Estampa ao Casco", url: 'estampa-vinculo'},
				{label: "Manter Configuração de Produto", url: 'perfil-produto'},
				{label: "Pesquisar Tarifa", url: 'pesquisar-tarifa'},
				{label: "Pesquisar Crédito", url: 'pesquisar-credito'}
			];
			return backoffice;
		};
	});
})();
