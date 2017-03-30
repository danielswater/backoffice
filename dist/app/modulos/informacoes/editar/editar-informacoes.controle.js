define(['angularAMD','InformacoesServico', 'sptMensagemErro'], function(app) {
	app.controller('EditarInformacoesControle', EditarInformacoesControle);

	EditarInformacoesControle.$inject = ['$window','$scope', '$http','$filter','$timeout','$uibModalInstance', 'modal', 'ModalFabrica','InformacoesServico','$sce', 'MensagensFabrica'];

	function EditarInformacoesControle($window,$scope, $http,$filter,$timeout,$uibModalInstance, modal, ModalFabrica,InformacoesServico,$sce, MensagensFabrica) {
		$scope.informacao_editor = true;
		$scope.informacao_preview = false;
		$scope.canvas_show = false;
		$scope.modal = modal;
		$scope.editar = modal.objeto;
		$scope.situacao = '';
		$scope.dataPublicacaoMinima = moment();
		$scope.mudaSituacao = function(mti){
			$scope.editar.registro.motivo.descricao = $scope.situacao = mti.descricao;
		};

		console.log('$scope.editar',$scope.editar);

		$scope.espera = InformacoesServico.listarCategoriasInformacoes(
			function(resposta){
				if(resposta.data){
					$scope.categoriasInformacoes = $filter('orderBy')(resposta.data, 'descricao');
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar as categorias informacoes', resposta);
			}
		);

		$scope.espera = InformacoesServico.listarMotivosInformacoes(
			function(resposta){
				if(resposta.data){
					$scope.motivosInformacoes = $filter('orderBy')(resposta.data, 'descricao', true);
				}
			}, 
			function(resposta){
				console.log('Erro ao carregar as categorias informacoes', resposta);
			}
		);

		$scope.carregaInformacoesDestaque = function(){
			$scope.informacoesDestaque = [];
			$scope.informacoesDestaqueFiltro = {
				categoria : null,
				tituloConteudo : null,
				registro : {
					motivo : null,
				},
				flagDestaque : 'S'
			};

			$scope.espera = InformacoesServico.filtrar(
				$scope.informacoesDestaqueFiltro,
				function(resposta){
					$scope.informacoesDestaque = resposta.data;
					console.log('$scope.informacoesDestaque',$scope.informacoesDestaque);
				},
				function(resposta){ }
			);
		};
		$scope.carregaInformacoesDestaque();

		$scope.fechar = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {
			$uibModalInstance.close();
		};

		$scope.preVisualizar = function(){
			if($scope.editar.flagDestaque == 'S' && $scope.informacoesDestaque.length == 2){
			 	if($scope.informacoesDestaque[0].id != $scope.editar.id && $scope.informacoesDestaque[1].id != $scope.editar.id){
					console.log('$scope.informacoesDestaque[0].id',$scope.informacoesDestaque[0].id);
					console.log('$scope.editar.id',$scope.editar.id);

					new ModalFabrica.abrirModalMensagem(
						'erro',
						'Já existem 2 (duas) Informações cadastradas como Destaque. Por favor,  remova uma Informação cadastrada como Destaque para incluir outra.',
						function(){ }
					);
					
					return false;
				 }
			}

			if(!$scope.formInformacoes.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique',
					function(){ }
				);
				
				return false;
			} else {
				$scope.modal.nome = 'informacoes_submit';

				if(typeof($scope.editar.textoInformacao) != 'object'){
					$scope.editar.previewTextoInformacao = $sce.trustAsHtml($scope.editar.textoInformacao);
				}

				var canvas = document.getElementById("imagemDestaquePreview");
				var ctx = canvas.getContext("2d");
				var image = new Image();
				image.crossOrigin = 'Anonymous';
				image.src = $scope.editar.imagemDestaque;
				image.onload = function() {
					// $("#imagemDestaquePreview").width(this.width);
					// $("#imagemDestaquePreview").height(this.height);
					$("#imagemDestaquePreview").width(200);
					$("#imagemDestaquePreview").height(200);
					ctx.drawImage(image,0,0,this.width, this.height,0,0,canvas.width,canvas.height);
					if($scope.editar.imagemDestaque != '' && $scope.editar.imagemDestaque != undefined && $scope.editar.imagemDestaque != null){
						$("#imagemDestaqueChoose").removeAttr('required');
					} else {
						$("#imagemDestaqueChoose").attr('required');
					}
				}

				$scope.informacao_editor = false;
				$scope.informacao_preview = true;
			}
		};

		$scope.retornaEditor = function(){
			$scope.modal.nome = 'informacoes';
			$scope.informacao_preview = false;
			$scope.informacao_editor = true;
		};

		$scope.editarSubmit = function(){
			if(!$scope.formInformacoes.$valid){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Campo(s) obrigatório(s) não preenchido(s). Verifique',
					function(){ }
				);
				
				return false;
			} else {
				if($scope.editar.registro.motivo.descricao == 'Publicado' && 
					($scope.editar.dataPublicacao == '' ||
					$scope.editar.dataPublicacao == undefined ||
					$scope.editar.dataPublicacao == null)
				){
					new ModalFabrica.abrirModalMensagem(
						'erro',
						'Por favor, selecione a Data de Publicação',
						function(){ }
					);

					return false;
				}

				var m,n,
						o = 0,
						urls = [],
						rex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g;

				while( m = rex.exec( $scope.editar.textoInformacao ) ){
					urls.push( m[1] );
				}

				$scope.callback = function(){
					delete $scope.editar.previewTextoInformacao;

					$scope.espera = InformacoesServico.editar(
						$scope.editar,
						function(resposta){
							var mensagem = MensagensFabrica.get(resposta.data.codigo);
							console.log('mensagem',mensagem);

							new ModalFabrica.abrirModalMensagem(
								mensagem.tipo == 'ERRO' ? 'erro' : 'sucesso',
								mensagem.descricao,
								function(){
									console.log('resposta',resposta);
									if(mensagem.tipo == 'SUCESSO'){
										$uibModalInstance.close();
									}
								}
							);

							return false;
						}, 
						function(resposta){
							new ModalFabrica.abrirModalMensagem(
								'erro',
								resposta.mensagem,
								function(){
										console.log('resposta',resposta);
								}
							);

							return false;
						}
					);
				}

				if(urls.length){
					while ( n = rex.exec( $scope.editar.textoInformacao ) ) {
						var canvas = document.getElementById("myCanvas");
						var ctx = canvas.getContext("2d");
						var image = new Image();
						image.crossOrigin = 'Anonymous';
						image.src = n[1];
						image.onload = function() {
							$("#myCanvas").width(this.width);
							$("#myCanvas").height(this.height);
							ctx.drawImage(image,0,0,this.width, this.height,0,0,canvas.width,canvas.height);
							var base64 = canvas.toDataURL('image/jpeg',1.0);
							// var newBase64 = base64.replace('data:image/jpeg;base64,','');
							var textoInformacao = $scope.editar.textoInformacao;
							// var newTextoInformacao = textoInformacao.replace(this.src,newBase64);
							var newTextoInformacao = textoInformacao.replace(this.src,base64);
							$scope.editar.textoInformacao = newTextoInformacao;

							if(o == (urls.length-1)){
								$scope.callback();
							}
							o++;
						};
					}
				} else {
					$scope.callback();
				}
			}
		};

		// CASO ESCOLHA UMA NOVA IMAGEM
		// CARREGAR A NOVA IMAGEM NA TELA DE EDICAO DA INFORMACAO
		$scope.fileChanged = function(e) {
			var files = e.target.files;
			var ext = files[0].name;
			ext = ext.substr(ext.lastIndexOf('.')+1);

			var fileReader = new FileReader();
			var fileSize = Math.round(files[0].size);

			if(ext != 'jpg' && ext != 'jpeg' && ext != 'png' && ext != 'JPG' && ext != 'JPEG' && ext != 'PNG'){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Atenção: Extensões permitidas são: jpg, jpeg e png',
					function(){ }
				);

				$scope.editar.imagemDestaque = $scope.editar.imagemDestaqueChoose = '';
				$('#imagemDestaqueChoose').val('');
				return false;
			} else if(fileSize > 300000){
				new ModalFabrica.abrirModalMensagem(
					'erro',
					'Atenção: o tamanho máximo permitido é de 300kb',
					function(){ }
				);

				$scope.editar.imagemDestaqueChoose = '';
				$('#imagemDestaqueChoose').val('');
				return false;
			} else {
				fileReader.readAsDataURL(files[0]);
				fileReader.onload = function(e) {
					$scope.editar.imagemDestaque = this.result;
					$scope.$apply();
				};
			}
		};

		var imagemPreviewEditingGenerate = function(){
			var canvas = document.getElementById('imagemDestaquePreviewEditing');

			if(canvas != null && canvas != undefined && canvas != ''){
				var ctx = canvas.getContext("2d");
				var image = new Image();
				image.crossOrigin = 'Anonymous';
				image.src = $scope.editar.imagemDestaque;
				image.onload = function() {
					// $("#imagemDestaquePreviewEditing").width(this.width);
					// $("#imagemDestaquePreviewEditing").height(this.height);
					$("#imagemDestaquePreviewEditing").width(200);
					$("#imagemDestaquePreviewEditing").height(200);
					ctx.drawImage(image,0,0,this.width, this.height,0,0,canvas.width,canvas.height);
				}
			}
		};

		if( $scope.editar.imagemDestaque != undefined && $scope.editar.imagemDestaque != '' && $scope.editar.imagemDestaque != null ){
			var imagemPreviewExists = setInterval(function(){
				if(document.getElementById('imagemDestaquePreviewEditing')){
					clearInterval(imagemPreviewExists);
					imagemPreviewEditingGenerate();
				}
			});
		}
		// \\CARREGAR A NOVA IMAGEM NA TELA DE EDICAO DA INFORMACAO

		$scope.limpar = function() {
			$scope.formFiltro.$setPristine();
			$scope.formFiltro.$setUntouched();
			$scope.$broadcast($rootScope.EVENTO.LIMPAR_FORM);
		};

		$scope.editorCreated = function(editor) {
			var editorExists = setInterval(function(){
				if(editor){
					editor.pasteHTML($scope.editar.textoInformacao);
					clearInterval(editorExists);
				}
			});
		};

		$scope.init = function(){
			var loadImagemDestaque = function(){ // CARREGAR IMAGEM JÁ SALVA ACIMA DO COMBO DE SELECIONAR UMA NOVA IMAGEM
				var canvas = document.getElementById("imagemDestaquePreviewEditing");

				if(canvas != null && canvas != undefined && canvas != ''){
					var ctx = canvas.getContext("2d");
					var image = new Image();
					image.crossOrigin = 'Anonymous';
					image.src = $scope.editar.imagemDestaque;
					image.onload = function() {
						// $("#imagemDestaquePreviewEditing").width(this.width);
						// $("#imagemDestaquePreviewEditing").height(this.height);
						$("#imagemDestaquePreviewEditing").width(200);
						$("#imagemDestaquePreviewEditing").height(200);
						ctx.drawImage(image,0,0,this.width, this.height,0,0,canvas.width,canvas.height);

					}
				}
			};

			var scopeImagemDestaqueExists = setInterval(function(){
				if(document.getElementById('imagemDestaquePreviewEditing') && $scope.editar.imagemDestaque){
					clearInterval(scopeImagemDestaqueExists);
					loadImagemDestaque();
				}
			});
		};

		$scope.init();
	}
});