 function OpenLoginPopup() {
                var divToOpen = "loginDiv";
                var popupSetting = { width: '204', height: '400', title: 'Sign Up',isFixed:true };
                ShowPopup(divToOpen, popupSetting);
            }
 function OpenLogin2Popup() {
                var divToOpen = "loginDiv2";
                var popupSetting = { width: '350', height: '400', title: 'Sign Up',isFixed:true };
                ShowPopup(divToOpen, popupSetting);
            }
            // Function to Show Div Popup
            function ShowPopup(divId, popupSetting) {

                var divElt = document.getElementById(divId);
                divElt.style.display = 'block';
                var element = divElt.parentElement;
                popupSetting = popupSetting || {};

                if (!popupSetting.width) { popupSetting.width = divElt.offsetWidth };
                if (!popupSetting.height) { popupSetting.height = divElt.offsetHeight };
                if (!popupSetting.title) { popupSetting.title = 'Dialog' };

                var table = document.createElement('table');
                table.setAttribute('id', 'table' + divId);table.setAttribute('cellspacing', '0');table.setAttribute('cellpadding', '0');

                var tr1 = document.createElement('tr'); tr1.className = 'PopupHeader';
                var td1 = document.createElement('td');
                var span = document.createElement('span'); span.innerHTML = popupSetting.title;
                span.setAttribute('style', 'font-size: 20px; font-weight: 400;');
                td1.appendChild(span); tr1.appendChild(td1); table.appendChild(tr1);

                var tr2 = document.createElement('tr');
                var tdDynamic = document.createElement('td');
                tdDynamic.setAttribute('align', 'center');
                tdDynamic.setAttribute('style', 'padding-top: 20px; vertical-align:top;');

                var tempElt = document.createElement('div');
                tempElt.setAttribute('id', 'tempElt' + divElt.id);
                divElt.parentElement.insertBefore(tempElt, divElt);

                tdDynamic.appendChild(divElt);
                tr2.appendChild(tdDynamic);
                table.appendChild(tr2);
                var cssText = 'display: block; border-radius:10px; -webkit-border-radius:10px; -o-border-radius:10px; -moz-border-radius:10px; border:1px solid #dde1e5;  z-index:92000; background-color:#383a4c; top:50%; left:50%; text-align:left;';
                cssText += 'width: ' + popupSetting.width + 'px; height: ' + popupSetting.height + 'px; margin-left: -' + Math.round(popupSetting.width / 2) + 'px; margin-top: -' + Math.round(popupSetting.height / 2) + 'px;';

                if (popupSetting.isFixed === true) { cssText += 'position: fixed;';}
                else { cssText += 'position: absolute;'; }

                table.setAttribute('style', cssText);
                element.appendChild(table);

                var shadeElt = document.createElement('div');
                shadeElt.id = "ShadedBG";shadeElt.className = "ShadedBG";
                tempElt.appendChild(shadeElt);
                var myEl = document.getElementById('ShadedBG');

                myEl.addEventListener('click', function () {
                    ClosePopupDiv('loginDiv');
                }, false);
                 myEl.addEventListener('click', function () {
                    ClosePopupDiv('loginDiv2');
                }, false);

            }

            // Function to Close Div Popup
            function ClosePopupDiv(divId) {
                var table = document.getElementById('table' + divId);
                var element = table.parentElement;
                var divElt = document.getElementById(divId);
                divElt.style.display = 'none';
                var tempElt = document.getElementById('tempElt' + divId);
                tempElt.parentElement.insertBefore(divElt, tempElt);
                table.parentElement.removeChild(table);
                table.setAttribute('style', 'display: none');
                tempElt.parentElement.removeChild(tempElt);
            }


function initialize() {

  var markers = [];
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(38.998334,-76.9372489),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(39.0217, -76.9871),
      new google.maps.LatLng(38.9550, -76.9012));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);

    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

function showmap(){
  document.getElementById("map-canvas").style.visibility="visible";
  document.getElementById("map-container").style.height="450px";
  document.getElementById("map-container").style.padding="10px 10px 10px 10px";
}

function hidemap(){
  document.getElementById("map-canvas").style.visibility="hidden";
  document.getElementById("map-container").style.height="50px";
  document.getElementById("map-container").style.padding="10px 0px 10px 10px";
}