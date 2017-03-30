/**
 * RecursosFactory - Gera o recurso do sistema, baseado no ngResource
 * @factory
 * @param {string} strNomeRecurso - O nome do recurso na URL a ser acessado
 * @param {string} strVersaoRecurso - O identificador de versão do recurso
 * @param {[object]} objPropriedadesRecurso - As propriedades do recurso
 * @param {[object]} objConfigMetodos - Configurações dos métodos
 * @return {object} $resource - Componente $resource do Angular
 *
 *
 * Mais informações:
 * Acessar a documentação em: https://docs.angularjs.org/api/ngResource/service/$resource
 *
 *
 * Recurso sempre será baseado em
 * http://URL_DO_SERVIDOR/NOME_RECURSO/{id}
 * Onde {id} é o identificar único do registro
 * Caso {id} seja omitido, o padrão é trazer a lista completa de dados no GET
 *
 * // Exemplo de declaração do Recurso
 * var Usuarios = new RecursosFabrica ( 'usuarios' , 'v1' , { nome : '' } );
 *
 *
 * // Exemplo de callback de SUCESSO
 * // Sucesso na requisição (200)
 * var fnCallbackSucesso = function ( resultado ) {
 *     // Dados estão na propriedade {data} do retorno
 *     console.log ( resultado.data );
 *     $scope.data = resultado.data;
 *     alert ( 'Operação realizada com sucesso' );
 * }
 *
 *
 * // Exemplo de callback de ERRO
 * // Erro no servidor (500), requisição (400, ou não encontrado 404)
 * var fnCallbackErro = function ( err ) {
 * 		console.log ( err );
 * 		alert ( 'Houve um erro na operação' );
 * }
 *
 *
 * // Exemplo de obtenção de todos os usuários:
 * // Realiza um GET: /usuarios
 * Usuarios.get ( fnCallbackSucesso , fnCallbackErro );
 *
 *
 * // Exemplo de obtenção de todos os usuários (com filtro ou não):
 * // Realiza um GET: /usuarios?nome=Maria
 * Usuarios.query ( { nome : 'Maria' } , fnCallbackSucesso , fnCallbackErro );
 *
 *
 * // Exemplo de obtenção de um usuário:
 * // Realiza um GET: /usuarios/1
 * Usuarios.get ( { id : 1 } , fnCallbackSucesso , fnCallbackErro );
 *
 *
 * // Exemplo de criação:
 * // Omitindo o {id}
 * // Realiza um POST: /usuarios/ { nome : 'Maria' }
 * Usuarios.create ( { nome : 'Maria' },
 * fnCallbackSucesso,
 * fnCallbackErro );
 *
 *
 * // Exemplo para criar e editar um novo {id}:
 * // Retorna o model anteriormente criado
 * var usuario = new Usuarios();
 * usuario.name = 'Maria';
 * Usuarios.create ( usuario ,
 * fnCallbackSucesso,
 * fnCallbackErro );
 *
 *
 * // Exemplo de alteração/atualização:
 * // Inserindo o {id}
 * // Realiza um PUT: /usuarios/1 { id : 1 , nome : 'José' }
 * Usuarios.save ( { id : 1 , nome : 'José' },
 * fnCallbackSucesso,
 * fnCallbackErro );
 *
 *
 * // Exemplo de remoção:
 * // Realiza um DELETE: /usuarios/1
 * Usuarios.delete ( { id : 1 },
 * fnCallbackSucesso,
 * fnCallbackErro );
 *
 *
 */

define(['angularAMD', 'angular', 'angular-resource', 'config'], function(app) {

	app.factory('RecursosFabrica', Recursos);

	Recursos.$inject = ['$resource', '$log'];

	function Recursos($resource, $log) {

		var meuNome = 'FABRICA_RECURSOS';

		function Recurso(strNomeRecurso, strVersaoRecurso, objPropriedadesRecurso, objConfigMetodos) {

			var
				_public = {},
				urlServidor,
				angularResourceComponente,
				recurso;

			function validarInicializacao() {
				if (!$resource) {
					throw Error(meuNome, 'Componente $resource do Angular não foi definido');
				}

				if (!strNomeRecurso) {
					throw Error(meuNome, 'Você deve informar um nome para o recurso');
				}

				strVersaoRecurso = strVersaoRecurso ? (strVersaoRecurso + '/') : '';
				strNomeRecurso = strVersaoRecurso + strNomeRecurso
			}

			function carregarDependencias() {
				urlServidor = "http://10.6.11.159:9090/"
				angularResourceComponente = $resource;
			}

			function interceptor() {
				var dataRequisicao = moment().format('DD/MM/YYYY, HH:mm:ss');

				return {					
					response: function(resposta) {
						var url = resposta.config.url;
						var mensagem = resposta.config.method + ' ' + url + ' ' + resposta.status + ' (Sucesso) - ' + dataRequisicao;						
						$log.info(mensagem);
						$log.debug(resposta.data);
						return resposta.data;
					},
					responseError: function(resposta) {
						var config = resposta.config;
						$log.error(config.method + ' ' + config.url + resposta.status + ' (Erro) - ' + dataRequisicao);
						$log.debug(resposta.data);
						return resposta;
					}
				};
			}

			function configurarOpcoesDefault() {
				// Uma propriedade ID sempre será informada
				objPropriedadesRecurso = objPropriedadesRecurso || {};
				objPropriedadesRecurso.id = '@id';

				objConfigMetodos = objConfigMetodos || {};

				// Padronizando a obtenção dados para buscas no método Query
				objConfigMetodos.get = objConfigMetodos.get || {};
				objConfigMetodos.get.method = 'GET';
				objConfigMetodos.get.interceptor = interceptor();

				objConfigMetodos.query = objConfigMetodos.query || {};
				objConfigMetodos.query.isArray = false;
				objConfigMetodos.query.interceptor = interceptor();

				objConfigMetodos.save = objConfigMetodos.save || {}
				objConfigMetodos.save.method = 'PUT';
				objConfigMetodos.save.interceptor = interceptor();

				objConfigMetodos.create = objConfigMetodos.create || {};
				objConfigMetodos.create.method = 'POST';
				objConfigMetodos.create.interceptor = interceptor();
			}

			// Sobreescreve o método que não deve ter parâmetros vazios nem objetos
			function limparParametrosVazios(objMetodoParaTratar) {
				var queryOriginal = objMetodoParaTratar;

				return function(data, fnS, fnE) {
					var dataToRequest = {};
					_.forOwn(data, function(value, key) {
						if (!!data[key] && typeof data[key] != 'object') {
							dataToRequest[key] = value;
						}
					});
					return queryOriginal(dataToRequest, fnS, fnE);
				}
			}

			function gerarRecurso(itens) {
				recurso = angularResourceComponente(
					urlServidor + strNomeRecurso + '/:id', {
						id: objPropriedadesRecurso.id
					},
					objConfigMetodos
				);
			}

			function tratarParametrosVazios() {
				// Aplicando para Query e Get pois passam parâmetros na URL
				recurso.query = new limparParametrosVazios(recurso.query);
				recurso.get = new limparParametrosVazios(recurso.get);
			}

			function getModel() {
				var model = angular.copy(objPropriedadesRecurso);
				model.id = '';
				return model;
			}

			function configurarConstrutor() {
				// Implicitamente, ao chamar a função, o model será retornado;
				_public = getModel;
			}

			function configurarMetodos() {
				// Associar métodos do ngResource
				for (var prop in recurso) {
					_public[prop] = recurso[prop];
				}

				// Associar método explícito do getModel
				_public.getModel = getModel;
			}

			function init() {
				validarInicializacao();
				carregarDependencias();
				configurarOpcoesDefault();
				gerarRecurso();
				tratarParametrosVazios();
				configurarConstrutor();
				configurarMetodos();
			}

			init();

			return _public;
		}

		return Recurso;

	}

	return Recursos;
});