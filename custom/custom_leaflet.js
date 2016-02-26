	// Leaflet.zoomslider-0.6.1 plugin (slide bar)
	var map = L.map('map1').setView([56, 20]);

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
	var sidebar = L.control.sidebar('sidebar', {position: 'left'}).addTo(map);

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

	var GLC2000 = L.tileLayer.wms(host, {
		layers: 'LULC:GLC2000',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "30",
	});

	var Corine06 = L.tileLayer.wms(host, {
		layers: 'LULC:Corine06',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "29",
	});

	var Atlas2006 = L.tileLayer.wms(host, {
		layers: 'LULC:paris',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "28",
		minZoom: 8
	});


	var GlobCover = L.tileLayer.wms(host, {
		layers: 'LULC:GlobCover',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "27",
	});

	var MODIS10 = L.tileLayer.wms(host, {
		layers: 'LULC:MODIS10',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "26",
	});

	var CCI_ESA = L.tileLayer.wms(host, {
		layers: 'LULC:CCI_ESA',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "25",
	});

	var GLand30 = L.tileLayer.wms(host, {
		layers: 'LULC:GLand30',
		format: 'image/png',
		transparent: true,
		version: '1.3.0',
		tiled:true,
		zIndex: "24",

	});




// WFS Implementation

// var owsrootUrl = 'http://localhost:8080/geoserver/LULC/ows';

// var defaultParameters = {
    // service : 'WFS',
    // version : '1.0.0',
    // request : 'GetFeature',
    // typeName : 'LULC:paris',
    // outputFormat : 'text/javascript',
    // format_options : 'callback:getJson',
    // SrsName : 'EPSG:4326'
// };

// var parameters = L.Util.extend(defaultParameters);
// var URL = owsrootUrl + L.Util.getParamString(parameters);

// console.log (URL)

// var WFSLayer = null;
// var ajax = $.ajax({
    // url : URL,
    // dataType : 'jsonp',
    // jsonpCallback : 'getJson',
    // success : function (response) {
        // WFSLayer = L.geoJson(response, {
            // style: function (feature) {
                // return {
                    // stroke: true,
					// color: 'black',
                    // fillColor: '000000',
                    // fillOpacity: 0,
					// weight: 2
                // };
            // },
            // onEachFeature: function (feature, layer) {
                // popupOptions = {maxWidth: 200};
                // layer.bindPopup(feature.properties.Country
                    // ,popupOptions);
            // }
        // }).addTo(map);
    // }
// });


// WMS Custom

//    var Custom_host =
    // var Custom_host = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&';



//var parser = new ol.format.WMSCapabilities(Custom_host);

	// var CustomWMS = L.tileLayer.wms(Custom_host, {
		// layers: 'GE.CARTAGEOLOGICA',
		// format: 'image/png',
		// transparent: true,
		// version: '1.3.0',
		// tiled:true,
       // srs:"EPSG:4326"
	// });

//console.log (CustomWMS);

//http://stackoverflow.com/questions/29595947/openlayers-v3-4-getting-layer-bounding-box-and-crs-data-from-geoserver

//    var url = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&service=wms&request=getCapabilities&version=1.3.0';
//
//    var parser = new ol.format.WMSCapabilities();
//
//    var Get_URL_1, Get_Layer_1;
//
//    $.ajax(url).then(function (response) {
//        var result = parser.read(response);
//        var Get_URL = result.Service.OnlineResource;
//        var Get_Layer = result.Capability.Layer.Name;
//
//        window.Get_URL_1 = Get_URL;
//        window.Get_Layer_1 = Get_Layer;
//
////        console.log('Layers: ' + Get_Layer_1);
////        console.log('URL: ' + Get_URL_1);
//
//    });
//
//
//
//
//$.ajax({
//        url: url,
//        success: function (response) {
//            var result = parser.read(response);
//            var Get_URL = result.Service.OnlineResource;
//            var Get_Layer = result.Capability.Layer.Name;
//        },
//        error: function () {
//            console.log('error ajax')
//        }
//    }); // ajax synchronus request
//



//	var CustomWMS = L.tileLayer.wms(Get_URL, {
//		layers: Get_Layer,
//		format: 'image/png',
//		transparent: true,
//		version: '1.3.0',
//		tiled:true,
//        srs:"EPSG:4326"
//	});


//    console.log('Layers: ' + Get_URL);
//    console.log('URL: ' + Get_Layer);
