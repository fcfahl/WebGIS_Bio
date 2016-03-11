popupContent = function(data,markers) {
    return "<strong>" +data.title +"</strong><br><img src='"+ data.url_s+"'>"|| null;
 };

// jsonLayer = new L.LayerJSON({
//      url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=78a6ce549b86483a335a3377a3765ef0&text=italia&has_geo=1&extras=geo,url_s&per_page=100&page=1&format=json&nojsoncallback=1',
//      propertyItems: 'photos.photo',
//      propertyLoc: ['latitude','longitude'],
//      buildPopup: popupContent,
// });

// map.addLayer(jsonLayer);


https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=78a6ce549b86483a335a3377a3765ef0&text=bus&lat=34.0194543&lon=-118.4911912&extras=geo,url_t,url_m&radius=20&radius_units=mi&per_page=20&jsoncallback=?
