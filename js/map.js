$( document ).ready(function() {

    //  Add layers to map (except those in the wms modal pannel - added class wms_Ignore to avoid adding the layer to the map before showing on the pannel)
    //jquery dynamically added checkbox
    //http://stackoverflow.com/questions/4692281/jquery-dynamically-added-checkbox-not-working-with-change-function
    $(document).on('click', "input:checkbox:not(.wms_Ignore)", function(event) {

         var layerClicked = window[event.target.value];

        //  console.log('layerClicked: ' , layerClicked);
        //  console.log('this for adding: ' , this);

         if (map.hasLayer(layerClicked)) {
             map.removeLayer(layerClicked);
         } else {
             map.addLayer(layerClicked);
         };
     });

     $(document).on('click', ".wms_delete ", function(event) {
          var layer = $(this).attr('value');     //  Get the ID fist to identify the event (does not work as the toggle layer function)
          var layerClicked = window[layer];
          var href = $(this).attr('href');
         //
        //  console.log('layerClicked: ' , layerClicked);
        //  console.log('href: ' , href);

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

    $("#wms_close" ).on('click', function () {
                 console.log('close modal: ' );
    });


    //  Add selected wms layers to Pannel
      $("#wms_add" ).on('click', function ()
      {

         // get the checked checkboxes
        var checkedVals = $('.wmsBox:checkbox:checked').map(function() {
            return this.value;
        }).get();

        // Lopp throught the checked checkboxes
        $.each( checkedVals, function( index, value ){
            //   Clone selected wms layers to pannel
            var   ID = "#" + value;
            $('.wms_delete').removeClass( "hidden-xs" ); //remove hidden class to show the delete icon
            $('.wmsBox').removeClass( "wms_Ignore" ); //remove ignore class to allow toggling the layer
            $( ID ).clone().addClass( "wms_selected" ).appendTo( ".wms_custom" );

            // Get the layer object
            var layerClicked = window[value];

            // Add the layer to the map
            map.addLayer(layerClicked);

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
