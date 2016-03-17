    // zoom configuration

    var   southWest = L.latLng(31, -17.5),
            northEast = L.latLng(72, 45),
            centerView= L.latLng(56, 20),
            zoomLevel = 4;

    var map = L.map('map').setView(centerView, zoomLevel);
    // console.log('map:' + map)

	map.fitBounds([southWest, northEast]);

    // Leaflet.ZoomBox-master plugin
    var control = L.control.zoomBox({
        modal: false,  // If false (default), it deactivates after each use.
                  // If true, zoomBox control stays active until you click on the control to deactivate.
                // position: "topleft",
                // className: "customClass"  // Class to use to provide icon instead of Font Awesome
    }).addTo(map);

    // geotagged photos
    var featureGroup = L.featureGroup([]).addTo(map);
    	// var featureGroup = L.markerClusterGroup();

    // Leaflet.NavBar-master plugin
        L.control.navbar().addTo(map);

    //Leaflet-MiniMap-master Plugin
        var OSM2 = L.tileLayer.provider('OpenStreetMap.Mapnik', {
            minZoom: 0,
            maxZoom: 13});
        var miniMap = new L.Control.MiniMap(OSM2, {
            toggleDisplay: true,
            position: 'topright'
        }).addTo(map);


    //leaflet-graphicscale-master Plugin
        var graphicScale = L.control.graphicScale({
            doubleLine: false,
            fill: 'hollow',
            showSubunits: false,
            position: 'bottomright'
        }).addTo(map);


        //Leaflet-IconLayers-master Plugin
            var layers = [];
            for (var providerId in providers) {
                layers.push(providers[providerId]);
            }
            layers.push({
                layer: {
                    onAdd: function() {},
                    onRemove: function() {}
                },
                title: 'empty'
            })
            var ctrl = L.control.iconLayers(layers).addTo(map);



    //sidebar-v2-master Plugin
    // var sidebar = L.control.sidebar('sidebar', {position: 'left'}).addTo(map);

     //leaflet-locationfilter-master Plugin
    // var locationFilter = new L.LocationFilter().addTo(map);

    // Leaflet.ZoomLabel-master plugin
    L.control.zoomLabel({
        position: 'bottomleft'
    }).addTo(map);


    // LULC layers (WMS)
    var server = 'http://localhost:8080/geoserver/LULC/wms',
        workspace = "LULC:",
        format = 'image/png',
        transparent = true,
        version ='1.3.0',
        tiled = true,
        CRS = "EPSG:3035",
        bbox = "",
        width ="" ,
        height = "" ;

    // there is a problem on geoserver to set up a custom style - it seems to shift the color classes for discrete colortables - for this reason it is been using only the defaul raster style
    var LULC_layers = ["NUTS0", "GLC_00","Corine_06", "Atlas_06", "GlobCover_09", "MODIS_10", "CCIESA_10", "GLand30_10"];
    var LULC_styles = ["NUTS0", "raster","raster", "Atlas_06", "raster", "raster", "raster", "raster"];

    // loop through LULC_Layers
    $.each(LULC_layers, function (index, obj) {

        var title = LULC_layers[index],
            id = title,
            layer = workspace + title,
            styles = LULC_styles[index],
            zIndex = 100 - index;

        // Add parameters to object
        wmsObj (id, title, server, version, layer, bbox, width, height, CRS, format, transparent, tiled, styles, zIndex)

        // Create leaflet variables for each layer
        wmsLeaflet(title);

      });

    //   WFS Implementation
      //
    //   var owsrootUrl = 'http://localhost:8080/geoserver/LULC/ows';
      //
    //   var defaultParameters = {
    //       service : 'WFS',
    //       version : '2.0.0',
    //       request : 'GetFeature',
    //       typeName : 'LULC:paris',
    //       outputFormat : 'text/javascript',
    //       format_options : 'callback:getJson',
    //       SrsName : 'EPSG:3035'
    //   };

    //   var geojsonLayer = new L.GeoJSON();
     //
    //  function getJson(data) {
    //      console.log("WFS works: ", data)
    //      geojsonLayer.addData(data).addTo(map);
    //  }
     //
    //  $.ajax({
    //      url: "http://localhost:8080/geoserver/LULC/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=lulc:at002l_graz&maxFeatures=50&outputFormat=json&format_options=callback:getJson",
    //      dataType: 'json',
    //      jsonpCallback: 'getJson',
    //      success: getJson,
    //  });

    //  map.addLayer(geojsonLayer);


    // var NUTS0 = L.tileLayer.wms(server, {
    //     layers: 'LULC:NUTS0',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     styles: 'NUTS0',
    //     zIndex: "100",
    // });
    //
    //     console.log(NUTS0);
    //
    // var GLC_00 = L.tileLayer.wms(server, {
    //     layers: 'LULC:GLC_00',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "30",
    // });
    //
    // var Corine_06 = L.tileLayer.wms(server, {
    //     layers: 'LULC:Corine_06',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "29",
    // });
    //
    // var Atlas_06 = L.tileLayer.wms(server, {
    //     layers: 'LULC:Atlas_06',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "28",
    //     minZoom: 8
    // });
    //
    //
    // var GlobCover_09 = L.tileLayer.wms(server, {
    //     layers: 'LULC:GlobCover_09',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "27",
    // });
    //
    // var MODIS_10 = L.tileLayer.wms(server, {
    //     layers: 'LULC:MODIS_10',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "26",
    // });
    //
    // var CCIESA_10 = L.tileLayer.wms(server, {
    //     layers: 'LULC:CCIESA_10',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "25",
    // });
    //
    // var GLand30_10 = L.tileLayer.wms(server, {
    //     layers: 'LULC:GLand30_10',
    //     format: 'image/png',
    //     transparent: true,
    //     version: '1.3.0',
    //     tiled:true,
    //     zIndex: "24",
    //
    // });

    // WMS Custom

    // var Custom_host = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&';
    var Custom_host = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&';

    // var parser = new ol.format.WMSCapabilities(Custom_host);

    // 	var CustomWMS = L.tileLayer.wms(Custom_host, {
    // 		layers: 'GE.CARTAGEOLOGICA',
    // 		format: 'image/png',
    // 		transparent: true,
    // 		version: '1.3.0',
    // 		tiled:true,
    //        srs:"EPSG:4326"
    //    });

    // console.log (CustomWMS);
