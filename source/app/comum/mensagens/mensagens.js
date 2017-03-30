function getMensagens() {
	var mensagens = [{
		"codigo": 1,
		"tipo": "SUCESSO",
		"descricao": "Inclusão realizada com sucesso."
	}, {
		"codigo": 2,
		"tipo": "SUCESSO",
		"descricao": "Alteração realizada com sucesso."
	}, {
		"codigo": 3,
		"tipo": "ALERTA",
		"descricao": "Confirma a exclusão do registro?"
	}, {
		"codigo": 4,
		"tipo": "SUCESSO",
		"descricao": "Exclusão realizada com sucesso."
	}, {
		"codigo": 5,
		"tipo": "SUCESSO",
		"descricao": "Inativação realizada com sucesso."
	}, {
		"codigo": 6,
		"tipo": "ALERTA",
		"descricao": "Confirma a reativação do registro?"
	}, {
		"codigo": 7,
		"tipo": "SUCESSO",
		"descricao": "Reativação realizada com sucesso."
	}, {
		"codigo": 8,
		"tipo": "ALERTA",
		"descricao": "Não há registro retornado na pesquisa."
	}, {
		"codigo": 9,
		"tipo": "ERRO",
		"descricao": "Registro já cadastrado."
	}, {
		"codigo": 10,
		"tipo": "ERRO",
		"descricao": "Não é possível excluir. Existem dados vinculados a este registro."
	}, {
		"codigo": 11,
		"tipo": "ALERTA",
		"descricao": "Confirma a inativação do registro?"
	}, {
		"codigo": 12,
		"tipo": "SUCESSO",
		"descricao": "Vínculo realizado com sucesso."
	}, {
		"codigo": 13,
		"tipo": "ERRO",
		"descricao": "Vínculo já existente."
	}, {
		"codigo": 14,
		"tipo": "SUCESSO",
		"descricao": "Importação realizada com sucesso."
	}, {
		"codigo": 15,
		"tipo": "ERRO",
		"descricao": "Data Inicial não pode ser maior que a Data Final."
	}, {
		"codigo": 16,
		"tipo": "ERRO",
		"descricao": "Dados indisponíveis no momento. Tente novamente."
	}, {
		"codigo": 17,
		"tipo": "ERRO",
		"descricao": "Não existem cartões cadastrados."
	}, {
		"codigo": 18,
		"tipo": "ALERTA",
		"descricao": "Deseja congelar o Formulário de Pesquisa?"
	}, {
		"codigo": 19,
		"tipo": "SUCESSO",
		"descricao": "Formulário de Pesquisa congelado com sucesso."
	}, {
		"codigo": 20,
		"tipo": "ALERTA",
		"descricao": "Deseja descongelar o Formulário de Pesquisa?"
	}, {
		"codigo": 21,
		"tipo": "SUCESSO",
		"descricao": "Formulário de Pesquisa descongelado com sucesso."
	}, {
		"codigo": 22,
		"tipo": "SUCESSO",
		"descricao": "Configuração realizada com sucesso."
	}, {
		"codigo": 23,
		"tipo": "ERRO",
		"descricao": "Informações incompletas para geração de boleto."
	}, {
		"codigo": 24,
		"tipo": "SUCESSO",
		"descricao": "Recebimento do cartão realizado com sucesso."
	}, {
		"codigo": 25,
		"tipo": "ERRO",
		"descricao": "Inconsistência não informada."
	}, {
		"codigo": 26,
		"tipo": "SUCESSO",
		"descricao": "Operação realizada com sucesso."
	}, {
		"codigo": 27,
		"tipo": "ERRO",
		"descricao": "Identificador não localizado."
	}, {
		"codigo": 28,
		"tipo": "ERRO",
		"descricao": "Situação Recebida Incorreta."
	}, {
		"codigo": 29,
		"tipo": "SUCESSO",
		"descricao": "Notificação enviada com sucesso."
	}, {
		"codigo": 30,
		"tipo": "SUCESSO",
		"descricao": "Demonstrativo atualizado com sucesso."
	}, {
		"codigo": 31,
		"tipo": "ERRO",
		"descricao": "Arquivo Inválido."
	}, {
		"codigo": 32,
		"tipo": "ERRO",
		"descricao": "Tamanho excessivo de arquivo."
	}, {
		"codigo": 33,
		"tipo": "ALERTA",
		"descricao": "Verifique seus dados antes de continuar."
	}, {
		"codigo": 34,
		"tipo": "ERRO",
		"descricao": "O endereço informado está fora da área atendida."
	}, {
		"codigo": 35,
		"tipo": "ERRO",
		"descricao": "Você já possui solicitação em andamento."
	}, {
		"codigo": 36,
		"tipo": "ALERTA",
		"descricao": "Por favor leia e assinale o termo de compromisso."
	}, {
		"codigo": 37,
		"tipo": "ERRO",
		"descricao": "Dados incorretos. Por favor, tente novamente."
	}, {
		"codigo": 38,
		"tipo": "SUCESSO",
		"descricao": "Senha alterada com sucesso."
	}, {
		"codigo": 39,
		"tipo": "ERRO",
		"descricao": "As senhas devem ser iguais. Por favor, tente novamente."
	}, {
		"codigo": 40,
		"tipo": "SUCESSO",
		"descricao": "Adicionado ao quadro de favoritos"
	}, {
		"codigo": 41,
		"tipo": "ERRO",
		"descricao": "Erro na operação. Tente novamente."
	}, {
		"codigo": 42,
		"tipo": "SUCESSO",
		"descricao": "Removido do favoritos."
	}, {
		"codigo": 43,
		"tipo": "ERRO",
		"descricao": "Não existem favoritos cadastrados."
	}, {
		"codigo": 44,
		"tipo": "ERRO",
		"descricao": "Entrada inválida."
	}, {
		"codigo": 45,
		"tipo": "ERRO",
		"descricao": "Parâmetro não cadastrado."
	}, {
		"codigo": 46,
		"tipo": "ERRO",
		"descricao": "Existe(m) palavra(s) proibida(s) no cadastro. Por favor, verifique."
	}, {
		"codigo": 47,
		"tipo": "ERRO",
		"descricao": "É necessário anexar um arquivo para concluir a operação."
	}, {
		"codigo": 48,
		"tipo": "ERRO",
		"descricao": "É necessário justificar o Lançamento."
	}, {
		"codigo": 49,
		"tipo": "SUCESSO",
		"descricao": "Inclusão realizada com sucesso. O Formulário de Pesquisa será encaminhado para aprovação."
	}, {
		"codigo": 50,
		"tipo": "ALERTA",
		"descricao": "Deseja salvar como rascunho? O Formulário de Pesquisa não será enviado para aprovação até que seja finalizado."
	}, {
		"codigo": 51,
		"tipo": "SUCESSO",
		"descricao": "Formulário de Pesquisa salvo como rascunho."
	}, {
		"codigo": 52,
		"tipo": "ALERTA",
		"descricao": "Confirma a aprovação?"
	}, {
		"codigo": 53,
		"tipo": "SUCESSO",
		"descricao": "Aprovação realizada com sucesso."
	}, {
		"codigo": 54,
		"tipo": "ALERTA",
		"descricao": "Confirma a reprovação?"
	}, {
		"codigo": 55,
		"tipo": "SUCESSO",
		"descricao": "Reprovação realizada com sucesso."
	}, {
		"codigo": 56,
		"tipo": "ERRO",
		"descricao": "Não é possível aprovar. A Data Atual é maior que o Período de Vigência. Por favor, altere o Período de Vigência do Formulário de Pesquisa."
	}, {
		"codigo": 57,
		"tipo": "ALERTA",
		"descricao": "Confirma reiniciar a senha?"
	}, {
		"codigo": 58,
		"tipo": "SUCESSO",
		"descricao": "Senha reiniciada com sucesso. Foi enviada uma mensagem para o e-mail cadastrado com as instruções."
	}, {
		"codigo": 59,
		"tipo": "ALERTA",
		"descricao": "Confirma a alteração?"
	}, {
		"codigo": 60,
		"tipo": "SUCESSO",
		"descricao": "Todas as Perguntas devem ser respondidas antes da finalização da Pesquisa."
	}, {
		"codigo": 61,
		"tipo": "SUCESSO",
		"descricao": "Pesquisa finalizada com sucesso. Obrigado(a)!"
	}, {
		"codigo": 62,
		"tipo": "ALERTA",
		"descricao": "Já existe Instituição de Ensino cadastrada com este Número MEC na base da SPTrans."
	}, {
		"codigo": 63,
		"tipo": "ALERTA",
		"descricao": "Já existe Instituição de Ensino cadastrada com este E-mail na base da SPTrans."
	}, {
		"codigo": 64,
		"tipo": "SUCESSO",
		"descricao": "Solicitação realizada com sucesso."
	}, {
		"codigo": 65,
		"tipo": "SUCESSO",
		"descricao": "Dados atualizados com sucesso."
	}, {
		"codigo": 66,
		"tipo": "ERRO",
		"descricao": "Turma já cadastrada para a Instituição de Ensino"
	}, {
		"codigo": 67,
		"tipo": "ALERTA",
		"descricao": "Selecione os dias da semana que a turma terá aulas"
	}, {
		"codigo": 68,
		"tipo": "ALERTA",
		"descricao": "Selecione o período em que a turma terá aulas"
	}, {
		"codigo": 69,
		"tipo": "ERRO",
		"descricao": "Não existem cursos cadastrados"
	}, {
		"codigo": 70,
		"tipo": "ERRO",
		"descricao": "O aluno já está matriculado em uma turma para este período selecionado"
	}, {
		"codigo": 71,
		"tipo": "ERRO",
		"descricao": "O RG {Número RG} já está cadastrado no Sistema"
	}, {
		"codigo": 72,
		"tipo": "ERRO",
		"descricao": "É necessário definir critérios para geração do Relatório."
	}, {
		"codigo": 73,
		"tipo": "ERRO",
		"descricao": "Tipo de Fechamento indisponível neste momento para geração do Relatório desejado."
	}, {
		"codigo": 74,
		"tipo": "ALERTA",
		"descricao": "Contato não pode ser excluído, ele é o Representante Legal da Instituição de Ensino"
	}, {
		"codigo": 75,
		"tipo": "SUCESSO",
		"descricao": "Pré Cadastro Realizado com Sucesso"
	}, {
		"codigo": 76,
		"tipo": "ERRO",
		"descricao": "Filtros obrigatórios para pesquisa não informados."
	}, {
		"codigo": 77,
		"tipo": "ERRO",
		"descricao": "Campo(s) obrigatório(s) não preenchido(s). Verifique."
	}, {
		"codigo": 78,
		"tipo": "ERRO",
		"descricao": "Erro(s) identificado(s) no preenchimento do(s) campo(s). Verifique."
	}, {
		"codigo": 79,
		"tipo": "ERRO",
		"descricao": "Usuário sem permissão de acesso."
	}, {
		"codigo": 80,
		"tipo": "ALERTA",
		"descricao": "É necessário responder todas as Perguntas antes de finalizar a Pesquisa."
	}, {
		"codigo": 81,
		"tipo": "ALERTA",
		"descricao": "Informações já operacionalizadas em bilhetagem eletrônica. Não é possível alterar."
	}, {
		"codigo": 82,
		"tipo": "ALERTA",
		"descricao": "Informações já operacionalizadas em bilhetagem eletrônica. Não é possível excluir."
	}, {
		"codigo": 83,
		"tipo": "ALERTA",
		"descricao": "Registro já com situação de Ativo. Não é possível reativar."
	}, {
		"codigo": 84,
		"tipo": "ALERTA",
		"descricao": "Registro já com situação de Inativo. Não é possível inativar."
	}, {
		"codigo": 85,
		"tipo": "ALERTA",
		"descricao": "Lista de Recarga não gerada. Nenhum registro encontrado."
	}, {
		"codigo": 86,
		"tipo": "ERRO",
		"descricao": "Erro na geração da lista de recarga. Verifique."
	}, {
		"codigo": 87,
		"tipo": "ERRO",
		"descricao": "Falha na comunicação com o serviço."
	}, {
		"codigo": 88,
		"tipo": "ERRO",
		"descricao": "Repositório Compartilhado Inacessível"
	}, {
		"codigo": 89,
		"tipo": "ERRO",
		"descricao": "Erro na extração das informações do arquivo de recargas efetuadas"
	}, {
		"codigo": 90,
		"tipo": "ERRO",
		"descricao": "Erro na validação da assinatura do arquivo."
	}, {
		"codigo": 91,
		"tipo": "ERRO",
		"descricao": "O CNPJ [Número CNPJ] já está cadastrado no Sistema"
	}, {
		"codigo": 92,
		"tipo": "ALERTA",
		"descricao": "Deseja Matricular o Aluno {Nome do Aluno} na Turma {Turma}?"
	}, {
		"codigo": 93,
		"tipo": "ALERTA",
		"descricao": "Deseja excluir o(s) registro(s)?"
	}, {
		"codigo": 94,
		"tipo": "ALERTA",
		"descricao": "Não existe Colaborador da SPTrans com permissão para aprovar o Formulário de Pesquisa."
	}, {
		"codigo": 95,
		"tipo": "ERRO",
		"descricao": "Arquivo de importação não selecionado."
	}, {
		"codigo": 96,
		"tipo": "ERRO",
		"descricao": "Arquivo de importação fora do padrão."
	}, {
		"codigo": 97,
		"tipo": "ALERTA",
		"descricao": "Cadastro do Solicitante não localizado. Deseja cadastrar o Solicitante?"
	}, {
		"codigo": 98,
		"tipo": "ERRO",
		"descricao": "Não há solicitação cadastrada. Deseja cadastrar?"
	}, {
		"codigo": 99,
		"tipo": "ERRO",
		"descricao": "O solicitante consta no SISOBI."
	}, {
		"codigo": 100,
		"tipo": "SUCESSO",
		"descricao": "Solicitação devolvida para o Posto de Atendimento."
	}, {
		"codigo": 101,
		"tipo": "ALERTA",
		"descricao": "Por favor, informe um comentário sobre o estorno da Solicitação."
	}, {
		"codigo": 102,
		"tipo": "ERRO",
		"descricao": "Não há saldo na sua conta corrente.\r\nPor favor, providencie a emissão de uma nova Nota de Empenho para gerar créditos e concluir a sua solicitação."
	}, {
		"codigo": 103,
		"tipo": "ERRO",
		"descricao": "Não há saldo na sua conta corrente.\r\nPor favor, realize um depósito na conta 81-4 da Caixa Econômica Federal e envie o comprovante para gerar\r\ncréditos monetários e concluir sua solicitação"
	}, {
		"codigo": 104,
		"tipo": "ERRO",
		"descricao": "Não há saldo na sua conta corrente.\r\nPor favor, realize um depósito na conta 5019-9 do Banco do Brasil e envie o comprovante para gerar\r\ncréditos monetários e concluir sua solicitação"
	}, {
		"codigo": 105,
		"tipo": "ERRO",
		"descricao": "A idade mínima não pode ser maior que a idade máxima."
	}, {
		"codigo": 106,
		"tipo": "SUCESSO",
		"descricao": "Arquivo enviado com sucesso."
	}, {
		"codigo": 107,
		"tipo": "ERRO",
		"descricao": "Dados insuficientes para a geração da notificação."
	}, {
		"codigo": 108,
		"tipo": "ERRO",
		"descricao": "Não foi possível enviar a notificação."
	}, {
		"codigo": 109,
		"tipo": "ERRO",
		"descricao": "O produto [Nome do Produto] está inativo para esta Patrocinadora."
	}, {
		"codigo": 110,
		"tipo": "ALERTA",
		"descricao": "Nenhuma notificação encontrada para o filtro de pesquisa informado."
	}, {
		"codigo": 111,
		"tipo": "ERRO",
		"descricao": "Erro na visualização dos Detalhes da Notificação."
	}, {
		"codigo": 112,
		"tipo": "ERRO",
		"descricao": "Não foi possível efetuar a leitura do arquivo de validador."
	}, {
		"codigo": 113,
		"tipo": "ERRO",
		"descricao": "Não foi possível efetuar o processamento e gravação dos dados do arquivo de validador."
	}, {
		"codigo": 114,
		"tipo": "ERRO",
		"descricao": "Erro na validação da assinatura do registro."
	}, {
		"codigo": 115,
		"tipo": "ALERTA",
		"descricao": "Deseja renovar a Matrícula do aluno {Nome do Aluno}"
	}, {
		"codigo": 116,
		"tipo": "ERRO",
		"descricao": "Formato do arquivo/registro inválido para a geração da assinatura."
	}, {
		"codigo": 117,
		"tipo": "ERRO",
		"descricao": "Erro na geração da assinatura."
	}, {
		"codigo": 118,
		"tipo": "ERRO",
		"descricao": "Identificação de origem da assinatura inconsistente."
	}, {
		"codigo": 119,
		"tipo": "ERRO",
		"descricao": "A assinatura recebida está fora do padrão."
	}, {
		"codigo": 120,
		"tipo": "ERRO",
		"descricao": "Não foi possível assinar o arquivo/registro."
	}, {
		"codigo": 121,
		"tipo": "ERRO",
		"descricao": "Formato do arquivo/registro inválido para a obtenção da assinatura."
	}, {
		"codigo": 122,
		"tipo": "ALERTA",
		"descricao": "Deseja renovar a Matrícula dos alunos selecionados?"
	}, {
		"codigo": 123,
		"tipo": "SUCESSO",
		"descricao": "Matrícula(s) Renovadas com Sucesso!"
	}, {
		"codigo": 124,
		"tipo": "ERRO",
		"descricao": "Erro na obtenção da assinatura."
	}, {
		"codigo": 125,
		"tipo": "ERRO",
		"descricao": "Erro na consulta dos detalhes solicitados."
	}, {
		"codigo": 126,
		"tipo": "ERRO",
		"descricao": "Nenhum créditos de recarga localizado."
	}, {
		"codigo": 127,
		"tipo": "ERRO",
		"descricao": "Não foi possível disponibilizar o arquivo no EDI."
	}, {
		"codigo": 128,
		"tipo": "ERRO",
		"descricao": "Erro na geração do arquivo de validador."
	}, {
		"codigo": 129,
		"tipo": "ERRO",
		"descricao": "Erro ao renomear o arquivo de validador."
	}, {
		"codigo": 130,
		"tipo": "ERRO",
		"descricao": "Erro na binarização do arquivo de validador."
	}, {
		"codigo": 131,
		"tipo": "ERRO",
		"descricao": "Erro na validação do arquivo de validador"
	}, {
		"codigo": 132,
		"tipo": "ALERTA",
		"descricao": "Não há novas configurações para o arquivo de validador."
	}, {
		"codigo": 133,
		"tipo": "ALERTA",
		"descricao": "Envio do arquivo de validador cancelado."
	}, {
		"codigo": 134,
		"tipo": "ERRO",
		"descricao": "Dados inconsistentes para registro do log de arquivo de validador."
	}, {
		"codigo": 135,
		"tipo": "ALERTA",
		"descricao": "Arquivo(s) recepcionado(s) com sucesso."
	}, {
		"codigo": 136,
		"tipo": "ERRO",
		"descricao": "Não é possível solicitar o produto. Laudo médico é obrigatório."
	}, {
		"codigo": 137,
		"tipo": "ERRO",
		"descricao": "Erro na validação da lista de recargas."
	}, {
		"codigo": 138,
		"tipo": "ERRO",
		"descricao": "Nome ou extensão do arquivo inválidos."
	}, {
		"codigo": 139,
		"tipo": "ALERTA",
		"descricao": "Confirma a operação?"
	}, {
		"codigo": 140,
		"tipo": "ERRO",
		"descricao": "Auditoria Médica já foi impressa e não pode ser alterada."
	}, {
		"codigo": 141,
		"tipo": "ERRO",
		"descricao": "Auditoria Médica foi cadastrada pelo [Nome do Ator que cadastrou a Auditoria Médica]. Não é possível alterar a Auditoria Médica."
	}, {
		"codigo": 142,
		"tipo": "ALERTA",
		"descricao": "Confirma beneficio permanente?"
	}, {
		"codigo": 143,
		"tipo": "ERRO",
		"descricao": "Estabelecimento de Saúde inativo. Não é possível acessar."
	}, {
		"codigo": 144,
		"tipo": "ERRO",
		"descricao": "Usuário de acesso excluído ou inativo. Não é possível acessar."
	}, {
		"codigo": 145,
		"tipo": "SUCESSO",
		"descricao": "Pedido de cancelamento registrado."
	}, {
		"codigo": 146,
		"tipo": "ERRO",
		"descricao": "Motivo não cadastrado."
	}, {
		"codigo": 147,
		"tipo": "ERRO",
		"descricao": "Detalhamento do Motivo não cadastrado."
	}, {
		"codigo": 148,
		"tipo": "SUCESSO",
		"descricao": "Relatório Médico [Número do Selo Virtual] gerado com sucesso."
	}, {
		"codigo": 149,
		"tipo": "ALERTA",
		"descricao": "Já existe o Relatório Médico [Número do Selo Virtual] gerado. Deseja gerar um novo Relatório Médico? \r\nAlerta: O Relatório Médico [Número do Selo Virtual] será cancelado."
	}, {
		"codigo": 150,
		"tipo": "SUCESSO",
		"descricao": "Relatório Médico [Número do Selo Virtual] preenchido com sucesso."
	}, {
		"codigo": 151,
		"tipo": "ALERTA",
		"descricao": "Relatório Médico [Número do Selo Virtual] dentro do período de validade."
	}, {
		"codigo": 152,
		"tipo": "ERRO",
		"descricao": "Não é possível gerar um novo Relatório Médico. O Relatório Médico [Número do Selo Virtual] está em avaliação pela SPTrans."
	}, {
		"codigo": 153,
		"tipo": "ERRO",
		"descricao": "Atenção: Relatório Médico [Número Selo Virtual] fora do período de validade. A data de assinatura do Relatório Médico tem prazo máximo de [quantidade de dias parametrizado] dias para recebimento."
	}, {
		"codigo": 154,
		"tipo": "ALERTA",
		"descricao": "Não há parametrização cadastrada."
	}, {
		"codigo": 155,
		"tipo": "ERRO",
		"descricao": "Para solicitar o benefício é necessário ter [idade parametrizada] anos de idade."
	}, {
		"codigo": 156,
		"tipo": "ERRO",
		"descricao": "Para concluir a solicitação, é necessário enviar sua foto."
	}, {
		"codigo": 157,
		"tipo": "ERRO",
		"descricao": "Sua foto foi reprovada. Para fazer a solicitação, é necessário enviar nova foto."
	}, {
		"codigo": 158,
		"tipo": "ERRO",
		"descricao": "Para concluir a solicitação, é necessário enviar o documento solicitado."
	}, {
		"codigo": 159,
		"tipo": "SUCESSO",
		"descricao": "Atendimento cadastrado com sucesso."
	}, {
		"codigo": 160,
		"tipo": "ERRO",
		"descricao": "Já existe um atendimento agendado para este serviço."
	}, {
		"codigo": 161,
		"tipo": "ERRO",
		"descricao": "Erro interno. E-mail não enviado."
	}, {
		"codigo": 162,
		"tipo": "ERRO",
		"descricao": "Erro interno. SMS não enviado."
	}, {
		"codigo": 163,
		"tipo": "ERRO",
		"descricao": "Não há atendimento cadastrado"
	}, {
		"codigo": 164,
		"tipo": "ALERTA",
		"descricao": "Existe atendimento pendente de finalização."
	}, {
		"codigo": 165,
		"tipo": "ERRO",
		"descricao": "Por favor, atualize os dados básicos do cidadão."
	}, {
		"codigo": 166,
		"tipo": "SUCESSO",
		"descricao": "Solicitação do Benefício PCD cadastrada com sucesso. Número do Selo Virtual: [Número Selo virtual]."
	}, {
		"codigo": 167,
		"tipo": "ALERTA",
		"descricao": "Já existe solicitação cadastrada. Por favor, aguarde a análise da SPTrans."
	}, {
		"codigo": 168,
		"tipo": "ERRO",
		"descricao": "Não é possível solicitar o Benefício PCD. O endereço do Solicitante está fora da região de abrangência para o benefício."
	}, {
		"codigo": 169,
		"tipo": "ALERTA",
		"descricao": "Confirma a exclusão do vínculo deste Acompanhante?"
	}, {
		"codigo": 170,
		"tipo": "SUCESSO",
		"descricao": "Acompanhante desvinculado com sucesso."
	}, {
		"codigo": 171,
		"tipo": "ERRO",
		"descricao": "Não existem Acompanhantes vinculados."
	}, {
		"codigo": 172,
		"tipo": "ERRO",
		"descricao": "Não é possível alterar os modais para o mês atual"
	}, {
		"codigo": 173,
		"tipo": "SUCESSO",
		"descricao": "E-mail enviado com sucesso."
	}, {
		"codigo": 174,
		"tipo": "ERRO",
		"descricao": "Resposta em branco. Não é possível enviar."
	}, {
		"codigo": 175,
		"tipo": "ERRO",
		"descricao": "Mensagem já selecionada para resposta. Não é possível responde-la."
	}, {
		"codigo": 176,
		"tipo": "ERRO",
		"descricao": "Não é possível aprovar solicitação. O Solicitante possui benefício PCD com acompanhante."
	}, {
		"codigo": 177,
		"tipo": "ERRO",
		"descricao": "Solicitação não localizada."
	}, {
		"codigo": 178,
		"tipo": "ERRO",
		"descricao": "É necessário definir um Canal de Comercialização"
	}, {
		"codigo": 179,
		"tipo": "ERRO",
		"descricao": "É necessário definir uma data para o lançamento"
	}, {
		"codigo": 180,
		"tipo": "ERRO",
		"descricao": "É necessário definir o valor do lançamento"
	}, {
		"codigo": 181,
		"tipo": "ERRO",
		"descricao": "É necessário definir a competência a qual o lançamento pertencerá."
	}, {
		"codigo": 182,
		"tipo": "ERRO",
		"descricao": "Já existe cadastro de malote para a data informada."
	}, {
		"codigo": 183,
		"tipo": "ALERTA",
		"descricao": "Confirma os dados do Aluno, da Instituição de Ensino e do Pagamento da Taxa de Solicitação?"
	}, {
		"codigo": 184,
		"tipo": "ERRO",
		"descricao": "Seu benefício PCD não permite vínculo de Acompanhante."
	}, {
		"codigo": 185,
		"tipo": "ERRO",
		"descricao": "Cidadão não encontrado. Verifique os dados realize a busca novamente."
	}, {
		"codigo": 186,
		"tipo": "ERRO",
		"descricao": "Cidadão já vinculado como Acompanhante."
	}, {
		"codigo": 187,
		"tipo": "ERRO",
		"descricao": "Limite de Acompanhantes atingido. Para vincular um novo Acompanhante, favor excluir um dos Acompanhantes já vinculados."
	}, {
		"codigo": 188,
		"tipo": "ERRO",
		"descricao": "É necessário registrar um comentário para concluir o lançamento"
	}, {
		"codigo": 189,
		"tipo": "ALERTA",
		"descricao": "Na próxima tentativa incorreta, seu acesso será bloqueado."
	}, {
		"codigo": 190,
		"tipo": "ALERTA",
		"descricao": "Seu acesso foi bloqueado. Por favor, comparecer a um posto de atendimento para desbloqueio do acesso e cadastro de nova senha."
	}, {
		"codigo": 191,
		"tipo": "SUCESSO",
		"descricao": "Pagamento da Taxa de Solicitação de Estudante confirmado."
	}, {
		"codigo": 192,
		"tipo": "ALERTA",
		"descricao": "Deseja Excluir o programa {Programa}?"
	}, {
		"codigo": 193,
		"tipo": "ALERTA",
		"descricao": "Não é possível excluir programa {Programa}, Existem Taxas de Solicitação vinculadas a este programa"
	}, {
		"codigo": 194,
		"tipo": "ALERTA",
		"descricao": "Tem certeza que deseja enviar alerta de Revalidação de Cadastro anual na data de {Data da Revalidação}"
	}, {
		"codigo": 195,
		"tipo": "ERRO",
		"descricao": "Nenhum meio de envio da Notificação foi selecionado, selecione um dos meios disponíveis"
	}, {
		"codigo": 196,
		"tipo": "ERRO",
		"descricao": "Não é possível enviar o alerta, nenhuma mensagem foi definida"
	}, {
		"codigo": 197,
		"tipo": "ERRO",
		"descricao": "Data de envio da Notificação não foi selecionada"
	}, {
		"codigo": 198,
		"tipo": "ERRO",
		"descricao": "É necessário definir um período para prosseguir"
	}, {
		"codigo": 199,
		"tipo": "ALERTA",
		"descricao": "Não é possível aprovar solicitação. Dados cadastrais do solicitante foram reprovados na Receita Federal."
	}, {
		"codigo": 200,
		"tipo": "ALERTA",
		"descricao": "Não é possível aprovar solicitação. Dados cadastrais do solicitante pendentes de aprovação na Receita Federal."
	}, {
		"codigo": 201,
		"tipo": "ALERTA",
		"descricao": "Solicitante não possui foto aprovada."
	}, {
		"codigo": 202,
		"tipo": "ALERTA",
		"descricao": "Não é possível aprovar solicitação. Solicitação possui documentos não aprovados."
	}, {
		"codigo": 203,
		"tipo": "ALERTA",
		"descricao": "Não é possível aprovar solicitação. Solicitante consta no SISOBI."
	}, {
		"codigo": 204,
		"tipo": "ALERTA",
		"descricao": "Cadastro não localizado. Deseja cadastrar o Solicitante?"
	}, {
		"codigo": 205,
		"tipo": "ERRO",
		"descricao": "Já existe solicitação cadastrada. Por favor, aguarde a análise da SPTrans."
	}, {
		"codigo": 206,
		"tipo": "ERRO",
		"descricao": "Não é possível solicitar o Benefício PCD. O endereço do Solicitante está fora da região de abrangência para o benefício."
	}, {
		"codigo": 207,
		"tipo": "SUCESSO",
		"descricao": "Recebimento da Solicitação realizada com sucesso."
	}, {
		"codigo": 208,
		"tipo": "SUCESSO",
		"descricao": "Documentos Complementares recebidos com sucesso."
	}, {
		"codigo": 209,
		"tipo": "SUCESSO",
		"descricao": "Recebimento da Solicitação realizada com sucesso."
	}, {
		"codigo": 210,
		"tipo": "SUCESSO",
		"descricao": "Solicitação devolvida para o Posto de Atendimento."
	}, {
		"codigo": 211,
		"tipo": "SUCESSO",
		"descricao": "Solicitação encaminhada para Auditoria Médica."
	}, {
		"codigo": 212,
		"tipo": "ALERTA",
		"descricao": "Atenção: A CID [Código CID] oferece direito à acompanhante. Favor avaliar."
	}, {
		"codigo": 213,
		"tipo": "ERRO",
		"descricao": "Atenção: A CID [Código CID] só pode estar vinculada caso o Solicitante possua até [idade parametrizada na CID] anos."
	}, {
		"codigo": 214,
		"tipo": "ERRO",
		"descricao": "Você não possui permissão para analisar a Solicitação do Benefício PCD. O Médico está na lista de conferência."
	}, {
		"codigo": 215,
		"tipo": "ALERTA",
		"descricao": "Não é possível aprovar a Solicitação do Benefício PCD. O solicitante será cadastrado no Benefício Idoso. Clique aqui para confirmar."
	}, {
		"codigo": 216,
		"tipo": "SUCESSO",
		"descricao": "Solicitação indeferida com sucesso."
	}, {
		"codigo": 217,
		"tipo": "SUCESSO",
		"descricao": "Estorno realizado com sucesso."
	}, {
		"codigo": 218,
		"tipo": "ALERTA",
		"descricao": "Deseja emitir uma nova Solicitação do Benefício PCD?"
	}, {
		"codigo": 219,
		"tipo": "SUCESSO",
		"descricao": "Solicitação do Benefício PCD cancelada com sucesso."
	}, {
		"codigo": 220,
		"tipo": "SUCESSO",
		"descricao": "Parabéns, cadastro realizado com sucesso!"
	}, {
		"codigo": 221,
		"tipo": "ERRO",
		"descricao": "Não há cartão ativo disponível."
	}, {
		"codigo": 222,
		"tipo": "ALERTA",
		"descricao": "Para aprovar solicitação, é necessário que todos os documentos estejam marcados como conferidos."
	}, {
		"codigo": 223,
		"tipo": "ALERTA",
		"descricao": "O cartão informado já se encontra vinculado a outro usuário. Favor entrar em contato com um posto exclusivo do cartão Fidelidade e Lazer do Metrô e/ou CPTM."
	}, {
		"codigo": 224,
		"tipo": "ALERTA",
		"descricao": "Preencha corretamente o campo número do cartão."
	}, {
		"codigo": 225,
		"tipo": "ALERTA",
		"descricao": "Foram encontradas divergências no cadastro. Deseja continuar?"
	}, {
		"codigo": 226,
		"tipo": "ALERTA",
		"descricao": "A SPTrans irá analisar o seu cadastro e caso seja aprovado, você receberá o Benefício Idoso."
	}, {
		"codigo": 227,
		"tipo": "ALERTA",
		"descricao": "Cadastro realizado com sucesso! Gostaria de solicitar gratuitamente o Bilhe Único?"
	}, {
		"codigo": 228,
		"tipo": "ERRO",
		"descricao": "Usuário já possui o Bilhete Único."
	}, {
		"codigo": 229,
		"tipo": "ERRO",
		"descricao": "Cidadão já cadastrado no Portal do SBE."
	}, {
		"codigo": 230,
		"tipo": "ERRO",
		"descricao": "Chave de Acesso (CPF e Documento) já cadastrada no Portal."
	}, {
		"codigo": 231,
		"tipo": "ERRO",
		"descricao": "Número do Documento já cadastrado."
	}, {
		"codigo": 232,
		"tipo": "SUCESSO",
		"descricao": "Foi enviada uma mensagem de confirmação para o seu e-mail."
	}, {
		"codigo": 233,
		"tipo": "ERRO",
		"descricao": "Data da emissão do documento de identificação inválida."
	}, {
		"codigo": 234,
		"tipo": "ERRO",
		"descricao": "Informe ao menos um telefone de contato."
	}, {
		"codigo": 235,
		"tipo": "ALERTA",
		"descricao": "Você informou seu Nome igual ao Nome da filiação. Deseja prosseguir?"
	}, {
		"codigo": 236,
		"tipo": "ERRO",
		"descricao": "Você informou o Nome da filiação de forma incorreta. Por favor verifique!"
	}, {
		"codigo": 237,
		"tipo": "ERRO",
		"descricao": "Data de nascimento inválida."
	}, {
		"codigo": 238,
		"tipo": "ERRO",
		"descricao": "Número de Documento já cadastrado no Portal."
	}, {
		"codigo": 239,
		"tipo": "ALERTA",
		"descricao": "Selecione o local para recebimento do cartão."
	}, {
		"codigo": 240,
		"tipo": "ALERTA",
		"descricao": "Informe ao menos um telefone de contato."
	}, {
		"codigo": 241,
		"tipo": "ALERTA",
		"descricao": "Número do endereço residencial inválido."
	}, {
		"codigo": 242,
		"tipo": "SUCESSO",
		"descricao": "E-mail confirmado com sucesso."
	}, {
		"codigo": 243,
		"tipo": "SUCESSO",
		"descricao": "Foi enviada uma mensagem de confirmação para o e-mai do Cidadão."
	}, {
		"codigo": 244,
		"tipo": "ALERTA",
		"descricao": "E-Mail já confirmado."
	}, {
		"codigo": 245,
		"tipo": "ALERTA",
		"descricao": "Dados Não Informados ou Inválidos. Verifique!"
	}, {
		"codigo": 246,
		"tipo": "ERRO",
		"descricao": "Aluno ja matriculado na Turma"
	}, {
		"codigo": 247,
		"tipo": "ERRO",
		"descricao": "Selecione o período em que a turma terá aulas."
	}, {
		"codigo": 248,
		"tipo": "ERRO",
		"descricao": "Turma já cadastrada para a Unidade de Ensino."
	}, {
		"codigo": 249,
		"tipo": "ALERTA",
		"descricao": "O(s) cadastro(s) referente(s) ao(s) arquivo(s) [nome do arquivo] já possui(em) foto(s). Deseja substituir?"
	}, {
		"codigo": 250,
		"tipo": "ERRO",
		"descricao": "Ocorreu um erro na importação. Acesse o diretório de fotos para mais informações."
	}, {
		"codigo": 251,
		"tipo": "ERRO",
		"descricao": "Sistema não possui permissão para criar ou gravar no diretório selecionado."
	}, {
		"codigo": 252,
		"tipo": "ERRO",
		"descricao": "Diretório não possui arquivos."
	}, {
		"codigo": 253,
		"tipo": "ERRO",
		"descricao": "Erro na importação do arquivo. Verifique o layout e importe novamente."
	}, {
		"codigo": 254,
		"tipo": "SUCESSO",
		"descricao": "Validação realizada com sucesso!"
	}, {
		"codigo": 255,
		"tipo": "ALERTA",
		"descricao": "O benefício estudante está habilitado (Ativo para o Ano Letivo Corrente).”"
	}, {
		"codigo": 256,
		"tipo": "ALERTA",
		"descricao": "O número do cartão: {Número do Cartão}”"
	}, {
		"codigo": 257,
		"tipo": "ALERTA",
		"descricao": "Tipo de Benefício: Sem Gratuidade. A Gratuidade não foi concedida"
	}, {
		"codigo": 258,
		"tipo": "ALERTA",
		"descricao": "Confirma os dados e Solicita o Benefício Estudante?"
	}, {
		"codigo": 259,
		"tipo": "ERRO",
		"descricao": "Não é possível solicitar o Benefício Estudante. Não há matrícula ativa em seu nome. Entre em contato com a Instituição de Ensino para solicitar seu Benefício Estudante"
	}, {
		"codigo": 260,
		"tipo": "ALERTA",
		"descricao": "Solicitação de Estudante cancelada"
	}, {
		"codigo": 261,
		"tipo": "ALERTA",
		"descricao": "Confirma os dados referentes à Baixa Renda?"
	}, {
		"codigo": 262,
		"tipo": "ALERTA",
		"descricao": "Não é possível excluir o Nível do Curso, existem cursos ativos para o Nível de Curso selecionado"
	}, {
		"codigo": 263,
		"tipo": "ERRO",
		"descricao": "Não é possível Excluir a Tarifa, é necessária uma Tarifa vigente para essa modalidade.”"
	}, {
		"codigo": 264,
		"tipo": "ERRO",
		"descricao": "Nenhum comprovante disponível nesta data"
	}, {
		"codigo": 265,
		"tipo": "SUCESSO",
		"descricao": "Alteração da Compra de Cotas Realizada com Sucesso"
	}, {
		"codigo": 266,
		"tipo": "ALERTA",
		"descricao": "Confirma a alteração dos dados de Programação de Compra de Cotas?"
	}, {
		"codigo": 267,
		"tipo": "ALERTA",
		"descricao": "Confirma a Alteração de Modais do GIS?"
	}, {
		"codigo": 268,
		"tipo": "ALERTA",
		"descricao": "Confirma a Alteração de Cotas?"
	}, {
		"codigo": 269,
		"tipo": "ALERTA",
		"descricao": "Confirma o Cancelamento da Matrícula do Aluno {Nome do Aluno}?"
	}, {
		"codigo": 270,
		"tipo": "ALERTA",
		"descricao": "Confirma a Renovação da Matrícula do Aluno {Nome do Aluno}?"
	}, {
		"codigo": 271,
		"tipo": "SUCESSO",
		"descricao": "Renovação do(s) Aluno(s) realizada com Sucesso"
	}, {
		"codigo": 272,
		"tipo": "ALERTA",
		"descricao": "Deseja Renovar a Turma? ( Verifique se todos os alunos que serão removidos da turma não estão selecionados)"
	}, {
		"codigo": 273,
		"tipo": "SUCESSO",
		"descricao": "Renovação da Turma realizada com Sucesso"
	}, {
		"codigo": 274,
		"tipo": "ALERTA",
		"descricao": "Confirma a reprovação da Instituição de Ensino"
	}, {
		"codigo": 275,
		"tipo": "SUCESSO",
		"descricao": "Curso(s) Vinculado(s) com Sucesso!"
	}, {
		"codigo": 276,
		"tipo": "ERRO",
		"descricao": "Os E-mails devem ser iguais. Por favor, tente novamente."
	}, {
		"codigo": 277,
		"tipo": "SUCESSO",
		"descricao": "Documento(s) enviado(s) com sucesso."
	}, {
		"codigo": 278,
		"tipo": "ERRO",
		"descricao": "Não é possível cadastrar a solicitação. Seu cadastro está em análise pela SPTrans."
	}, {
		"codigo": 279,
		"tipo": "ERRO",
		"descricao": "Não é possível cadastrar a solicitação, seu cadastro foi reprovado. Por favor, verifique suas pendências."
	}, {
		"codigo": 280,
		"tipo": "ALERTA",
		"descricao": "Deseja desvincular o curso {Nome do Curso} da Instituição de Ensino?"
	}, {
		"codigo": 281,
		"tipo": "SUCESSO",
		"descricao": "O curso {Nome do Curso} foi desvinculado da Instituição de Ensino."
	}, {
		"codigo": 282,
		"tipo": "ERRO",
		"descricao": "Não é possível desvincular o curso da Instituição de Ensino."
	}, {
		"codigo": 283,
		"tipo": "ERRO",
		"descricao": "Imagem Expurgada."
	}, {
		"codigo": 284,
		"tipo": "ERRO",
		"descricao": "Você informou Nome do Cidadão igual ao Nome da filiação. Por favor, verifique."
	}, {
		"codigo": 285,
		"tipo": "SUCESSO",
		"descricao": "Nova senha gerada com sucesso."
	}, {
		"codigo": 286,
		"tipo": "SUCESSO",
		"descricao": "Foi realizada uma Solicitação para o Benefício Idoso. A solicitação está pendente de análise e aprovação pela SPTrans."
	}, {
		"codigo": 287,
		"tipo": "ALERTA",
		"descricao": "Confirma geração da ocorrência?"
	}, {
		"codigo": 288,
		"tipo": "SUCESSO",
		"descricao": "Ocorrência registrada."
	}, {
		"codigo": 289,
		"tipo": "SUCESSO",
		"descricao": "Ocorrência enviada para análise."
	}, {
		"codigo": 290,
		"tipo": "ERRO",
		"descricao": "Não existem ocorrências registradas."
	}, {
		"codigo": 291,
		"tipo": "ALERTA",
		"descricao": "Cartão não possui vínculo com cidadão. Não será possivel gerar alguns tipos de ocorrência. Deseja vincular?"
	}, {
		"codigo": 292,
		"tipo": "ERRO",
		"descricao": "Este cartão não pode ser vinculado a um cidadão."
	}, {
		"codigo": 293,
		"tipo": "ALERTA",
		"descricao": "A suspensão ainda não atingiu a data de desbloqueio definida. Deseja continuar?"
	}, {
		"codigo": 294,
		"tipo": "ALERTA",
		"descricao": "Confirma solicitação?"
	}, {
		"codigo": 295,
		"tipo": "ERRO",
		"descricao": "Saldo de recargas pendentes inferior ao valor das taxas. Por favor, selecione outra forma de pagamento."
	}, {
		"codigo": 296,
		"tipo": "ALERTA",
		"descricao": "Cidadão: para desbloquear o produto, é necessário solicitar uma renovação no Portal SBE ou nos Postos de Atendimento da SPTrans."
	}, {
		"codigo": 297,
		"tipo": "ERRO",
		"descricao": "O registro foi excluído por outro usuário."
	}, {
		"codigo": 298,
		"tipo": "SUCESSO",
		"descricao": "Arquivo processado pela SPTrans. Consulte os logs de sucesso e erro."
	}, {
		"codigo": 299,
		"tipo": "ERRO",
		"descricao": "A justificativa deve conter no mínimo três palavras."
	}, {
		"codigo": 300,
		"tipo": "ERRO",
		"descricao": "Quantidade de cartões inválida."
	}, {
		"codigo": 301,
		"tipo": "ERRO",
		"descricao": "O processo falhou. Insira um cartão."
	}, {
		"codigo": 302,
		"tipo": "ERRO",
		"descricao": "Já existe uma chave mestra gravada nesse cartão. Insira um cartão."
	}, {
		"codigo": 303,
		"tipo": "ERRO",
		"descricao": "Cidadão já vinculado como Empregado."
	}, {
		"codigo": 304,
		"tipo": "SUCESSO",
		"descricao": "Chave Mestra gerada e gravada com sucesso."
	}, {
		"codigo": 305,
		"tipo": "ALERTA",
		"descricao": "Devolução solicitada maior do que valor total disponível. Para prosseguir, preencha a justificativa."
	}, {
		"codigo": 306,
		"tipo": "ERRO",
		"descricao": "Usuário sem permissão de solicitação de devolução maior do que total disponível."
	}, {
		"codigo": 307,
		"tipo": "ALERTA",
		"descricao": "Tempo esgotado. Insira um cartão."
	}, {
		"codigo": 308,
		"tipo": "ERRO",
		"descricao": "Credenciada inexistente."
	}, {
		"codigo": 309,
		"tipo": "ERRO",
		"descricao": "Tipo do Estabelecimento inexistente."
	}, {
		"codigo": 310,
		"tipo": "ERRO",
		"descricao": "CEP inexistente."
	}, {
		"codigo": 311,
		"tipo": "ERRO",
		"descricao": "Sem autorização para enviar arquivos desta Credenciada."
	}, {
		"codigo": 312,
		"tipo": "ALERTA",
		"descricao": "Obs: O total disponível pode sofrer alteração após conciliação de valores.\r\nEm caso de divergência, será realizada devolução com maior valor disponível."
	}, {
		"codigo": 313,
		"tipo": "ERRO",
		"descricao": "Tipo de Recarga não autorizada para a Credenciada."
	}, {
		"codigo": 314,
		"tipo": "ERRO",
		"descricao": "Ponto de Venda de Crédito já cadastrado para esta Credenciada."
	}, {
		"codigo": 315,
		"tipo": "ERRO",
		"descricao": "Ponto de Venda de Crédito já cadastrado neste endereço para esta Credenciada."
	}, {
		"codigo": 316,
		"tipo": "ERRO",
		"descricao": "Ponto de Venda de Crédito não localizado para o endereço informado."
	}, {
		"codigo": 317,
		"tipo": "ERRO",
		"descricao": "Tipo do Ponto de Venda inexistente."
	}, {
		"codigo": 318,
		"tipo": "ERRO",
		"descricao": "Forma de Atendimento inexistente."
	}, {
		"codigo": 319,
		"tipo": "ERRO",
		"descricao": "Ponto de Venda de Crédito inexistente."
	}, {
		"codigo": 320,
		"tipo": "ERRO",
		"descricao": "Região não localizada para este CEP. Contate a SPTrans."
	}, {
		"codigo": 321,
		"tipo": "",
		"descricao": "CEP não atendido pela SPTrans."
	}, {
		"codigo": 322,
		"tipo": "ALERTA",
		"descricao": "Confirma a suspensão da série de créditos [número da série]?"
	}, {
		"codigo": 323,
		"tipo": "SUCESSO",
		"descricao": "Suspensão da série de créditos realizada com sucesso."
	}, {
		"codigo": 324,
		"tipo": "ALERTA",
		"descricao": "Confirma o cancelamento da série créditos [número da série]?"
	}, {
		"codigo": 325,
		"tipo": "SUCESSO",
		"descricao": "Cancelamento da série de créditos realizada com sucesso."
	}, {
		"codigo": 326,
		"tipo": "ERRO",
		"descricao": "Não existem Empregados vinculados."
	}, {
		"codigo": 327,
		"tipo": "ERRO",
		"descricao": "Erro na geração de arquivo."
	}, {
		"codigo": 328,
		"tipo": "ALERTA",
		"descricao": "Verifique se todas as informações estão corretas, pois NÃO sera possível alterar-las após confirmar inclusão."
	}, {
		"codigo": 329,
		"tipo": "ALERTA",
		"descricao": "Formulário enviado para impressão"
	}, {
		"codigo": 330,
		"tipo": "ALERTA",
		"descricao": "Confirma a exclusão do vínculo deste Empregado?"
	}, {
		"codigo": 331,
		"tipo": "SUCESSO",
		"descricao": "Empregado desvinculado com sucesso."
	}, {
		"codigo": 332,
		"tipo": "ERRO",
		"descricao": "Empregado não localizado."
	}, {
		"codigo": 333,
		"tipo": "ERRO",
		"descricao": "Empregado não vinculado ao Adquirente."
	}, {
		"codigo": 334,
		"tipo": "SUCESSO",
		"descricao": "Empregado desvinculado do Adquirente"
	}, {
		"codigo": 335,
		"tipo": "ALERTA",
		"descricao": "Não há registro localizado para realizar esta ação."
	}, {
		"codigo": 336,
		"tipo": "ALERTA",
		"descricao": "Confirma a exclusão do Empregado da lista?"
	}, {
		"codigo": 337,
		"tipo": "ERRO",
		"descricao": "O Adquirente deve possuir a idade mínima de 16 anos."
	}, {
		"codigo": 338,
		"tipo": "ERRO",
		"descricao": "Credenciada inativa. Não é possível acessar."
	}, {
		"codigo": 339,
		"tipo": "ERRO",
		"descricao": "Usuário de acesso já cadastrado."
	}, {
		"codigo": 340,
		"tipo": "ERRO",
		"descricao": "Unidade de Ensino inativo. Não é possível acessar."
	}, {
		"codigo": 341,
		"tipo": "SUCESSO",
		"descricao": "Aprovação do Pré-cadastro realizado com sucesso"
	}, {
		"codigo": 342,
		"tipo": "SUCESSO",
		"descricao": "Reprovação do Pré-cadastro realizado com sucesso"
	}, {
		"codigo": 343,
		"tipo": "ERRO",
		"descricao": "Sequencial inicial não pode ser maior que sequencial final"
	}, {
		"codigo": 344,
		"tipo": "ERRO",
		"descricao": "Crédito não disponibilizado."
	}, {
		"codigo": 345,
		"tipo": "ERRO",
		"descricao": "Crédito não gerado."
	}, {
		"codigo": 346,
		"tipo": "ERRO",
		"descricao": "Crédito não estornado."
	}, {
		"codigo": 347,
		"tipo": "ERRO",
		"descricao": "Informe ao menos quatro produtos."
	}, {
		"codigo": 348,
		"tipo": "ALERTA",
		"descricao": "O processo de aprovação ou reprovação da Unidade de Ensino deverá  ser reiniciado após  as alterações serem concluidas."
	}, {
		"codigo": 349,
		"tipo": "SUCESSO",
		"descricao": "Análise Manual Finalizada."
	}, {
		"codigo": 350,
		"tipo": "",
		"descricao": ""
	}, {
		"codigo": 367,
		"tipo": "ERRO",
		"descricao": "O nome deve possuir pelo menos uma letra ou um número."
	}, {
		"codigo": 374,
		"tipo": "ERRO",
		"descricao": "A Sigla deve possuir pelo menos 2 caracteres, sendo letras e/ou números os 2 iniciais. Os demais caracteres podem ser especiais."
	}];
	return mensagens;
};