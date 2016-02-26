
parser = new DOMParser();
xmlDoc = parser.parseFromString('http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Carta_geologica.map&service=wms&request=getCapabilities&version=1.3.0',"text/xml");

document.getElementById("CustomWMS").innerHTML =
xmlDoc.getElementsByTagName("layer")[0].childNodes[0].nodeValue;