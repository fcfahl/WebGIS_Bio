$( document ).ready(function() {

    //  Add layers to map
    //jquery dynamically added checkbox
    //http://stackoverflow.com/questions/4692281/jquery-dynamically-added-checkbox-not-working-with-change-function
    $(document).on('click', "input:checkbox:not(.wms_delete)", function(event) {
         var layerClicked = window[event.target.value];
         console.log('layerClicked: ' , layerClicked);

         if (map.hasLayer(layerClicked)) {
             map.removeLayer(layerClicked);
         } else {
             map.addLayer(layerClicked);
         };
     });

     $(document).on('click', ".wms_delete:checkbox ", function(event) {
          var layerClicked = window[event.target.value];
          var href = $(this).attr('href');

        //   Remove map
          if (map.hasLayer(layerClicked))
                map.removeLayer(layerClicked);

        //   Remove layer name
            $(href).remove();
      });


     // clear the layer name list on Modal
     $(".cleanButton" ).on('click', function () {
         $(".wms_candidates").remove();
    });

    //  Hide buttons in Modal
    $("#modalButton" ).on('click', function () {
        $(".modal-footer").hide();
        $(".modal-body").show();
    });

    //  Add selected wms layers to Pannel
      $("#wms_add" ).on('click', function ()
      {

        var checkedVals = $('.wmsBox:checkbox:checked').map(function() {
            return this.value;
        }).get();


        $.each( checkedVals, function( index, value ){
         //    Clone selected wms layers to pannel
            var   ID = "#" + value;
             $('.wms_delete').removeClass( "icon-hide" ); //remove hidden class to show the delete icon
             $( ID ).clone().addClass( "wms_selected" ).appendTo( ".wms_custom" );

        });
             // clean the wmlist to avoid duplicated IDs
               $(".wmsList" ).empty();

     });


    //  MODAL: add custom WMS layers
    $("#wms_submit").on('click', function () {

        //  Show footer after submit button is clicked
        $(".modal-body").hide();
        $(".modal-footer").show();

        var wmsLink = $('#wms_capability').val();
        console.log('wmsLink: ' + wmsLink);

        // Get Layer names
        // http://fuzzytolerance.info/blog/2012/03/06/2012-03-06-parsing-wms-getcapabilities-with-jquery/
        $.ajax({
            type: "GET",
            url: wmsLink,
            dataType: "xml",
            success: function(xml) { parseXML (xml);}
        });

    });


});
