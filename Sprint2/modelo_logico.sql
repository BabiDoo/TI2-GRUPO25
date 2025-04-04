ALUNO(id, nome, email, senha, curso_graduacao_atual)
    PK: id

ORIENTADOR(id, nome, email, senha)
    PK: id

TURMA(id)
    PK: id

PROJETO(id, nome, curso, descricao, numero_vagas, orientador_id)
    PK: id
    FK: ORIENTADOR(id)

TAREFA(id, descricao, data_inicial, data_final, nota, projeto_id)
    PK: id
    FK: PROJETO(id)

CERTIFICADO(id, nome, aluno_id)
    PK: id
    FK: ALUNO(id)

FEEDBACK(id, descricao, orientador_id)
    PK: id
    FK: ORIENTADOR(id)

ALUNO_TURMA(aluno_id, turma_id)
    PK: (aluno_id, turma_id)
    FK: ALUNO(id)
    FK: TURMA(id)

ALUNO_PROJETO_MATRICULA(aluno_id, projeto_id)
    PK: (aluno_id, projeto_id)
    FK: ALUNO(id)
    FK: PROJETO(id)

ALUNO_PROJETO_FAVORITA(aluno_id, projeto_id)
    PK: (aluno_id, projeto_id)
    FK: ALUNO(id)
    FK: PROJETO(id)
