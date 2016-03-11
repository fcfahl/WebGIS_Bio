	function updateOpacity(layer) {	
		myVar = eval(layer.id);	
        var _leaflet_id = layer.id;
        
//		console.log ('Value: ' + layer.value + ', myLayers: ' + _leaflet_id + ', id: ' + layer);			
	
		if (_leaflet_id) {
			myVar.setOpacity(layer.value);
		}
	};
	
	
function sortLegend() {
    // http://stackoverflow.com/questions/10020881/order-divs-based-on-an-attribute-value-in-jquery

    var $wrapper = $('.unsorted');

    $wrapper.find('.leg').sort(function (a, b) {
        return +a.getAttribute('rel') - +b.getAttribute('rel');
    })
        .appendTo($wrapper);

};


function sortTable() {
    var $wrapper = $('.order_Table');

    $wrapper.find('.tbl').sort(function (a, b) {
        return +a.getAttribute('rel') - +b.getAttribute('rel');
    })
        .appendTo($wrapper);

};

function sortOpacity() {
    var $wrapper = $('.order_Slider');

    $wrapper.find('.opy').sort(function (a, b) {
        return +a.getAttribute('rel') - +b.getAttribute('rel');
    })
        .appendTo($wrapper);

};

$("#LULC").sortable({

    update: function (e, ui) {
        $("#LULC div").each(function (i, elm) {

            var name = ($(this).attr('id')),
                index = i,
                ID_leg = ("leg_" + name),
                ID_table = ("tbl_" + name),
                ID_opacity = ("opy_" + name),
                index_ID = (100 - index);
        
            // window.alert(  'name: ' +  name + '  index : ' +  index + '  n : ' +  i);

            eval(name).setZIndex(index_ID);

            //ADMlayer always on top
            eval("NUTS0").setZIndex(1000);

            var x = document.getElementById(ID_leg),
                y = document.getElementById(ID_table);
                z = document.getElementById(ID_opacity);
            //var value = x.getAttribute("rel");		

            if (x.hasAttribute("rel")) {
                x.setAttribute("rel", index);
            }

            if (y.hasAttribute("rel")) {
                y.setAttribute("rel", index);
            }
            
            if (z.hasAttribute("rel")) {
                z.setAttribute("rel", index);
            }

            //var x2 = document.getElementById(ID_leg);  
            //var value2 = x.getAttribute("rel");	

            sortLegend();
            sortTable();
            sortOpacity();

        });
    }
});

function expand(className) {

    if ($(className).is(':visible')) {
        $(className).hide();
    } else {
        $(className).show();
    }
};

function showLegend(ID) {
    
    var legend = 'leg_' + ID,
        table = 'tbl_' + ID,
        opacity = 'opy_' + ID,
        leg_ID = document.getElementById(legend),
        tbl_ID = document.getElementById(table),
        opy_ID = document.getElementById(opacity);    
    
    if(leg_ID.style.display == 'block'){
        leg_ID.style.display = 'none';
        tbl_ID.style.display = 'none';
        opy_ID.style.display = 'none';        
    } else {
        leg_ID.style.display = 'block';
        tbl_ID.style.display = 'block';
        opy_ID.style.display = 'block';
    }
};


$("input[type='checkbox']").change(function(){

    var ID = $(this).attr('value'),
        legend = '#leg_' + ID,
        slider = '#opy_' + ID,
        table = '#tbl_' + ID,
        boxes = $(":checkbox:checked"),
        nboxes = $(":checkbox:not(:checked)");

    // Show Oppacity heading	
        if (boxes.length > 0){
            $('#slider_Bar').show();
        } else {
            $('#slider_Bar').hide();
        }
    
    showLegend (ID);

    if($(this).is(":checked")){
        $(this).parent().addClass("checkedBackground"); 

        

    }else{
        $(this).parent().removeClass("checkedBackground");

  
    }
});
	
	

$("input").click(function (event) {
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


