define(['angularAMD',
		'lodash', 'moment-require',
		'ui-router',
		'sptMenuPrincipal',
		'angular-busy',
		'ngMask',
		'esperaModelo',
		'breadcrumb',
		'mensagensFabrica','mensagens', 'mapa-mensagens',
		'dataUtils',
		'paginacaoConstante', 'regexConstante', 'eventoConstante', 'labelConstante',
		'filtroRequisicaoModelo','sptFiltro','sptMensagemErro','sptInclusaoEstatica',
		'dataUtils','sptData','sptDataHora','sptDataIntervalo',
		'sptSelect',
		'Utils','ui-bootstrap',
		'ModalFabrica','sptModalAcao', 
		'rotas', 
		'config', 
		'ui-sortable',
		'colorpicker.module',
		'ngQuill',
		'sptArquivoValido',
		'HttpInterceptador'],

	function(angularAMD) {
		var app = angular.module('app', ['ui.router','ngAnimate', 'ngTouch', 'ngMask', 'angularUtils.directives.uiBreadcrumbs', 'ui.bootstrap', 'cgBusy','ui.sortable', 'colorpicker.module','ngQuill']);

		app.config(config);
		config.$inject = ['$stateProvider', '$urlRouterProvider', 'ROTAS', '$httpProvider', 'CONFIG'];

		function config($stateProvider, $urlRouterProvider, ROTAS, $httpProvider, CONFIG) {
			if (!CONFIG.disableInterceptor) {
				// Adiciona um interceptador do http
				$httpProvider.interceptors.push('HttpInterceptador');
			}
			carregaRotas(ROTAS, $stateProvider);
			$urlRouterProvider.otherwise('/pagina-inicial');
		};

		app.run(run);
		run.$inject = ['$rootScope', 'PAGINACAO', 'REGEX', 'EVENTO', 'LABEL'];

		function run($rootScope, PAGINACAO, REGEX, EVENTO, LABEL) {
			$rootScope.ITENS_POR_PAGINA = PAGINACAO.ITENS_POR_PAGINA;
			$rootScope.REGEX = REGEX;
			$rootScope.EVENTO = EVENTO;
			$rootScope.LABEL = LABEL;
		}

		function carregaRotas(ROTAS, $stateProvider) {
			angular.forEach(ROTAS.ESTADOS, function(rota) {
				var state = {
					url: rota.url,
					data: {
						displayName: rota.displayName
					},
					templateUrl: rota.templateUrl,
					resolve: {
						loadOtherCtrl: ["$q", function($q) {
							var deferred = $q.defer();
							require([rota.controllerUrl], function() {
								deferred.resolve();
							});
							return deferred.promise;
						}]
					},
					controllerProvider: function() {
						return rota.controllerName;
					}
				};
				$stateProvider.state(rota.state, angularAMD.route(state));
			});
		}

		return angularAMD.bootstrap(app);
	}
);