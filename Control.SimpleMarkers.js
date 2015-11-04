//We should start with extending the original class
//
L.Control.SimpleMarkers = L.Control.extend({//dichiarazioni e metodi della classe sono racchiusi tra graffe
    options: {
        position: 'topleft'//control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright' restituisce la posizione rispetto all'oggetto contenitore
    },

    onAdd: function () {        //creo una funzione onAdd alla quale non passo argomenti
        var marker_container = L.DomUtil.create('div', 'marker_controls'); //la funzione crea una variabile marker_container che accede all'albero del DOM,
        //modello a oggetti del documento,al metodo create e genera un elemento con tagName div e className marker_controls
        var add_marker_div_ghiaccio = L.DomUtil.create('div', 'add_marker_control_ghiaccio', marker_container);//la funzione crea una variabile add_marker_div che accede
        //all'albero del DOM, modello a oggetti del documento,al metodo create e genera un elemento con tagName div e className add_marker_control e lo aggiunge
        // a marker_container
        var add_marker_div_frana = L.DomUtil.create('div', 'add_marker_control_frana', marker_container);
        var del_marker_div = L.DomUtil.create('div', 'del_marker_control', marker_container);//la funzione crea una variabile del_marker_div che accede
        //all'albero del DOM, modello a oggetti del documento,al metodo create e genera un elemento con tagName div e className del_marker_control e lo aggiunge
        // a marker_container
        add_marker_div_ghiaccio.title = 'Aggiungi un marker ghiaccio'; //accedo a title di add_marker_div_ghiaccio e lo definisco Add a marker che verrà visualizzato(why?)
        add_marker_div_frana.title = 'Aggiungi un marker frana';
        del_marker_div.title = 'Delete a marker';//accedo a title di del_marker_div e lo definisco Delete a marker che verrà visualizzato(pwhy?)

        L.DomEvent.addListener(add_marker_div_ghiaccio, 'click', L.DomEvent.stopPropagation)//il metodo Aggiunge listener, interfaccia che contiene i metodi relativi
        //al tipo di evento che si vuole intercettare(Una volta creata una implementazione dell' interfaccia basta installarla nel controllo grafico da cui
        //vogliamo intercettare gli eventi)  to the element's DOM click. this keyword inside the listener will point to context,
        // or to the element if not specified
        //il metodo stoppropagation Stop the given event from propagation to parent elements
            .addListener(add_marker_div_ghiaccio, 'click', L.DomEvent.preventDefault)
            .addListener(add_marker_div_ghiaccio, 'click', (function () { this.enterAddMarkerModeGhiaccio() }).bind(this));

        L.DomEvent.addListener(add_marker_div_frana, 'click', L.DomEvent.stopPropagation)
            .addListener(add_marker_div_frana, 'click', L.DomEvent.preventDefault)
            .addListener(add_marker_div_frana, 'click', (function () { this.enterAddMarkerModeFrana() }).bind(this));

        L.DomEvent.addListener(del_marker_div, 'click', L.DomEvent.stopPropagation)
            .addListener(del_marker_div, 'click', L.DomEvent.preventDefault)
            .addListener(del_marker_div, 'click', (function () { this.enterDelMarkerMode() }).bind(this));

        return marker_container; //la funzione mi restituirà marker_container
    },

   enterAddMarkerModeGhiaccio: function () {
        if (markerList !== '') { //se markerlist non è vuota
           for (var marker = 0; marker < markerList.length; marker++) {//inizio un ciclo che per la variabile locale marker che va da 0 a meno della lunghezza di markerlist con incremento 1
                if (typeof(markerList[marker]) !== 'undefined') {//se il tipo di markerlist alla posizione marker è definito
                    markerList[marker].removeEventListener('click', this.onMarkerClickDelete);//markerList in posizione marker rimuove il listener che al click attivava onMarkerClickDelete
                }
            }
        }
        document.getElementById('map').style.cursor = 'crosshair';//metto lo stile del cursore sull'elemento mappa a croce
        map.addEventListener('click', this.onMapClickAddMarkerGhiaccio);//passa alla funzione onMapClickAddMarker
    },

    enterAddMarkerModeFrana: function () {
        if (markerList !== '') {
            for (var marker = 0; marker < markerList.length; marker++) {
                if (typeof(markerList[marker]) !== 'undefined') {
                    markerList[marker].removeEventListener('click', this.onMarkerClickDelete);
                }
            }
        }
        document.getElementById('map').style.cursor = 'crosshair';
        map.addEventListener('click', this.onMapClickAddMarkerFrana);
    },

    enterDelMarkerMode: function () {
        for (var marker = 0; marker < markerList.length; marker++) {
            if (typeof(markerList[marker]) !== 'undefined') {
                markerList[marker].addEventListener('click', this.onMarkerClickDelete);
            }
        }
  canc =1;  },

    onMapClickAddMarkerGhiaccio: function (e) { //la funzione riceve come argomento l'evento e
        map.removeEventListener('click'); // si fa smettere di gestire il click sull'elemento map
        document.getElementById('map').style.cursor = 'auto';// si rimette lo stile del cursore sull'elemento mappa a quello originale

        var popupContent =  "You clicked on the map at " + e.latlng.toString();//creo variabile popupContent e gli inserisco la scritta più la proprietà dell'evento convertito in stringa
        //var the_popup = L.popup({maxWidth: 160, closeButton: false});//creo una variabile the_popup con dimensione data e senza bottone chiusura
        //the_popup.setContent(popupContent); // setContent è un metodo che setta il contenuto HTML del popup

       // var marker = L.marker(e.latlng).addTo(map);// creo una variabile locale marker e gli passo le coordinate e.latlng di L.marker
       //  marker.bindPopup(the_popup).openPopup();

        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var tipo = "ghiaccio";
        console.log(lat);


        var json = $.getJSON("http://localhost/poi_protezionecivile.geojson");
        var id= json.features.length;
  // console.log(json); // this will show the info it in firebug console
var n= function(json)(json.features.length);

    $.getJSON("http://localhost/poi_protezionecivile.geojson",function(json) {
     var lunghezza=json.features.length;
	console.log(e);
       console.log(lunghezza);// this will show the info it in firebug console
    $.getJSON("crea_poi_protezionecivile.php?tipo="+tipo+"&lat="+lat+"&lng="+lng+"&lunghezza="+lunghezza+"");//&id="+id+"
  });

       
       //console.log(lunghezza); // this will show the info it in firebug console


//var id= $.getJSON("http://localhost/poi_protezionecivile.geojson.features.length");

	//	var data = /* your parsed JSON here */
    //  var id = data.food.length;

      //  $.getJSON("crea_poi_protezionecivile.php?tipo="+tipo+"&lat="+lat+"&lng="+lng+"");//&id="+id+"

        carica_geojson();
       // markerList.push(marker);
        return false;

    },

    onMapClickAddMarkerFrana: function (e) { //la funzione riceve come argomento l'evento e
        map.removeEventListener('click'); // si fa smettere di gestire il click sull'elemento map
        document.getElementById('map').style.cursor = 'auto';// si rimette lo stile del cursore sull'elemento mappa a quello originale

        var popupContent =  "You clicked on the map at " + e.latlng.toString();//creo variabile popupContent e gli inserisco la scritta più la proprietà dell'evento convertito in stringa
        //var the_popup = L.popup({maxWidth: 160, closeButton: false});//creo una variabile the_popup con dimensione data e senza bottone chiusura
        //the_popup.setContent(popupContent); // setContent è un metodo che setta il contenuto HTML del popup

       // var marker = L.marker(e.latlng).addTo(map);// creo una variabile locale marker e gli passo le coordinate e.latlng di L.marker
       //  marker.bindPopup(the_popup).openPopup();

        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var tipo = "frana";
        console.log(lat);


        $.getJSON("crea_poi_protezionecivile.php?tipo="+tipo+"&lat="+lat+"&lng="+lng+"");

       // carica_geojson(); //a cosa mi serve se tanto devo rilodare la pagina?
       // markerList.push(marker);
        return false;

    },

    //onMapClickAddMarker: function (e) { //la funzione riceve come argomento l'evento e
        //map.removeEventListener('click'); // si fa smettere di gestire il click sull'elemento map
        //document.getElementById('map').style.cursor = 'auto';// si rimette lo stile del cursore sull'elemento mappa a quello originale

        //var popupContent =  "You clicked on the map at " + e.latlng.toString();//creo variabile popupContent e gli inserisco la scritta più la proprietà dell'evento convertito in stringa
        //var the_popup = L.popup({maxWidth: 160, closeButton: false});//creo una variabile the_popup con dimensione data e senza bottone chiusura
        //the_popup.setContent(popupContent); // setContent è un metodo che setta il contenuto HTML del popup

        //var marker = L.marker(e.latlng);// creo una variabile locale marker e gli passo le coordinate e.latlng di L.marker
        //marker.addTo(map);// aggiungo marker alla mappa
        //marker.bindPopup(the_popup).openPopup();//collego il popup the_popup al percorso dato(marker?) e lo apro
        //markerList.push(marker); // aggiunge marker(variabile locale) a markerlist

        //return false;
    //},

	onMarkerClickDelete: function (e,json) { //la funzione riceve come argomento l'evento e
		map.removeEventListener('click'); // si fa smettere di gestire il click sull'elemento map
        document.getElementById('map').style.cursor = 'auto';// si rimette lo stile del cursore sull'elemento mappa a quello originale
		var pos = 1;//this.propreties.lunghezza;
		//console.log(e);
		console.log(pos);
		$.getJSON("cancella_poi_protezionecivile.php?pos="+lunghezza+"");
		}

//    onMarkerClickDelete: function (e) { //la funzione riceve come argomento l'evento e
//        map.removeLayer(this); //Rimuove il layer dato dalla mappa
//        var marker_index = markerList.indexOf(this); //creo una variabile marker_index e la pongo uguale alla prima occorrenza libera di markerList
//        delete markerList[marker_index]; //cancello il valore in posizione marker_index di markerList

//        for (var marker = 0; marker < markerList.length; marker++) { //inizio un ciclo che per la variabile locale marker che va da 0 a meno della lunghezza di markerlist con incremento 1
//           if (typeof(markerList[marker]) !== 'undefined') {//se il tipo di markerlist alla posizione marker è definito
//               markerList[marker].removeEventListener('click', arguments.callee); //Restituisce l'oggetto Function in esecuzione, ovvero il testo del corpo dell'oggetto Function specificato.
//            }
//        }
//        return false;
//    }
});

var markerList = [];
var canc =0;
