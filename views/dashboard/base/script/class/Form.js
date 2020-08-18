class Form {
  constructor(url) {
    this.requestURL = url
    $('select').selectpicker();
  }
  clear() {
    for (const key in this.fields) {
      if (this.fields[key].input.is('select')) {
        this.fields[key].input.selectpicker('val', '');
      } else {
        this.fields[key].input.val('');
      }
    }
  }
  validadeNull() {
    let error = false;
    for (const key in this.fields) {
      if (this.fields[key].required) {
        let a = false;
        switch (this.fields[key].input.val()) {
          case null: a = true; break;
          case '': a = true; break;
        }
        if (a) {
          this.fields[key].input.parent(".form-group").addClass("has-danger active");
          error = true;
        }
      }
    }
    return error;
  }
  getFieldsValues() {
    let list = {};
    for (const key in this.fields) {
      list[key] = this.fields[key].input.val();
    }
    return list;
  }
  //Save event
  save() {
    if (this.validadeNull()) {
      Swal.fire(
        'Preencha todos campos!',
        'É necessário preencher os campos.',
        'warning'
      )
      return false;
    }
    let send = this.getFieldsValues();
    let id = app.getUrlParameter('id');
    if (id) {
      this.update(id, send);
    } else {
      this.new(send);
    }
  }
  loadFieldsValues(data) {
    for (const key in this.fields) {
      if (this.fields[key].setValue) {
        this.fields[key].setValue(data[key]);
      } else if (this.fields[key].input.is('select')) {
        this.fields[key].input.selectpicker('val', data[key]);
      } else {
        this.fields[key].input.val(data[key]);
      }
    }
  }

  //new event
  new(send) {
    let ref = this;
    $.post(this.requestURL, send, function (response) {
      let title = 'Ocorreu algum erro!';
      if (response.status === 'success') {
        Swal.fire(
          'Sucesso!',
          response.message,
          'success'
        )
        ref.clear();
      } else {
        Swal.fire(
          'Ocorreu algum problema!',
          response.message,
          'warning'
        )
      }
    }).fail(function (data) {
      Swal.fire(
        'Ocorreu algum erro!',
        response.message,
        'error'
      )
    });
  }

  //update event
  update(id, send) {
    $.ajax({
      url: page.requestURL + id,
      type: 'PUT',
      data: send,
      processData: true,
      success: function (response) {
        window.location.href = window.location.href;
        if (response.status === 'success') {
          Swal.fire(
            'Sucesso!',
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
}