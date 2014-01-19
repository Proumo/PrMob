/**
* retorna os dados do JSON sem bugs de setagem e com attrs especiais
* @param dados JSON
*/
function corrige_json(dados){
    // Manipula os dadoss do JSON
    for(i=0;i<dados.length;i++) {
        if(dados[i].start_time != null) {
            dados[i].start_time = formata_data(dados[i].start_time, 'pt_BR');

            if(dados[i].name.length >= 44 || dados[i].name.indexOf('✰') > 0) {
                dados[i].name = dados[i].name.toLowerCase();
                dados[i].name_original = dados[i].name;
                dados[i].name = dados[i].name.substring(0, 32) + '...';
            }
        }

        if(dados[i].pic_cover == null) {
            dados[i].pic_cover = {};
            dados[i].pic_cover.source = 'http://proumo.com.br/assets/img/logo.png?v=322';
            dados[i].pr_brand = 'ProumoEvents';
        }
    }//fim for

    return dados;
}

ProumoApp.directive("ng-click", function() {
  return function($scope, $element, $attributes) {
    var tapped;
    tapped = false;
    $element.bind("click", function() {
      if (!tapped) {
        return $scope.$apply($attributes["ng-click"]);
      }
    });
    $element.bind("touchstart", function(event) {
      return tapped = true;
    });
    $element.bind("touchmove", function(event) {
      tapped = false;
      return event.stopImmediatePropagation();
    });
    return $element.bind("touchend", function() {
      if (tapped) {
        return $scope.$apply($attributes["ng-click"]);
      }
    });
  };
});