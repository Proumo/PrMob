link_proumo = 'https://' + document.domain + '/';//'https://proumo-mvp.herokuapp.com/';

/* Mobile não tem tooltip
$(".tooltiper").tooltip({trigger: "hover"});
$('.tooltiper').attr('rel', 'tooltip');
$('.tooltiper').attr('data-placement', 'top');
*/

$('.datepicker').click(function(){
    $('.datepicker').datepicker({ format: "dd/mm/yyyy" }).on('changeDate', function (ev) {
        $(this).blur();
        $(this).datepicker('hide');
    });
});

// Click search
$('#bnt_search').click(function(){
    toggle_class($('body'), 'overflow_val_on', 'overflow_val_off');
    if($("#barra_lateral").is(":visible")) $("#barra_lateral").hide();
    else $("#barra_lateral").show();
});

/**
* elemento = objeto jquery
* classe_antiga = classe que está como incial
* classe_nova = classe a ser usada como nova
**/
function toggle_class(elemento, classe_antiga, classe_nova){
    if(elemento.hasClass(classe_antiga)) {
        elemento.removeClass(classe_antiga);
        elemento.addClass(classe_nova);
    }else {
        elemento.removeClass(classe_nova);
        elemento.addClass(classe_antiga);
    }
}
  
function ativa_btns(){
    setTimeout(function() {
        // Ativa as funcionalidades dos clicks nos botões
        btns_opt_click();
        //btns_externo_click(); // Externo pq são funcionalidades externas ao app
    }, 1000);
}

function btns_opt_click(){
    $('.options .btn').click(function(){
        // Evita ajax desnecessário
        if($(this).hasClass('active')) return;
        
        $(this).parent().find('.btn').removeClass('active');
        $(this).addClass('active');
        
        div_mae = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
        array_id = div_mae.attr('id');
        eid = array_anuncios[array_id].eid;
        
        if($(this).hasClass('btn_h_vs_m')) div_mae.find('.frame_h_vs_m iframe').attr('src', link_proumo + 'h_vs_m/' + eid);
        if($(this).hasClass('btn_localizacao')) div_mae.find('.frame_localizacao iframe').attr('src', link_proumo + 'mapa/' + eid + '/' + array_anuncios[array_id].venue.latitude + '/' + array_anuncios[array_id].venue.longitude);
        
        div_mae.find('.frame_interativo > div').hide();
        div_mae.find('.frame_interativo .frame_loading').show();
        $('.bar').css('width', '100%');
        
        if($(this).hasClass('btn_h_vs_m')) btn_h_vs_m();
        if($(this).hasClass('btn_home')) btn_home();
        if($(this).hasClass('btn_descricao')) btn_descricao();
        if($(this).hasClass('btn_localizacao')) btn_localizacao();    
    });
}

// #### FUNCIONALIDADES DAS OPÇÕES DENTRO DO FRAME
function btn_h_vs_m(){
    btn_show_frame('frame_h_vs_m');
}

function btn_home(){
    btn_show_frame('frame_home');
}

function btn_descricao(){
    btn_show_frame('frame_descricao');
}

function btn_localizacao(){
    btn_show_frame('frame_localizacao');
}

function btn_show_frame(classe){
    setTimeout(function(){
        $('.bar').css('width', '5%');
        div_mae.find('.frame_interativo > div').hide();
        div_mae.find('.'+classe).show();
    }, 1700);
}

$('#logar_fb').click(function(){
    $.get(url_porta_mob+'url_retorno='+encodeURIComponent(document.URL), function(retorno){
        retorno = new String(retorno);
        alert(retorno);

        if(retorno.trim() == 'true') assinar_app();
    });
});

