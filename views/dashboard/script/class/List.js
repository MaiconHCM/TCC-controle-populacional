class List {
  constructor(url) {
    this.requestURL = url
  }

  //Função do filtro.
  filter() {
    app.statusInfo();
    let params = {};
    let name = $('input[name=search]').val();
    if (name) {
      params.name = name;
    }
    let ref=this;
    $.post(this.requestURL + "filter", params, function (response) {

      if (response.data) {
        ref.list(response.data);
        app.statusInfo('success');
      }
    }).fail(function (response) {
      app.statusInfo('error');
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

  //função de apagar.
  delete(id) {
    let ref=this;
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
          success: function (response) {
            window.location.href = window.location.href;
            if (response.status === 'success') {
              page.filter();
              Swal.fire(
                'Apagado!',
                response.message,
                'success'
              )
            } else {
              Swal.fire(
                'Ocorreu algum problema!',
                response.message,
                'warning'
              )
            }
          }
        })
      }
    })
  }
}