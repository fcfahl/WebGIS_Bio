    // zoom configuration
    var map = L.map('map').setView([56, 20]);
    // console.log('map:' + map)

	map.fitBounds([
		[36.5, -20],
		[68, 60]
	]);


    // Leaflet.ZoomBox-master plugin
    var control = L.control.zoomBox({
        modal: false,  // If false (default), it deactivates after each use.
                  // If true, zoomBox control stays active until you click on the control to deactivate.
                // position: "topleft",
                // className: "customClass"  // Class to use to provide icon instead of Font Awesome
    }).addTo(map);


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

    var host = 'http://localhost:8080/geoserver/LULC/wms';

    var NUTS0 = L.tileLayer.wms(host, {
        layers: 'LULC:NUTS0',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        styles: 'NUTS0',
        zIndex: "100",
    });

    var GLC_00 = L.tileLayer.wms(host, {
        layers: 'LULC:GLC_00',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "30",
    });

    var Corine_06 = L.tileLayer.wms(host, {
        layers: 'LULC:Corine_06',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "29",
    });

    var Atlas_06 = L.tileLayer.wms(host, {
        layers: 'LULC:Atlas_06',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "28",
        minZoom: 8
    });


    var GlobCover_09 = L.tileLayer.wms(host, {
        layers: 'LULC:GlobCover_09',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "27",
    });

    var MODIS_10 = L.tileLayer.wms(host, {
        layers: 'LULC:MODIS_10',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "26",
    });

    var CCIESA_10 = L.tileLayer.wms(host, {
        layers: 'LULC:CCIESA_10',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "25",
    });

    var GLand30_10 = L.tileLayer.wms(host, {
        layers: 'LULC:GLand30_10',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tiled:true,
        zIndex: "24",

    });

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
