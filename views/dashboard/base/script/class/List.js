class List {
  constructor(url) {
    this.requestURL = url
  }

  //Função do filtro.
  filter() {
    this.statusInfo();
    let params = {};
    let name = $('input[name=search]').val();
    if (name) {
      params.name = name;
    }
    let ref = this;
    $.post(this.requestURL + "filter", params, function (response) {
      if (response.status === 'success') {
        ref.list(response.data);
        ref.statusInfo('success');
      } else {
        ref.statusInfo('error');
      }
    }).fail(function (response) {
      ref.statusInfo('error');
    });
  }

  //função de listagem
  list(data) {
    let a = '';
    for (const prop in data) {
      const item = data[prop];
      a +=
        '<tr>' +
        '<td>' + item.name + '</td>' +
        '<td class="text-right">' +
        '<a href="http://localhost:3000/app/#/especies/form?id=' + item._id + '" class="btn btn-primary btn-link btn-sm">' +
        '<i class="fas fa-pencil-alt"></i> Editar' +
        '</a>' +
        '<button onclick="page.delete(\'' + item._id + '\')" type="button" rel="tooltip" class="btn btn-danger btn-link btn-sm">' +
        '<i class="fas fa-trash"></i> Apagar' +
        '</button>' +
        '</td>' +
        '</tr>';
    }
    if (a === '') {
      a = "<tr><td>Não possuí nenhum registro.</td></tr>"
    }
    $('#data-view').html(a);
  }
  statusInfo(key = '') {
    switch (key.toLowerCase()) {
      case 'success':
        let time = new Date();
        $('#data-status').html('<i class="fas fa-check wow animate__fadeIn text-success"></i> Atualizado as ' + app.pad(time.getHours(), 2) + ':' + app.pad(time.getMinutes(), 2));
        break;
      case 'error':
        $('#data-status').html('<i class="fas fa-times wow animate__fadeIn text-danger"></i> Ocorreu um erro.');
        break;
      default:
        $('#data-status').html('<i class="now-ui-icons loader_refresh spin wow animate__fadeIn text-info"></i> Atualizando...');
        break;
    }
  }

  //função de apagar.
  delete(id) {
    let ref = this;
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, apagar.'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: ref.requestURL + id,
          type: 'DELETE',
        }).done(function (response) {
          if (response.status === 'success') {
            page.filter();
            Swal.fire(
              'Apagado!',
              response.message,
              'success'
            )
          } else {
            Swal.fire(
              'Ocorreu um erro!',
              response.message,
              'error'
            )
          }
        }).fail(function (response) {
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