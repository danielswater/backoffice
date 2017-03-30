define(['angularAMD'], function(app) {
	app.controller('EditarMenuPaginaPrincipalControle', EditarMenuPaginaPrincipalControle);
	EditarMenuPaginaPrincipalControle.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'modal', '$timeout', 'ModalFabrica'];

	function EditarMenuPaginaPrincipalControle($scope, $rootScope, $uibModalInstance, modal, $timeout, ModalFabrica) {
		$scope.modal = modal;
		$scope.incluir = {
			imagem : '',
			corFundo : '#000000',
			corFonte : '#FFFFFF'
		}

		$scope.gruposUsuarioSistema = [
			{
				id : '1',
				descricao : 'Cidadão'
			} ,
			{ 
				id : '2',
				descricao : 'Trabalhador'
			} ,
			{ 
				id : '3',
				descricao : 'Desempregado'
			} ,
		];

		$scope.menusPaginaPrincipal = [
			{
				ordenacao : '1',
				nomeMenusPaginaPrincipal : 'Minha Conta',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 1',
				corFundo : '#847357',
				corFonte : '#F3567C',
				registro : {
					situacao : {
						id : 'A'
					}
				}
			},
			{
				ordenacao : '2',
				nomeMenusPaginaPrincipal : 'Minha Conta',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 2',
				corFundo : '#847357',
				corFonte : '#F3567C',
				registro : {
					situacao : {
						id : 'I'
					},
					data_alteracao : '2016-12-22T15:13:00',
					usuario_alteracao : 'Luciano'
				}
			},
			{
				ordenacao : '3',
				nomeMenusPaginaPrincipal : 'Minha Conta',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 3',
				corFundo : '#847357',
				corFonte : '#F3567C',
				registro : {
					situacao : {
						id : 'A'
					}
				}
			},
			{
				ordenacao : '4',
				nomeMenusPaginaPrincipal : 'Minha Conta',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 4',
				corFundo : '#847357',
				corFonte : '#F3567C',
				registro : {
					situacao : {
						id : 'A'
					}
				}
			},
			{
				ordenacao : '5',
				nomeMenusPaginaPrincipal : 'Minha Conta',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 5',
				corFundo : '#847357',
				corFonte : '#F3567C',
				registro : {
					situacao : {
						id : 'I'
					},
					data_alteracao : '2016-12-22T15:13:00',
					usuario_alteracao : 'Luciano'
				}
			},
			{
				ordenacao : '6',
				nomeMenusPaginaPrincipal : 'Solicitações',
				grupoUsuarioSistema : 'Cidadão',
				imagem : 'image/jpeg;base64,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',
				agrupamento : 'Teste 6',
				corFundo : '#064581',
				corFonte : '#F3456E',
				registro : {
					situacao : {
						id : 'A'
					}
				}
			}
		];

		$scope.paginas = [
			{
				id : 1,
				descricao : 'Teste 1',
			},
			{
				id : 2,
				descricao : 'Teste 2',
			},
			{
				id : 3,
				descricao : 'Teste 3',
			},
			{
				id : 4,
				descricao : 'Teste 4',
			},
			{
				id : 5,
				descricao : 'Teste 5',
			},
			{
				id : 6,
				descricao : 'Teste 6',
			},
		];

		$rootScope.paginasMenu = [
			{
				ordenacao : 1,
				pagina : 'Teste 1'
			},
			{
				ordenacao : 2,
				pagina : 'Teste 2'
			},
			{
				ordenacao : 3,
				pagina : 'Teste 3'
			},
			{
				ordenacao : 4,
				pagina : 'Teste 4'
			},
			{
				ordenacao : 5,
				pagina : 'Teste 5'
			},
		];

		$scope.adicionarPagina = function(item){
			let pagina = {
				pagina : item.descricao,
				ordenacao : $scope.paginasMenu.length+1
			};

			$rootScope.paginasMenu.push(pagina);
		};

		$scope.updateLista = function(){
			console.log('$rootScope.paginasMenu ANTES',$rootScope.paginasMenu);
			
			var itens = $rootScope.paginasMenu;
			for(var i=0 ; i < itens.length ; i++){
				var ord = i+1;
				$rootScope.paginasMenu[i] = {
					ordenacao : ord,
					pagina : itens[i].pagina
				};
			}

			console.log('$rootScope.paginasMenu DEPOIS',$rootScope.paginasMenu);
		};

		$scope.excluir = function(item){
			var index = $rootScope.paginasMenu.indexOf(item);
			$rootScope.paginasMenu.splice(index, 1);
			$uibModalInstance.close();
			
			$scope.updateLista();
		};

		$scope.sortableOptions = {
			update: function(e, ui) {
				if (ui.item.sortable.model == "can't be moved") {
					ui.item.sortable.cancel();
				} else {
					var logEntry = $scope.paginasMenu.map(function(i){
						return i.value;
					}).join(', ');
				}
			},
			stop: function(e, ui) {
				if (ui.item.sortable.model == "can't be moved") {
					ui.item.sortable.cancel();
				} else {
					// this callback has the changed model
					var logEntry = $scope.paginasMenu.map(function(i){
						return i.value;
					}).join(', ');
				}
			}
		};

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.editarSubmit = function(){
			if(!$scope.formMenuPaginaPrincipal.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique.',
					function(){ }
				);
				return false;
			}
			
			var corFundo = /^#[0-9A-F]{6}$/i.test($scope.editar.corFundo);
			var corFonte = /^#[0-9A-F]{6}$/i.test($scope.editar.corFonte);

			if(!corFundo){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Cor de fundo inválida',
					function(){
						return false;
					}
				);
			} 
			else if(!corFonte){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Cor de fonte inválida',
					function(){
						return false;
					}
				);
			} else {
				var ele = angular.element(document.getElementById('imagem'));

				if(ele != undefined && ele != null && ele != ''){
					if($scope.editar.imagem == ''){
						ele.addClass('ng-invalid-required');
						return false;
					} else {
						ele.removeClass('ng-invalid-required');

						$scope.espera = $http.get('localhost').then(
							// function(resposta){
							function(){
								// if(resposta.data){
									new ModalFabrica.abrirModalMensagem(
										'sucesso',
										// resposta,
										'Inclusão realizada com sucesso.',
										function(){
											$uibModalInstance.close();
										}
									);
								// }
							}, 
							function(resposta){
								new ModalFabrica.abrirModalMensagem(
									'erro',
									'Erro ao editar',
									function(){ }
								);
								
								return false;
							}
						);

						console.log('$scope.editar',$scope.editar);
					}
				}
			}
		};

		$scope.fileChanged = function(e) {
			var ele = angular.element(document.getElementById('imagem'));
			ele.removeClass('ng-invalid-required');

			var files = e.target.files;
			console.log('files',files);
			
			var nomeArquivo = files[0].name;
			$scope.nomeArquivo = nomeArquivo;
			$scope.incluir.imagem = nomeArquivo;
			ext = nomeArquivo.substr(nomeArquivo.lastIndexOf('.')+1);
			$scope.extensaoImagem = ext;
			console.log('$scope.extensaoImagem',$scope.extensaoImagem);

			var fileReader = new FileReader();
			fileReader.readAsDataURL(files[0]);
			fileReader.onload = function(e) {
				var image = this.result;
				var img = new Image();
                img.src = e.target.result;
				$scope.imgSrc = image.replace('data:image/'+ext+';base64,','');

				img.onload = function () {
					var imgLoaded = document.getElementById('ImgLoaded');
					if(imgLoaded != undefined && imgLoaded != null && imgLoaded != ''){
						imgLoaded.parentElement.removeChild(imgLoaded);
					}

					var imgLoadedDiv  = '<div style="clear:both;width:100%;" id="ImgLoaded">';
						imgLoadedDiv += '	<div class="col-md-3"></div>';
						imgLoadedDiv += '	<div class="col-md-6" id="imgObj"></div>';
						imgLoadedDiv += '</div>';

					document.getElementById('imagemBox').innerHTML += imgLoadedDiv;

					// CREATE A CANVAS ELEMENT AND ASSIGN THE IMAGES TO IT.
					var canvas = document.createElement("canvas");
					var value = 50;

					// RESIZE THE IMAGES ONE BY ONE.
					img.width = (img.width * value) / 100;
					img.height = (img.height * value) / 100;

					var ctx = canvas.getContext("2d");
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0, img.width, img.height);

					document.getElementById('imgObj').appendChild(img);
				}

				$scope.$apply();
				return;
			};
		};

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			delete $scope.quantidadeAnalise;
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};

	};
});