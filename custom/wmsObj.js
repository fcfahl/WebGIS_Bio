// Storage the WMS object in the html local storage
// http://thejackalofjavascript.com/storing-objects-html5-local-storage/
function wmsObj (id, title, server, version, layers, bbox, width, height, CRS, format, transparent, tiled, styles, zIndex){

    var getMap_join = server + "version=" + version + "&request=GetMap&layers=" + layers + "&bbox=" + bbox + "&width=" + width + "&height=" + height + "&srs=" +  CRS + "&format=" + format;

    var args  = {
        "id": id,
        "title": title,
        "server": server,
        "layers": layers,
        "format": format,
        "transparent": transparent,
        "version": version,
        "tiled": tiled,
        "crs": CRS,
        "zIndex": zIndex,
        "styles": styles,
        "getMap":  getMap_join,
        };

        // var wmsLayer  = L.tileLayer.wms(server, {
        //     "layers": layers,
        //     "format": format,
        //     "transparent": transparent,
        //     "version": version,
        //     "tiled": tiled,
        //     "styles": styles,
        //     "zIndex": zIndex,
        //     "crs": SRS,
        // });

    localStorage.setItem(title, JSON.stringify(args));

    // console.log(args);
};

function wmsLeaflet (obj){

    var wmsLayer = JSON.parse(localStorage.getItem(obj));
    var id = wmsLayer.id;
    var arg = {
        layers: wmsLayer.layers,
        format: wmsLayer.format,
        transparent: wmsLayer.transparent,
        version: wmsLayer.version,
        tiled: wmsLayer.tiled,
        styles: wmsLayer.styles,
        zIndex: wmsLayer.zIndex,
        // crs: wmsLayer.CRS,
    };

    // Convert object parameters to Leaflet object
    window[id] = L.tileLayer.wms(wmsLayer.server, arg);

    // console.log((window[id]) , " : " , JSON.stringify(window[id]));
    // console.log(wmsLayer.layers);
    // console.log(Corine_06);
};
