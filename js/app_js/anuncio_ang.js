var ProumoApp = angular.module('ProumoApp', ['ngTouch']).directive('fastClick', function() {
    return function(scope, elem, attr) {
        elem.fastClick(function (e) {
            scope.$apply(attr.fastClick);
        })
    };
});

ProumoApp.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

array_anuncios = new Array();

ProumoApp.controller('AnunciosCtrl', function ($scope, $http) {
    app_id = 128300630673976;
    msg = 'Invite%20all%20your%20friends!';
    uri = 'https://apps.facebook.com/proumoevents/';
    param = '?link_externo=true';

    url_convite = 'https://www.facebook.com/dialog/apprequests?%20app_id='+app_id+'&%20message='+msg+'&%20redirect_uri='+uri+param;

    // Controle que faz sumir e aparecer o overflow
    $scope.overflow_val = 'overflow_val_on';
    $scope.estado_barra_lateral = 'none';

    // Função executada ao submeter o form
    $scope.search = function() {
        data_inicio = $('[name=data_inicio]').val();
        pog = '';
        pog += $('#pog').val();
        evento = $('[name=nome_evento]').val();

        if(evento === undefined && data_inicio === undefined || evento.length <= 0 && data_inicio.length <= 0) evento = pog;
        
        if(estah_setado($('[name=data_inicio]').val())) data_inicio = $('[name=data_inicio]').val();
        if(estah_setado($('[name=data_inicio]').val())) data_serializada = $('[name=data_inicio]').serialize();
        else{ data_inicio = ''; data_serializada = ''; }

        $scope.url = url_porta_mob+'?eid='+ pog +'&nome_evento='+ evento+'&'+data_serializada;
        console.log('URL: ' + $scope.url);
        
        $http.get($scope.url).
        success(function(anuncios, status) {            
            if(estah_setado(data_inicio) && data_inicio.length >= 6) anuncios = associa_por_data(anuncios, data_inicio);
            
            $scope.anuncios = corrige_json(anuncios);
            array_anuncios = $scope.anuncios;
            
            $('#resultado_pesquisas').html($scope.anuncios);
            
            // Resetagens após 
            preparar_tooltips();
            ativa_btns();
        }).
        error(function(dados, status) {
            $scope.dados = dados || "Request failed";
            $scope.status = status;
        });
    };
    
    // Ação ajax de proumova
    $scope.proumova = function(event) {
        event_array = get_event_array_eid(event);
        eid = event_array['eid'];
        
        $scope.url = link_proumo + 'proumova/' + eid;
        
        $http.get($scope.url).success(function(dados){
            lanca_notificador(dados[0]);
        });
    };
    
    // Ação ajax de proumova
    $scope.participe = function(event) {
        event_array = get_event_array_eid(event);
        eid = event_array['eid'];
        
        $scope.url = link_proumo + 'participe/' + eid;
        
        $http.get($scope.url).success(function(dados){
            lanca_notificador(dados[0]);
        });
    };
    
    /**
     * Retorna uma Hash com o src_img e o Eid
     * @param {event} evento click
     * @returns {hash} event_array 
     */
    function get_event_array_eid(event){
        btn_corrente = $(event.target);
        div_btns = btn_corrente.parent();
        if(btn_corrente[0].nodeName.toLowerCase() == 'i') div_btns = btn_corrente.parent().parent();
        
        retorno = {};
        retorno['eid'] = div_btns.attr('data-pog');
        
        return retorno;
    }
    
    /**
     * Lança a notificação na tela do usuário
     * @param {obj_json} obj[0] => json com o titulo, tipo da mensagem e mensagem a aparecer no notificador
     * @returns {void}
     */
    function lanca_notificador(obj_retorno){
        // Avisa que foi compartilhado
        $.pnotify({
                   pnotify_title: obj_retorno.titulo, 
                   pnotify_text: obj_retorno.msg, 
                   type: obj_retorno.tipo,
                   pnotify_hide: false
               });

        setTimeout(function(){
            $( ".ui-pnotify-closer" ).trigger( "click" );
        }, 3000);
    }
    
    /**
    * Faz aparecer e sumir a barra lateral
    */
    $scope.toggle_sidebar = function(){
        if($scope.overflow_val == 'overflow_val_off') $scope.overflow_val = 'overflow_val_on';
        else $scope.overflow_val = 'overflow_val_off';

        if($scope.estado_barra_lateral == 'block') $scope.estado_barra_lateral = 'none';
        else $scope.estado_barra_lateral = 'block';
    }

    /**
    * Joga o usuário na tela de Login do Facebook
    */
    $scope.AssinarApp = function(){
        url_request = url_porta_mob+'url_retorno='+encodeURIComponent(document.URL);

        $http.get(url_request).
        success(function(retorno, status) {
            if(retorno == 'true') assinar_app();
        });
    }
});