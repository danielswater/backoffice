define(['angularAMD','AgrupamentoServico'], function(app) {
	app.controller('EditarAgrupamentoControle', EditarAgrupamentoControle);

	EditarAgrupamentoControle.$inject = ['$scope', '$uibModalInstance', 'modal', '$timeout','AgrupamentoServico', 'ModalFabrica'];

	function EditarAgrupamentoControle($scope, $uibModalInstance, modal, $timeout,AgrupamentoServico, ModalFabrica) {
		$scope.modal = modal;
		$scope.editar = modal.objeto;
		$scope.imgStyle = {};
		console.log('$scope.editar',$scope.editar);

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

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.editarSubmit = function(){
			if(!$scope.formAgrupamento.$valid){
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

						$scope.espera = AgrupamentoServico.editar(
							$scope.editar,
							// function(resposta){
							function(){
								// if(resposta.data){
									new ModalFabrica.abrirModalMensagem(
										'sucesso',
										// resposta,
										'Alteração realizada com sucesso.',
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

						console.log('$scope.incluir',$scope.incluir);
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
			$scope.editar.imagem = nomeArquivo;
			ext = nomeArquivo.substr(nomeArquivo.lastIndexOf('.')+1);
			$scope.extensaoImagem = ext;
			console.log('$scope.extensaoImagem',$scope.extensaoImagem);

			var fileReader = new FileReader();
			fileReader.readAsDataURL(files[0]);
			fileReader.onload = function(e) {
				var image = this.result;
				var img = new Image();
                img.src = e.target.result;
				console.log('img.src',img.src);
				
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
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};

		$scope.init = function(){
			if($scope.editar.imagem != undefined && $scope.editar.imagem != null && $scope.editar.imagem != ''){
				var img = new Image();
				img.src = 'data:'+$scope.editar.imagem;
				img.onload = function() {
					$scope.imgStyle = {
						height : (img.naturalHeight * 50) / 100,
						width : (img.naturalWidth * 50) / 100
					};
				};
			}
		};

		$scope.init();
	};
});