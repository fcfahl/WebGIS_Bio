$( document ).ready(function() {
    // console.log( "ready!" );

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
            //  console.log('remove layer: ' + ID);
         } else {
             map.addLayer(layerClicked);
            //  console.log('add layer: ' + ID);
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

   function createHTML (classN, ID, name, title, ref){
       // create HTML element

       var open_div = '<div id="' +  ID + '" class="' +  classN + '"  >',
            li =  '<li><input type="checkbox" value="' + title  + '" autocomplete="off" data-layer="' + name  + '"data-title="' + title  + '" class="wmsBox">',
            label = '<label for="'  +  ID  + '"><span>'  +  title  +  '</span></label>',
            // include a hidden class to hide the delete button
            icon = '<a class="wms_delete" href="'  +  ref  + '"><span class="glyphicon glyphicon-remove-circle wms_delete hidden-xs"><br></span></a>';
            colse_div = '</div>',
            html = open_div + li + label + icon + colse_div;

       return html;

   };

   function createGetMap () {

    //    http://localhost:8080/geoserver/LULC/wms?service=WMS&version=1.1.0&request=
    //    GetMap&layers=LULC:MODIS_10&styles=
    //    &bbox=712574.95802314,524469.995111959,7625664.001367271,7893458.75152161
    //    &width=720&height=768&srs=EPSG:3035&format=application/openlayers
       //
    //    var getMap = {
       //
    //    http://localhost:8080/geoserver/wms?
    //    request=GetMap
    //    &service=WMS
    //    &version=1.1.1
    //    &layers=topp%3Astates
    //    &styles=population
    //    &srs=EPSG%3A4326
    //    &bbox=-145.15104058007,21.731919794922,-57.154894212888,58.961058642578&
    //    &width=780
    //    &height=330
    //    &format=image%2Fpng
    // };

   };

     // Openlayers XML parser
       function loadDoc(xml) {
           var formatter = new  ol.format.WMSCapabilities();
           var endpoint = xml;
           var layers = [];
           var http = new XMLHttpRequest();
         // async call to geoserver (I'm using angular)
       //   $http.get(endpoint);

             // use the tool to parse the data
             var response = (formatter.read(xml));

             // this object contains all the GetCapabilities data
             var capability = response.capability;
             console.log("ol3: " + response);

             // I want a list of names to use in my queries
            //  for(var i = 0; i < capability.layers.length; i ++){
            //      layers.push(capability.layers[i].name);
            //  };


// nao esta funcionando
    };


   function parseVersion (xml, layers) {

       loadDoc(xml)

       $(xml).find('Capability').each(function()
        {
            var  name = $(this).children('Get').text().trim();
            // console.log($(this));
            // console.log(name);
        }); // end loop

   };

   function parseLayers (xml, layers) {
       //   create an object to store the layer data
       var jsonObj = [];
       $(xml).find('Layer').each(function()
        {
            var   name = $(this).children('Name').text().trim(),
                    title = $(this).children('Title').text().trim(),
                    SRS = $(this).children('SRS').text().trim(),
                    ID = "wms_" + title,
                    ref="#" + ID;

            // Ignore blank strings
            if (name !== null && name !== ""  )
            {
                var item = {
                    name: name,
                    title: title,
                    ID: ID,
                    ref: ref,
                    SRS: SRS,
                }
                jsonObj.push(item);

            } //end if
        }); // end loop

        return jsonObj;

   };

   // Parse GetCapabilities
   function parseCapabilities (xml, layers)
   {

       layerList = parseLayers (xml, layers);
       version = parseVersion (xml, layers);

        // loop through the object  data
        $.each(layerList, function (index, obj) {
            // console.log(' SRS ' + layerList[index].SRS)
            var   name = layerList[index].name,
                    title = layerList[index].title,
                    ID = layerList[index].ID,
                    ref= layerList[index].ref;

            var html = createHTML("wms_candidates",ID,name,title,ref);
            $(".wmsList").append(html);
          });

    };

    //  Add selected wms layers to Pannel
     $("#wms_add" ).on('click', function ()
     {

       var checkedVals = $('.wmsBox:checkbox:checked').map(function() {
           return this.value;
       }).get();


       $.each( checkedVals, function( index, value ){

        //    Clone selected wms layers to pannel
           var   ID = "#wms_" + value;
            $('.glyphicon').removeClass( "hidden-xs" ).closest('span'); //remove hidden class to show the delete icon
            $( ID ).clone().appendTo( ".wms_custom" );

            // console.log( "ID: " + ID);




       });
            // clean the wmlist to avoid duplicated IDs
              $(".wmsList" ).empty();
              // check duplicated ids
              checkDuplicateIDs();
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

        // clip the name and remove the special characters to create an unique ID
        // var ID = wmsLink.slice(-10).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');

        // var newWMS = $("<div>");
        // newWMS.addClass("wms");
        // $('.wms').attr('id', ID);
        // console.log('button: ' + ID);

        // Get Layer names
        // http://fuzzytolerance.info/blog/2012/03/06/2012-03-06-parsing-wms-getcapabilities-with-jquery/
        $.ajax({
            type: "GET",
    		url: wmsLink,
    		dataType: "xml",
    		success: function(xml) { parseCapabilities (xml, layers);}
        	});

    });


    /* we join the array separated by the comma */
    // var selected;
    // selected = names.join(',') + ",";
    //
    // /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    // if(selected.length > 1){
    // 	 console.log( "selected: " + selected);
    // }else{
    // 	alert("Please at least one of the checkbox");
    // }



        // append to DOM
        // $("#custom").append(html);



    //     var CustomWMS = L.tileLayer.wms(name, {
    // 		layers: 'GE.CARTAGEOLOGICA',
    // 		format: 'image/png',
    // 		transparent: true,
    // 		version: '1.3.0',
    // 		tiled:true,
    //         srs:"EPSG:4326"
    //    });

        // map.addLayer(CustomWMS);
    // });


    // var Custom_host = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&';

    // http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&service=wms&request=getCapabilities&version=1.3.0

    // var Custom_host = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/servizi-LiDAR/LIDAR_VALLE_DAOSTA.map&service=wms&request=getCapabilities&version=1.3.0';

// var Custom_host = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Pericolosita_sismica_005.map&service=wms&request=getCapabilities&version=1.3.0"

// var Custom_host = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Zone_sismogenetiche_ZS9.map&service=wms&request=getCapabilities&version=1.3.0"

// var Custom_host = "http://metaspatial.net/cgi-bin/ogc-wms.xml?VERSION=1.3.0&REQUEST=GetMap&SERVICE=WMS&LAYERS=DTM,Overview,Raster_250K,Topography,nationalparks,Infrastructure,Places&STYLES=,,,,,,&CRS=EPSG:27700&BBOX=424735.97883597884,96026.98412698413,467064.02116402116,127773.01587301587&WIDTH=400&HEIGHT=300&FORMAT=image/png&BGCOLOR=0xffffff&TRANSPARENT=TRUE"
//
//     var parser = new ol.format.WMSCapabilities();
//
//     $.ajax(Custom_host).then(function(response) {
//       var result = parser.read(response);
//       var jons = window.JSON.stringify(result, null, 2)
//     //   console.log(jons);
//     //   $('#custom').html(window.JSON.stringify(result, null, 2));
//
// });
//
//     $.ajax({
//             type: "GET",
//     		url: Custom_host,
//     		dataType: "xml",
//     		success: function(xml) {
//      			$(xml).find('Layer').each(function(){
//      				if ($(this).children("Name").text() != null) {
//                         console.log($(this).children("Name").text() )
//      				// 	$("#custom").append('<option value="' + $(this).children("Name").text() + '">' + $(this).children("Title").text() + '</option>');
//      				}
//     			});
//     		}
//     	});

        //

        // function loadDoc() {
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function() {
        //     if (xhttp.readyState == 4 && xhttp.status == 200) {
        //       document.getElementById("demo").innerHTML = xhttp.responseText;
        //     }
        //     };
        //     xhttp.open("GET", "demo_get.asp", true);
        //     xhttp.send();
        //     }

        //
        // $.get( Custom_host, function( data ) {
        //     //   $( ".result" ).html( data );
        //       console.log(data);
        //     });

        // var Custom_host = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Zone_sismogenetiche_ZS9.map&service=wms&request=getCapabilities&version=1.3.0"

            // https://api.jquery.com/jquery.get/
            // var jqxhr = $.get( Custom_host, function( data, status, headers ) {
            //     //   console.log( "success" );
            //     })
            //       .done(function(data, status, headers) {
            //         console.log( "data" );
            //         console.log( data);
            //       })
            //       .fail(function() {
            //         console.log( "error" );
            //       })
            //       .always(function() {
            //         console.log( "finished" );
            //       });

                // var Custom_host = "http://localhost:8080/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities"

              // http://fuzzytolerance.info/blog/2012/03/06/2012-03-06-parsing-wms-getcapabilities-with-jquery/
            //   $.ajax({
            //         type: "GET",
            //   		url: Custom_host,
            //   		dataType: "xml",
            //   		success: function(xml) {
            //    			$(xml).find('Layer').each(function(){
            //    				if ($(this).children("Name").text() != null) {
            //                     var name = $(this).children("Title").text();
            //                     console.log( name);
            //    					$(".list-group").append('<li class="list-group-item">' + $(this).children("Title").text() + '</li>');
            //    				}
            //   			});
            //   		}
            //   	});

                // $.ajax({
                //     type: "GET",
                //     url: Custom_host,
                //     dataType: "xml",
                //     success: parseXml
                // });
                //
                // function parseXml(xml){
                //     $(xml).find("Capability").each(function(){
                //         var name = $(this).text();
                //         console.log( name);
                //         });
                //      };





});
