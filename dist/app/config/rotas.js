(function() {

	'use strict';

	define(['angularAMD'], function(app) {

		app.constant("ROTAS", {
			ESTADOS: [
				{
					"state": "pagina-inicial",
					"url": "/pagina-inicial",
					"displayName": "Página Inicial",
					"templateUrl": "./app/modulos/pagina-inicial/pagina-inicial.html",
					"controllerUrl": "./app/modulos/pagina-inicial/pagina-inicial.controle.js",
					"controllerName": "PaginaInicialControle"
				},
				{
					"state": "emissao-credito",
					"url": "/emissao-credito",
					"displayName": "Tipos de Emissão de Crédito",
					"templateUrl": "./app/modulos/emissao-credito/emissao-credito.html",
					"controllerUrl": "./app/modulos/emissao-credito/emissao-credito.controle.js",
					"controllerName": "EmissaoCreditoControle"
				},
				{
					"state": "pesquisar-pergunta",
					"url": "/pesquisa/pesquisar-pergunta",
					"displayName": "Pesquisar Pergunta",
					"templateUrl": "./app/modulos/pesquisa/pesquisar-pergunta/pesquisar-pergunta.html",
					"controllerUrl": "./app/modulos/pesquisa/pesquisar-pergunta/pesquisar-pergunta.controle.js",
					"controllerName": "PesquisaPerguntaControle"
				},
				{
					"state": "pesquisar-entrevistado",
					"url": "/pesquisa/pesquisar-entrevistado",
					"displayName": "Pesquisar Entrevistado",
					"templateUrl": "./app/modulos/pesquisa/pesquisar-entrevistado/pesquisar-entrevistado.html",
					"controllerUrl": "./app/modulos/pesquisa/pesquisar-entrevistado/pesquisar-entrevistado.controle.js",
					"controllerName": "PesquisaEntrevistadoControle"
				},
				{
					"state": "pesquisar-formulario",
					"url": "/pesquisa/pesquisar-formulario",
					"displayName": "Pesquisar Formulário de Pesquisa",
					"templateUrl": "./app/modulos/pesquisa/pesquisar-formulario/pesquisar-formulario.html",
					"controllerUrl": "./app/modulos/pesquisa/pesquisar-formulario/pesquisar-formulario.controle.js",
					"controllerName": "PesquisaFormularioControle"
				},
				{
					"state": "pesquisar-formulario-aprovacao",
					"url": "/pesquisa/pesquisar-formulario-aprovacao",
					"displayName": "Pesquisar Formulário de Pesquisa (Pendentes de Aprovação)",
					"templateUrl": "./app/modulos/pesquisa/pesquisar-formulario-aprovacao/pesquisar-formulario-aprovacao.html",
					"controllerUrl": "./app/modulos/pesquisa/pesquisar-formulario-aprovacao/pesquisar-formulario-aprovacao.controle.js",
					"controllerName": "PesquisaFormularioAprovacaoControle"
				},			
				{
					"state": "midia",
					"url": "/midia",
					"displayName": "Midia",
					"templateUrl": "./app/modulos/midia/midia.html",
					"controllerUrl": "./app/modulos/midia/midia.controle.js",
					"controllerName": "MidiaControle"
				},
				{
					"state": "sam",
					"url": "/sam",
					"displayName": "Manter SAM",
					"templateUrl": "./app/modulos/sam/sam.html",
					"controllerUrl": "./app/modulos/sam/sam.controle.js",
					"controllerName": "SamControle"
				},
				{
					"state": "tipo-arquivo",
					"url": "/tipo-arquivo",
					"displayName": "Tipo Arquivo",
					"templateUrl": "./app/modulos/tipo-arquivo/tipo-arquivo.html",
					"controllerUrl": "./app/modulos/tipo-arquivo/tipo-arquivo.controle.js",
					"controllerName": "TipoArquivoControle"
				},
				{
					"state": "cartao",
					"url": "/cartao",
					"displayName": "Cartão",
					"templateUrl": "./app/modulos/cartao/cartao.html",
					"controllerUrl": "./app/modulos/cartao/cartao.controle.js",
					"controllerName": "CartaoControle"
				},
				{
					"state": "cadastro",
					"url": "/cadastro",
					"displayName": "Cadastro",
					"templateUrl": "./app/modulos/cadastro/cadastro.html",
					"controllerUrl": "./app/modulos/cadastro/cadastro.controle.js",
					"controllerName": "CadastroControle"
				},
				{
					"state": "estampa",
					"url": "/estampa",
					"displayName": "Estampa",
					"templateUrl": "./app/modulos/estampa/estampa.html",
					"controllerUrl": "./app/modulos/estampa/estampa.controle.js",
					"controllerName": "EstampaControle"
				},
				{
					"state": "estampa-vinculo",
					"url": "/estampa-vinculo",
					"displayName": "Vincular Estampa ao Casco",
					"templateUrl": "./app/modulos/estampa-vinculo/estampa-vinculo.html",
					"controllerUrl": "./app/modulos/estampa-vinculo/estampa-vinculo.controle.js",
					"controllerName": "EstampaVinculoControle"
				},
				{
					"state": "perfil-produto",
					"url": "/perfil-produto",
					"displayName": "Perfil Produto",
					"templateUrl": "./app/modulos/perfil-produto/perfil-produto.html",
					"controllerUrl": "./app/modulos/perfil-produto/perfil-produto.controle.js",
					"controllerName": "PerfilProdutoControle"
				},
				{
					"state": "agrupamento",
					"url": "/agrupamento",
					"displayName": "Manter Agrupamento",
					"templateUrl": "./app/modulos/agrupamento/agrupamento.html",
					"controllerUrl": "./app/modulos/agrupamento/agrupamento.controle.js",
					"controllerName": "AgrupamentoControle"
				},
				{
					"state": "menuPaginaPrincipal",
					"url": "/menu-pagina-principal",
					"displayName": "Menu da Página Principal",
					"templateUrl": "./app/modulos/menu-pagina-principal/menu-pagina-principal.html",
					"controllerUrl": "./app/modulos/menu-pagina-principal/menu-pagina-principal.controle.js",
					"controllerName": "MenuPaginaPrincipalControle"
				},
				{
					"state": "moeda",
					"url": "/moeda",
					"displayName": "Moeda",
					"templateUrl": "./app/modulos/moeda/moeda.html",
					"controllerUrl": "./app/modulos/moeda/moeda.controle.js",
					"controllerName": "MoedaControle"
				},
				{
					"state": "faq",
					"url": "/faq",
					"displayName": "FAQ",
					"templateUrl": "./app/modulos/faq/faq.html",
					"controllerUrl": "./app/modulos/faq/faq.controle.js",
					"controllerName": "FaqControle"
				},
				{
					"state": "informacoes",
					"url": "/informacoes",
					"displayName": "Informações",
					"templateUrl": "./app/modulos/informacoes/informacoes.html",
					"controllerUrl": "./app/modulos/informacoes/informacoes.controle.js",
					"controllerName": "InformacoesControle"
				},
				{
					"state": "grupoperfilUsuario",
					"url": "/grupo-perfil-usuario",
					"displayName": "Grupo de Perfil do Usuário do Transporte Público",
					"templateUrl": "./app/modulos/grupo-perfil-usuario/grupo-perfil-usuario.html",
					"controllerUrl": "./app/modulos/grupo-perfil-usuario/grupo-perfil-usuario.controle.js",
					"controllerName": "GrupoPerfilUsuarioControle"
				},
				{
					"state": "perfilUsuario",
					"url": "/perfil-usuario",
					"displayName": "Perfil do Usuário do Transporte Público",
					"templateUrl": "./app/modulos/perfil-usuario/perfil-usuario.html",
					"controllerUrl": "./app/modulos/perfil-usuario/perfil-usuario.controle.js",
					"controllerName": "PerfilUsuarioControle"
				},
				{
					"state": "pesquisarCredito",
					"url": "/pesquisar-credito",
					"displayName": "Pesquisar Crédito",
					"templateUrl": "./app/modulos/pesquisar-credito/pesquisar-credito.html",
					"controllerUrl": "./app/modulos/pesquisar-credito/pesquisar-credito.controle.js",
					"controllerName": "PesquisarCreditoControle"
				},
				{
					"state": "pesquisartarifa",
					"url": "/pesquisar-tarifa",
					"displayName": "Pesquisar Tarifa",
					"templateUrl": "./app/modulos/pesquisar-tarifa/pesquisar-tarifa.html",
					"controllerUrl": "./app/modulos/pesquisar-tarifa/pesquisar-tarifa.controle.js",
					"controllerName": "PesquisarTarifaControle"
				}
			]
		})
	});
})();
