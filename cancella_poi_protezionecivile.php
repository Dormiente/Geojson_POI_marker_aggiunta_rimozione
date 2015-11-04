<?php
//$animals = '{
// "0":{"kind":"mammal","name":"Pussy the Cat","weight":"12kg","age":"5"},
// "1":{"kind":"mammal","name":"Roxy the Dog","weight":"25kg","age":"8"},
// "2":{"kind":"fish","name":"Piranha the Fish","weight":"1kg","age":"1"},
// "3":{"kind":"bird","name":"Einstein the Parrot","weight":"0.5kg","age":"4"}
// }';

//$animals = json_decode($animals, true);
//foreach ($animals as $key => $value) {
//    if (in_array('Piranha the Fish', $value)) {
//        unset($animals[$key]);
//    }
//}
//$animals = json_encode($animals);


$indice=$_GET['lunghezza'];
// richiama il file geojson con delle geometrie presenti
$inp = file_get_contents('poi_protezionecivile.geojson');
// decodifica il file geojson
$tempArray = json_decode($inp, true);
//elimino l'elemento alla posizione$indice dall'array $tempArray
unset( $temp_Array[ $indice ] ); 
// encode del vecchio file geojson e degli array da aggiungere
$jsonData = json_encode($tempArray, JSON_NUMERIC_CHECK);
file_put_contents('poi_protezionecivile.geojson', $jsonData);




//Note that it is possible to remove a single feature from a GeoJSON layer. As @mourner mentions above, L.GeoJSON inherits from L.LayerGroup, which supports removing single layers.

//Add an onEachFeature handler for the GeoJSON layer to keep track of the layers associated with a feature (putting them in a map where the feature is the key and the layer is the value, for example), and then use L.LayerGroup's removeLayer to remove them.

//A simplistic example of this: http://jsfiddle.net/MLuc3/3/

//@mourner any particular reason this issue is still open? Any plans on reworking the API? I'd vore for closing.

// geojson = L.geoJson(null, {
//        onEachFeature: function(feature, layer) {
//            layer.on('click', function() {
//                geojson.removeLayer(layer);
//            });
//        }
//    }).addTo(map);

?>
