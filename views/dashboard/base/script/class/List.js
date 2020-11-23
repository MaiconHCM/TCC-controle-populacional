class List {
  constructor(url) {
    this.requestURL = url
  }
  entidy = {}
  // Função do filtro.
  filter() {

    // Define o status como "atualizando"
    this.statusInfo();

    // Define variaveis parametros para pesquisa
    let params = {};

    // Obtem name do campo de pesquisa.
    let name = $('input[name=search]').val();
    if (name) {
      params.name = name;
    }

    // Criação da referência.
    // Utilizado para chamar funções dessa classe em outro escopo.
    let ref = this;

    // Realiza um POST em JQuery para filtro da coleção escolhida
    // O primeiro parâmetro passado é URL da página + filter
    // A segundo parâmetro é o são parametros da busca
    // O terceiro é callback da função, recebendo a resposta.
    $.post(this.requestURL + "filter", params, function (response) {

      // Após o retorno é feito verificação do status
      if (response.status === 'success') {
        // Caso Sucesso, chama função "list" com os dados
        ref.list(response.data);
        // Coloca o status como sucesso.
        ref.statusInfo('success');
      } else {
        // Coloca o status como Erro.
        ref.statusInfo('error');
      }
    }).fail(function (response) {
      // Coloca o status como Erro.
      ref.statusInfo('error');
    });
  }

  // Função de listagem
  list(data) {
    // Define várivel responsavel por criar os elementos html
    let html = '';

    // Realizar um FOR na listagem
    for (const prop in data) {

      // Define item em uma constante para facilitar o entendimento
      const item = data[prop];

      // Salva item em uma variável baseando no id na classe.
      // Essa váriavel será utilizada futuramente para recuperação de informações
      this.entity[item._id] = item

      // Incremeta uma string em sintaxe HTML, essa que representa uma linha da tabela
      html +=
        '<tr>' +
        '<td>' + item.name + '</td>' +
        '<td class="text-right">' +
        '<a href="/app/#/especies/form?id=' + item._id + '" ' +
        'class="btn btn-primary btn-link btn-sm">' +
        '<i class="fas fa-pencil-alt"></i> Editar' +
        '</a>' +
        '<button onclick="page.delete(\'' + item._id + '\')" type="button" ' +
        'rel="tooltip" class="btn btn-danger btn-link btn-sm">' +
        '<i class="fas fa-trash"></i> Apagar' +
        '</button>' +
        '</td>' +
        '</tr>';
    }

    if (html === '') {
      // Caso o HTML seja uma string vazia, o conteúdo será uma linha com a mensagem
      html = "<tr><td>Não possuí nenhum registro.</td></tr>"
    }

    // Usando JQuery, é feito a troca do contéudo HTML pelo gerado nessa função.
    $('#data-view').html(html);
  }

  // Função de texto de status
  statusInfo(key = '') {
    // Define várivel responsavel por criar os elementos html
    let html = '';

    // É feito um switch comparando a váriavel enviada.
    switch (key.toLowerCase()) {

      // Caso a várivel for "success" (para suceso)
      case 'success':

        // Define váriavel data que será utilizado para mostrar a data da última atualização
        let time = new Date();

        // troca contéudo da váriavel mensagem de Sucesso
        html = '<i class="fas fa-check wow animate__fadeIn text-success"></i>' +
          ' Atualizado as ' + app.pad(time.getHours(), 2) + ':' + app.pad(time.getMinutes(), 2)
        break;

      // Caso a váriavel for "error" (para erro)
      case 'error':

        // troca contéudo da váriavel mensagem de Erro
        html = '<i class="fas fa-times wow animate__fadeIn text-danger"></i> Ocorreu um erro.'
        break;

      // Caso a seja nenhuma, então é definido como "atualizando"
      default:

        // troca contéudo da váriavel mensagem Atualizando...
        html = '<i class="now-ui-icons loader_refresh spin wow animate__fadeIn text-info"></i> Atualizando...'
        break;
    }
    // Usando JQuery, é feito a troca do contéudo HTML pela mensagem definida
    $('#data-status').html(html);
  }

  // Função de apagar.
  delete(id) {
    // Criação da referência.
    // Utilizado para chamar funções dessa classe em escopo interno.
    let ref = this;

    // Usando a biblioteca Swal, é criado um POPUP
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, apagar.'
    }).then((result) => {
      // Caso a resposta seja sim (confirmar)
      if (result.value) {
        //É executado uma requisição por JQuery Ajax para rota de exclusão.
        $.ajax({
          url: ref.requestURL + id,
          type: 'DELETE',
        }).done(function (response) {

          // Verifica se foi excluido com sucesso
          if (response.status === 'success') {
            // Chama o filtro dessa função
            ref.filter();

            // Chama Swal popup mostrando sucesso.
            Swal.fire(
              'Apagado!',
              response.message,
              'success'
            )
          } else {
            // Chama Swal popup mostrando erro.
            Swal.fire(
              'Ocorreu um erro!',
              response.message,
              'error'
            )
          }
        }).fail(function (response) {
          // Chama Swal popup mostrando erro.
          Swal.fire(
            'Ocorreu um erro!',
            'Entre em contato com um administrador',
            'error'
          )
        });
      }
    })
  }
}