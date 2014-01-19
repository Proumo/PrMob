$('#sociais_1 .btn').attr('data-placement', 'top');
$('#sociais_2 .btn').attr('data-placement', 'bottom');

$('#btns_sociais .btn').addClass('tooltiper');

/* Mobile não tem tooltip
$('.tooltiper').tooltip({ trigger: "hover" });
*/

// Defini??o dos dizeres nos bot?es sociais
$('.btn-facebook').attr('data-original-title', 'Curta, compartilhe e convide a galera para os eventos');
$('.btn-youtube').attr('data-original-title', 'Compartilhe os videos com a galera nos eventos em tempo real');
$('.btn-github').attr('data-original-title', 'Desenvolva Apps && Plugins');
$('.btn-twitter').attr('data-original-title', 'Tweet e compartilhe sobre os eventos');
$('.btn-foursquare').attr('data-original-title', 'Compartilhe aonde está sendo o evento');
$('.btn-instagram').attr('data-original-title', 'Compartilhe suas fotos dos eventos');

// Definição da cor dos botões
$('.lead_azul_escuro .btn').addClass('btn-primary');
$('.lead_verde .btn').addClass('btn-success');
$('.lead_roxo .btn').addClass('btn-roxo');

$('#marketing-publico .btn, #marketing-anunciante .btn, #marketing-api .btn').addClass('span12');
$('#content_pesquisa .btn').addClass('btn-large');

$('#btns_sociais .btn').click(function(){
	if($(this).hasClass('disabled')) return;
	else if($(this).hasClass('active')) $(this).removeClass('active');
	else $(this).addClass('active');
});

$('#nav .nav li').click(function(){
	$('#nav .nav li').removeClass('active');
	$(this).addClass('active');
});

$('#conectar').click(function(){
	
});

$('a').bind('click',function(event){
	var $anchor = $(this);

	$('html, body').stop().animate({
		scrollTop: $($anchor.attr('href')).offset().top
	}, 1000,'easeInOutExpo');

	event.preventDefault();
});

$( "a" ).click(function( event ) {
	event.preventDefault();
});

$( "li" ).click(function( event ) {
	event.preventDefault();
});

$( 'form' ).submit(function(event){
   event.preventDefault(); 
});

$('.dropdown-menu li').click(function(){
	var lingua_selecionada = $(this).children('a').html();
	$('.dropdown-menu li').removeClass('active');
	$(this).addClass('active');

	$('#btn_inter_content').html(lingua_selecionada+' <span class="caret"></span>');
});

// Bootstrap DatePicker
var en_US = {format: 'mm/dd/yyyy'}
var pt_BR = {format: 'dd/mm/yyyy'}

$('.dater_picker').datepicker({
    format: "dd/mm/yyyy",
    language: "pt-BR",
    autoclose: true,
    orientation: "bottom auto"
});


$('input').focusout(function() {
	$('html, body').animate({ scrollTop: 0 }, 0);
});

$("body").swipe({
	swipe:function(event, direction, distance, duration, fingerCount) {
		if(direction == 'right') $('#barra_lateral').show();
		else if(direction == 'left') $('#barra_lateral').hide();
		
		if(direction == 'up' && sidebar_visivel() || direction == 'down' && sidebar_visivel()) return;
		else toggle_class($('body'), 'overflow_val_on', 'overflow_val_off');
	}
});

$('#resultado_pesquisas').html(document.URL);