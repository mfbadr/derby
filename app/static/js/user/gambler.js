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
        url = '/gamblers/' + gamblerId + '/assets/' +assetName; //pass id and assetname to controller in req.params

    //console.log(assetName, gamblerId);
    // url = url, n
    $.ajax({url:url, type:'delete', dataType:'json', success:function(data){
      //console.log(data.id, data.asset);
      var $asset = $('.assetName:contains('+data.asset+')').closest('.asset'); //select asset with correct name
      $asset.fadeOut(); // fade it out
      var $gambler = $('.gambler[data-gambler-id='+data.id+']'); //selct that gambler
      $gambler.find('.cash').text(data.newCash); //update their cash

      if(data.isDivorced){ //if we got isDivorced
        var $spouse = $gambler.find('.spouse'); //find the spouse
        $spouse.fadeOut(); //fade it out
        setTimeout(function(){$spouse.remove();}, 2000);
      }
    }});
  }
})();

