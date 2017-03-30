define(['angularAMD', 'sptMensagemErro'], function(app) {
	app.controller('IncluirPerfilControle', IncluirPerfilControle);

	IncluirPerfilControle.$inject = ['$scope', '$http','$uibModalInstance', 'modal', 'ModalFabrica'
	];

	function IncluirPerfilControle($scope, $http, $uibModalInstance, modal, ModalFabrica


		) {

		$scope.modal = modal;
		$scope.incluir = {
			imagem : '',
			corFundo : '#000000',
			corFonte : '#FFFFFF'
		}


		$scope.incluirSubmit = function(){
			console.log('pre-func');
			if($scope.incluir.nome == null ||  $scope.incluir.imagem == null ) {
				console.log('É necessário o preenchimento de pelo menos um campo');
				// $scope.mensagemServidor = {
				// 	"descricao" : "ERRO",
				// 	"class": "mensagem-erro",
				// 	"data" : {
				// 		"mensagem" : "É necessário o preenchimento de pelo menos um campo"
				// 	}
				// };
			}
		};

		$scope.gruposPerfilUsuario = [
			{
				id : '1',
				descricao : 'Comum'
			} ,
			{
				id : '2',
				descricao : 'Fidelidade'
			} ,
			{
				id : '3',
				descricao : 'Lazer'
			} ,
			{
				id : '4',
				descricao : 'PCD'
			} ,
			{
				id : '5',
				descricao : 'Obeso'
			} ,
			{
				id : '6',
				descricao : 'Gestante'
			} ,
			{
				id : '7',
				descricao : 'BUSP'
			} ,
			{
				id : '8',
				descricao : 'Idoso'
			} ,
			{
				id : '9',
				descricao : 'Mãe Paulistana'
			} ,
			{
				id : '10',
				descricao : 'Estudante'
			} ,
		];

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.incluirSubmit = function(isValid){
			if(isValid){
				var ele = angular.element(document.getElementById('imagem'));

				if(ele != undefined && ele != null && ele != ''){
					if($scope.incluir.imagem == ''){
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
									'Erro ao incluir',
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
