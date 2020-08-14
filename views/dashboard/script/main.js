app = {};
loading = '<style>#content{align-items:center;background-color:#ebecf1;display:flex;height:100%;justify-content:center;margin:0}.loader{width:60px}.loader-wheel{animation:spin 1s infinite linear;border:2px solid rgba(30,30,30,.5);border-left:4px solid #f96332;border-radius:50%;height:50px;margin-bottom:10px;width:50px}.loader-text{color:#f96332;}.loader-text:after{content:"Espere";animation:load 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes load{0%{content:"Espere"}33%{content:"Espere."}67%{content:"Espere.."}100%{content:"Espere..."}}</style>'
loading += '<div class="loader wow animate__fadeIn"><div class="loader-wheel"></div><div class="loader-text"></div></div>'

//salva pagina para evitar gasto de dados
app.cache = {};
app.setCache = function (url, html) {
  app.cache[url] = html;
}
app.getCache = function (url) {
  if (app.cache[url]) {
    return app.cache[url];
  } else {
    return false;
  }
}

// Carrega nova pagina baseado no hash(#) da url
app.load = function () {
  page = {};
  let hash = this.getHashUrl();
  let cacheHTML = app.getCache(hash);
  if (cacheHTML) {
    app.render(cacheHTML);
  } else {
    $('#content').html(loading);
    let token = window.localStorage.getItem('x-access-token');
    if (token) {
      $.ajaxSetup({ headers: { 'x-access-token': token } });
    }
    $.get("/app/" + hash, function (data) {
      app.render(data);
      app.setCache(hash, data);
    }).fail(function (data) {
      switch (data.status) {
        case 404: window.location.href = '/app/#/404'; break;
        case 401: window.location.href = '/auth/#/entrar'; break;
      }
    });
  }
}
app.render = function (data) {
  document.title = data.title + " | Painel";
  app.variables = data.variables;
  $('#content').html(data.html);
  app.activeMenu();
}

//Obtem o hash e também corrige (se necessario);
app.getHashUrl = function () {
  if (window.location.hash === '' || (window.location.hash).search("/") === -1 || window.location.hash === '#/') {
    window.location.href = '/app/#/inicio';
  }
  let hash = window.location.hash;
  return hash.replace('#/', '');
}

//Carrega menu
app.activeMenu = function () {
  let hash = app.getHashUrl();
  hash = hash.split('/');
  $('#sidebar-wrapper > ul > li.active').removeClass('active');
  $('#menu-' + hash[0]).addClass('active');
  if (hash[1]) {

  }
}
app.setUserInfo = function (data) {
  $('#navbar_userName').text(data.user);
}
app.pad = function (num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
}
app.getUrlParameter = function (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(app.getHashUrl());
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

app.statusInfo = function (key = '') {
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
//Ao iniciar
$(document).ready(function () {
  window.onhashchange = function () {
    app.load();
  }
  app.load();
});