// Constantes de uso geral
url_porta_mob = 'http://proumo-mvp.herokuapp.com/api/mob?uex=1&';

function formata_data(data, locale){
    if(locale == 'pt_BR') data_nova = data.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    else data_nova = data.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    
    if(data_nova.indexOf('T') > 0) data_nova = data_nova.substring(0, data_nova.indexOf('T'));
    return data_nova;
}

function data_asc_to_timestamp(data){
    data_retorno = data.replace(/^(\d{2}\/)(\d{2}\/)(\d{4})$/,"$3-$2-$1");
    while(data_retorno.indexOf('/')>=0) data_retorno = data_retorno.replace('/', '');
    
    return data_retorno;
}

/**
 * Retorna uma String com os carecteres a serem mudados pelos novos
 * @param {type} str = string completa 
 * @param {type} char_atual = valor a ser alterado
 * @param {type} char_novo = valor a ser posto no lugar
 * @returns str
 */
function replace_str(str, char_atual, char_novo) {
    str_retorno = '';
    
    for(count = 0; count < str.length; count++) {
        
    }
        
    return str_retorno;
}

function esconde_calendario(){
    $('.dater_picker').datepicker('hide');
}

function estah_setado(variavel){
	return variavel != null && variavel.length > 0;
}

function associa_evento_cidade(nome_cidade,nome_evento,objs){
	retorno = new Array();

    for(i = 0; i < objs.length; i++) 
    	if(objs[i].name.toLowerCase().indexOf(nome_evento.toLowerCase()) >= 0 && objs[i].venue.city != null && objs[i].venue.city.toLowerCase().indexOf(nome_cidade.toLowerCase()) >= 0) 
    		retorno.push(objs[i]);

    return retorno;
}

function associa_por_data(dados, data_inicio){
	retorno = new Array();

    for(i = 0; i < dados.length; i++) 
    	if(dados[i].start_time == data_asc_to_timestamp(data_inicio)) 
    		retorno.push(dados[i]);

    console.log(retorno);
    return retorno;	
}

function get_por_cidade(dados, cidade){
    retorno = new Array();

    for(i = 0; i < dados.length; i++) {
        if(dados[i].venue.city == null) continue;
        if(dados[i].venue.city.toLowerCase() == cidade.toLowerCase())
            retorno.push(dados[i]);
    }

    return retorno;
}

function get_por_evento(dados, evento){
    retorno = new Array();
    
    for(i = 0; i < dados.length; i++) {
        if(dados[i].name == null) continue;
        if(dados[i].name.toLowerCase().indexOf(evento.toLowerCase()) >= 0)
            retorno.push(dados[i]);
    }

    return retorno;
}

function add_face_link(anuncios){
    for(i = 0; i < anuncios.length; i++) anuncios[i].face_link = 'http://facebook.com/' + anuncios[i].eid;
    
    return anuncios;
}

function sidebar_visivel(){
    return $('#barra_lateral').is(":visible");
}

function assinar_app(){
    url_base_fb_login = 'http://www.facebook.com/dialog/oauth?client_id=';
    app_id = 128300630673976;
    param_redirect = '&redirect_uri=http://';
    val_redirect = 'events.proumo.com.br/';
    param_touch = '&display=touch&state=';

    window.location = url_base_fb_login + app_id + param_redirect + val_redirect + param_touch;
}