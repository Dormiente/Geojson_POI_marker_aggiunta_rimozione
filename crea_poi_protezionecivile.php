<?php
//il file geojeson deve essere formattato come sotto
//{"type":"FeatureCollection","features":[]}
$tipo=$_GET['tipo'];
$lat=$_GET['lat'];
$lng=$_GET['lng'];
$lunghezza=$_GET['lunghezza'];

//$id=$_GET['id'];
// richiama il file geojson con delle geometrie presenti
$inp = file_get_contents('poi_protezionecivile.geojson');
// decodifica il file geojson
$tempArray = json_decode($inp, true);
// preprara l'array strutturato come definito per i file geojson
$feature = array(
  'type' => 'Feature',
  # Pass other attribute columns here
  'properties' => array(
      'tipo' => $tipo,
	  'lunghezza' => $lunghezza


  ),
  'geometry' => array(
      'type' => 'Point',
      # Pass Longitude and Latitude Columns here
      //riceve le coordinate "nascoste" dal popup del POI
      'coordinates' => array($lng,$lat)
  )
);
# Add feature arrays to feature collection array
array_push($tempArray['features'], $feature);
// encode del vecchio file geojson e degli array da aggiungere
$jsonData = json_encode($tempArray, JSON_NUMERIC_CHECK);
file_put_contents('poi_protezionecivile.geojson', $jsonData);
?>
