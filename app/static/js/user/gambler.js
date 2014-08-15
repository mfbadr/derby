/*jshint -W109 */
(function(){
  'use strict';

  $(document).ready(function(){
    //alert('the doc is ready');
    $('.assetInfo').click(sellAsset);
  });

  function sellAsset(){
    //debugger;
    var assetName = $(this).children('.assetName').text(),
        gamblerId = $(this).closest('.gambler').data('gamblerId'),
        url = '/gamblers/' + gamblerId + '?asset=' +assetName;

    //console.log(assetName, gamblerId);
    // url = url, n
    $.ajax({url:url, type:'delete', dataType:'json', success:function(data){
      console.log(data.id, data.asset);
      var $asset = $('.assetName:contains('+data.asset+')').closest('.asset');
      $asset.fadeOut();
      var $cash = $('.assetName:contains('+data.asset+')').closest(".gambler").find(".cash").text(data.newCash);
      //debugger;
      $cash;
    }});
  }

})();

