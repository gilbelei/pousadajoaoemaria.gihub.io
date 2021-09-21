$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;

  $('html, body').animate({
    scrollTop: targetOffset - 60
  }, 500);
});
(function($){
  $(function(){

    //https://www.jquery-az.com/6-examples-materialize-modals-live-demos-code/

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.modal').modal();
    $('select').formSelect();
    $('.materialboxed').materialbox();
    $('.slider').slider({ 
      full_width: true 
    });
    $('.datepicker').datepicker({
      container: 'body',
      format:'dd/mm/yyyy',
      showMonthAfterYear: true,
      i18n: {
        cancel: 'Cancelar',
        clear: 'Limpar',
        done: 'Ok',
        months: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthsShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        weekdays: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        weekdaysShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
      }
    });
    $('input#input_text, textarea#obs, textarea#mensagem').characterCounter();
    /*
    <div id="adultos">
    <span id="adultos-valor">
    var Adultos = document.getElementById('adultos');
    var AdultosValor = document.getElementById('adultos-valor');

    noUiSlider.create(Adultos, {
      start: [1],
      step: 1,
      range: {
        'min': [1],
        'max': [4]
      }
    });    
    Adultos.noUiSlider.on('update', function (values, handle) {
      AdultosValor.innerHTML = values[handle];
    });
    */



  }); // end of document ready
})(jQuery); // end of jQuery name space
