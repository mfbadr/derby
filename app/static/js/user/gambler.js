(function(){
  'use strict';

  $(document).ready(function(){
    //alert('the doc is ready');
    $('.assetInfo').click(sellAsset);
  });

  function sellAsset(){
    //debugger;
    var assetName = $(this).children('.assetName').text();
    console.log(assetName);
    var gamblerId = $(this).closest('.gambler').data('gamblerId');
    console.log(gamblerId);
  }

})();

