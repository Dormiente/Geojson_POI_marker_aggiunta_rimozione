<!DOCTYPE html>
<html>
<head>
    <title>Simple Marker</title>
    <meta charset="utf-8" />
    <link
        rel="stylesheet"
        href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css"
    />
    <link
        rel="stylesheet"
        href="http://localhost/Leaflet.SimpleMarkers-master/lib/Control.SimpleMarkers.css"
    />
    <script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>
    <script src="http://localhost/Leaflet.SimpleMarkers-master/lib/Control.SimpleMarkers.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" ></script> <!--inserimento jquery-->

</head>
<body>




    <div id="map" style="width: 600px; height: 400px"></div><!--div crea una divisione logica nel documento creando una sezione specifica alla quale sto assegnando l'id map che definisco in larghezza e altezza-->

    <script>
    //creo una mappa con relativa posizione e zoom iniziali(http://dbsgeo.com/latlon/)
        var map = L.map('map').setView([45.81216, 8.61173], 13);//var indica che la variabile è locale,ha valore solo all’interno della funzione in cui viene dichiarata. La chiamo map e gli dico che è una mappa da mettere nella divisione(div) con id map e il metodo setview che passa coordinate del centro e livello dello zoom
     //   mapLink =
     //       '<a href="http://openstreetmap.org">OpenStreetMap</a>'; a cosa serve?
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            maxZoom: 18,
            }).addTo(map);

        var marker_controls = new L.Control.SimpleMarkers();//var indica che la variabile è locale,ha valore solo all’interno della funzione in cui viene dichiarata. La chiamo marker_controls e gli dico che è una mappa da mettere nella divisione(div) con id map e il metodo setview che passa coordinate del centro e livello dello zoom
        map.addControl(marker_controls); //aggiunge alla mappa i pulsanti per aggiungere ed eliminare i marker specificati in marker_controls

             // variabile per definire l'icona in base al tipo di punto
        function getStatoIcon(dat) {
          return  dat === 'ghiaccio'? 'http://localhost/Leaflet.SimpleMarkers-master/lib/images/marker_ghiaccio.svg' :
                  dat === 'frana'? 'http://localhost/Leaflet.SimpleMarkers-master/lib/images/marker_frana.svg':
          '';
        }

        // Icona GeoJSON
                function carica_geojson(){
          // carica il file geojson col metodo jQuery
          $.getJSON("poi_protezionecivile.geojson", function(data) {
            var geojson = L.geoJson(data, {
                pointToLayer: function (features, latlng) {
                  // crea un punto e definisce l'icona per ogni punto
                  return L.marker(latlng, {
                      icon: L.icon({
                        iconUrl: getStatoIcon(features.properties.tipo),
                        shadowUrl: 'http://localhost/Leaflet.SimpleMarkers-master/lib/images/ombra-idrante-soprasuolo.png',
                        iconSize:     [40, 80], // size of the icon
                        shadowSize:   [80, 80], // size of the shadow
                        iconAnchor:   [20, 80], // point of the icon which will correspond to marker's location
                        shadowAnchor: [40, 80],  // the same for the shadow
                        popupAnchor:  [0, -80] // point from which the popup should open relative to the iconAnchor
                      }),

                      title: features.properties.tipo,
                      riseOnHover: true
                   });
              }//,


              //funzione per mostrare un popup quando clicco sul marker  con il tipo
          //  onEachFeature: function (features, layer) {
              // if (canc=0) {
              //   layer.bindPopup(features.properties.tipo);
              // }else if (canc=1) {

            //   }

             //}
              //c'è da inserire lo switch per l'eliminazione?
          });//.on('click',function(e){console.log(e)});//.on('click',function(e){console.log(canc)})
            geojson.addTo(map);
          });
        }
        $(document).ready(function() {
          carica_geojson();
             });
    </script>
</body>
</html>
