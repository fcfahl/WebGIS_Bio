$( document ).ready(function() {
    // console.log( "ready!" );

    var layerObj = []; // variable to hold the layer object

    function checkDuplicateIDs(){
        $('[id]').each(function(){
          var ids = $('[id="'+this.id+'"]');
          if(ids.length>1 && ids[0]==this)
            console.warn('Multiple IDs #'+this.id);
        });
    };


    // Uncheck the checkboxes (problem in Firefox)
    $('input:checkbox').removeAttr('checked');

    // // JQuery ui tabs
    // $( "#tabs" ).tabs({
    //   heightStyle: "fill"
    // });

    // Accordeon - expand layer panels
    $( "#accordion" )
    .accordion({
      header: "> div > h3",
      heightStyle: "content",
      collapsible: true,
      active: 2,
      icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },

    })
    .sortable({
      axis: "y",
      handle: "h3",
      stop: function( event, ui ) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children( "h3" ).triggerHandler( "focusout" );

        // Refresh accordion to handle new order
        $( this ).accordion( "refresh" );
      }
    });

    // Syncronyse the expand button in all tabs
    function expand() {
        // Getter
        var label = $( "#expand").button( "option", "label" );
        // console.log(" button expand: " + label );

        if(label === "Expand All") {
            $('.panel-collapse:not(".in")').collapse('show');
        }
        else {
            $('.panel-collapse.in').collapse('hide');

        }
    };

    // Expand All button
    $( "#expand" ).button().on( "click", function() {
        var label = $(this).button( "option", "label" );
        if(label === "Expand All") {
        	$(this).button( "option", "label", "Collapse All" );
            $('.ui-widget-content').show();

            // Expand-collapse legend option
            $('.panel-collapse:not(".in")').collapse('show');
            // console.log( "expand button" );

        }
        else {
        	$(this).button( "option", "label", "Expand All" );
            $('.ui-widget-content').hide();
            // console.log( label );

            // Expand-collapse legend option
            $('.panel-collapse.in').collapse('hide');

        }
     });

    expand()

     // Setting button
     $( "#setting" ).button().on( "click", function() {
         var label = $(this).button( "option", "label" );
         $('#adm').hide();
      });

     // Display Legend and metadata
     $(".boxlayer").change(function() {

         var value = $(this).attr("value");
         var index = $(this).attr("rel");

         var leg = "#leg_" + value
         var tbl = "#tbl_" + value

         if(this.checked) {
             $(leg).show();
             $(tbl).show();
            //  console.log( leg );

        }else{
            $(leg).hide();
            $(tbl).hide();
            // console.log( tbl );
        }

     });

     function sortPannel() {

         var $legCache = $('#legend');
         var $tblCache = $('#tables');

         $legCache.find('.leg').sort(function (a, b) {
             return +a.getAttribute('rel') - +b.getAttribute('rel');
         })
             .appendTo($legCache);

         $tblCache.find('.tbl').sort(function (a, b) {
             return +a.getAttribute('rel') - +b.getAttribute('rel');
         })
             .appendTo($tblCache);
     };

     // Drag and Drop layers
     $( "#lulc" ).sortable({

         update: function (e, ui) {
            $("#lulc div").each(function (i, elm) {

            var name = ($(this).attr('id')),
                 index = i,
                 ID_leg = ("#leg_" + name),
                 ID_table = ("#tbl_" + name),
                 ID_opacity = ("#opy_" + name),
                 index_ID = (100 - index);

                //  console.log("index: " +  index);
                //  console.log("ID_leg: " + ID_leg);

                // Redefine rel value based on the new div sequence
                $(ID_leg).attr('rel', index)
                $(ID_table).attr('rel', index)

                var test =$(ID_leg).attr('rel')
                // console.clear()
                // console.log(ID_leg + ": rel: " + test);

                sortPannel();

             });
         }
     });

    //  Add layers to map
     $(".draggable input[type='checkbox']").on('click', function (event) {
         layerClicked = window[event.target.value];
         var ID = $(this).attr('value');

         if (map.hasLayer(layerClicked)) {
             map.removeLayer(layerClicked);
             console.log('remove layer: ' + ID);
         } else {
             map.addLayer(layerClicked);
             console.log('add layer: ' + ID);
         };
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

   // check duplicated ids
   checkDuplicateIDs();

//  Add selected wms layers to Pannel
      $("#wms_add" ).on('click', function ()
      {

        var checkedVals = $('.wmsBox:checkbox:checked').map(function() {
            return this.value;
        }).get();


        $.each( checkedVals, function( index, value ){

         //    Clone selected wms layers to pannel
            var   ID = "#" + value;
             $('.glyphicon').removeClass( "hidden-xs" ).closest('span'); //remove hidden class to show the delete icon
             $( ID ).clone().appendTo( ".wms_custom" );

        });
             // clean the wmlist to avoid duplicated IDs
               $(".wmsList" ).empty();

     });

     // remove wms custon layer using delete icon
     $('.wms_custom' ).on('click', '.wms_delete', function () {

         var href = $(this).attr('href');
         $(href).remove();
         console.log( "remove " + href );
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
             success: function(xml) { layerObj = WMS_layers (xml);}
             });



         });


     	//jquery dynamically added checkbox
     	//http://stackoverflow.com/questions/4692281/jquery-dynamically-added-checkbox-not-working-with-change-function
     	$(document).on('click', '.wmsBox', function(event) {

     	// 	var layerClicked = window[event.target.value];
            // var ID = $(this).attr('value');
            // var wmsText = (JSON.stringify(layerObj, null, 2));

            // console.log('layerObj: ' + wmsText);
            // console.log('wms.name: ' + layerObj[0].name);
            // console.log('ID: ' + ID);

            $.each( layerObj, function(index, obj) {
                var ref = layerObj[index].ref + " input[type='checkbox']",
                    wms =  layerObj[index].wms;
                console.log('ref: ' + ref);
                //


                if ($(ref).prop('checked')) {
                    // console.clear();
                    console.log('add layer: ' + ref);
                    // console.log('wms.name: ' + (JSON.stringify(wms, null, 2)));
                    map.addLayer(wms);
                } else {
                    console.log('remove layer: ' + ref);
                    map.removeLayer(wms);

                };

            });








     	});



});
