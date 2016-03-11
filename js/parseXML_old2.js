// There are 3 ways to parse the getcapabilites file:
// 1: create a custom parser; the output will be a stored as xml (unless converted to json)
// 2: using openlayers library: the output will be a stored as json
// 3: using third parties libraries (e.g. https://github.com/w8r/wms-capabilities)


function WMS_layers (xmlFile) {

    var Custom_host = "http://localhost:8080/geoserver/wms?service=wms&version=1.3.0&request=GetCapabilities"
    var Custom_host = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Zone_sismogenetiche_ZS9.map&service=wms&request=getCapabilities&version=1.3.0"

    function createHTML (classN, ID, name, title, ref, url){
        // create HTML element

        var open_div = '<div id="' +  ID + '" class="dragable ' +  classN + '"  >',
             li =  '<li><input type="checkbox" value="' + ID  + '" autocomplete="off" data-layer="' + name  + '"data-title="' + title  + '"data-url="' + url  + '" class="wmsBox" id="' +  ID + '">',
             label = '<label for="'  +  ID  + '"><span>'  +  title  +  '</span></label>',
             // include a hidden class to hide the delete button
             icon = '<a class="wms_delete" href="'  +  ref  + '"><span class="glyphicon glyphicon-remove-circle wms_delete hidden-xs"><br></span></a>';
             colse_div = '</div>',
             html = open_div + li + label + icon + colse_div;

        return html;

    };

    function createGetMap (server, version, name, bbox, width, height, CRS, format ) {

     //    http://localhost:8080/geoserver/LULC/wms?service=WMS&version=1.1.0&request=
     //    GetMap&layers=LULC:MODIS_10&styles=
     //    &bbox=712574.95802314,524469.995111959,7625664.001367271,7893458.75152161
     //    &width=720&height=768&srs=EPSG:3035&format=application/openlayers

        var getMap = server + "version=" + version + "&request=GetMap&layers=" + name + "&bbox=" + bbox + "&width=" + width + "&height=" + height + "&srs=" +  CRS + "&format=" + format;
        return getMap;
    };

    function createWMS (server, version, name, bbox, width, height, CRS, format ) {

        var WMSLayer = {
            layers: name,
            format: format,
            transparent: true,
            version: version,
            tiled:true,
            srs: CRS,
        }

            // var host = 'http://localhost:8080/geoserver/LULC/wms';

        var WMS_leaflet = L.tileLayer.wms(server, WMSLayer);
        var obj = (JSON.stringify(WMS_leaflet, null, 2));

         console.log("WMS_leaflet" + obj);

         return WMS_leaflet;
    };

    // Openlayers XML parser (works but each getcapabilities file seems to have a different structure - must undertand better the xml strucuture before using it) //
      function parseXML(xml) {

          var formatter = new  ol.format.WMSCapabilities();
          var layers=[];

            // use the tool to parse the data
            var response = formatter.read(xml);

            // this object contains all the GetCapabilities data
            var capability = (JSON.stringify(response, null, 2));

            // parse JSON
            var obj = jQuery.parseJSON( capability );

            // Request Parameters
            var version = obj.version,
                service = obj.Service,
                capability = obj.Capability;

            // Capability Parameters
            var layer = capability.Layer,
                request = capability.Request.GetCapabilities.DCPType[0].HTTP.Get.OnlineResource;

            // Layer Parameters
            var layerList = layer.Layer;

            // Service Parameters
            var server = service.OnlineResource;
        //   console.log("layerList" +  layerList);

          // loop through the object  data
          $.each(layerList, function (index, obj) {
                // console.log(' SRS ' + layerList[index].SRS)

                var list = layerList[index],
                    name = list.Name,
                    title = list.Title,
                    CRS = list.CRS[0],
                    bbox = list.BoundingBox[1].extent,
                    width = 600,
                    height = 600,
                    format = "image/png",
                    ID = "wms_" + title.slice(-15).replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''), // clip the name and remove the special characters to create an unique ID
                    ref="#" + ID;

                var getMap = createGetMap (request, version, name, bbox, width, height, CRS, format );
                var getWMS_leaflet = createWMS (server, version, name, bbox, width, height, CRS, format );

                var item = {
                    name: name,
                    title: title,
                    ID: ID,
                    ref: ref,
                    url: getMap,
                    wms: getWMS_leaflet,
                }
                 layers.push(item);


				console.log("ID: " + ID);

          });

            // for(key in layers)
            // {
            //   console.log ("layer: " + layers[key].name + " url: " +  layers[key].url);
            // }

          console.log("%o", obj);

          return layers;


   };

    // Parse GetCapabilities
    function parseCapabilities (xml)
    {
        var layerList = parseXML(xml);

         // loop through the object  data
         $.each(layerList, function (index, obj) {
             // console.log(' SRS ' + layerList[index].SRS)
             var   name = layerList[index].name,
                     title = layerList[index].title,
                     ID = layerList[index].ID,
                     ref= layerList[index].ref,
                     wms =  layerList[index].wms,
                     url ="";
                    //   url = layerList[index].url;

             var html = createHTML("wms_candidates",ID,name,title,ref,url);
             $(".wmsList").append(html);

              console.log("layer: " + title);
           });


        return layerList;

    };


    // variable to hold the layer object
    var layerObj = parseCapabilities(xmlFile);

    return layerObj;

};




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

//
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
