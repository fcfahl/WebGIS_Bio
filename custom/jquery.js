$( document ).ready(function() {
    console.log( "ready!" );

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
        console.log(" button expand: " + label );

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
            console.log( "expand button" );

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
             console.log( leg );

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



    //  Add custom WMS layers
     $("#wms_btn").on('click', function () {
        var name = $('#wms_txt').val();

        // clip the name and remove the special characters to create an unique ID
        var ID = name.slice(-10).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');

        var newWMS = $("<div>");
        newWMS.addClass("wms");
        $('.wms').attr('id', ID);
        console.log('button: ' + ID);

        // create HTML element
        var html = [
            '<div class="wms " id=" ' +  ID + '  ">',
            '<li><input type="checkbox" value=" ' + ID  +  '  " checked="true" class="boxlayer">',
            '<label for=" '    +  ID  +'   "><span> '    +  name  +   '</span></label>',
            '</div>'
        ].join("\n");

        // append to DOM
        $("#custom").append(html);



        var CustomWMS = L.tileLayer.wms(name, {
    		layers: 'GE.CARTAGEOLOGICA',
    		format: 'image/png',
    		transparent: true,
    		version: '1.3.0',
    		tiled:true,
           srs:"EPSG:4326"
       });

        map.addLayer(CustomWMS);
    });




});
