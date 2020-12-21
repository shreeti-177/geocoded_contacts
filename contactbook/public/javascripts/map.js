var contactMap = null;
const access_token = "pk.eyJ1Ijoic3NocmVzMTUiLCJhIjoiY2tpMXlpYnY0MGtpdDJwcW5hNTFsejAzZSJ9.AxbuGorzAC5et3_WurZNrQ";


// // ***********************initialize the map********************************
// /**
//  * init_map(): sets up a new map 
// //  */
const initMap = () => {
    contactMap = L.map('mapid').setView([51.505, -0.09], 8);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: access_token
    }).addTo(contactMap);

    // 
    // contactMap.invalidateSize();
} 

const Mark = async (contacts) => {
    for (contact in contacts) {
        var marker = await L.marker([latitude, longitude]).addTo(contactMap); 
    }
}

const Recenter = (contact) => {
    const latitude = contact.latitude;
    const longitude = contact.longitude;
    contactMap.flyTo([ latitude, longitude], 8);  
}






// // // //maps the lat/long coordinates to the map and recenters the view.
// // const mark_location = (features) => {
    
// //     // const text_address = features.;
// //     const longitude = features.latitude;
// //     const latitude = features.longitude;
    
// //     var marker = L.marker([latitude, longitude]).addTo(mymap);
// //     recenter(latitude, longitude); 

// //     //add the new address to the list
// //     const list = document.getElementsByTagName('ul')[0];
// //     const matches = list.querySelectorAll(`li[data-latitude='${latitude}'`, `data-longitude='${longitude}']`);

// //     //if address is already on the list, recenter to that address.
// //     if (matches.length > 0) {
// //         recenter(latitude, longitude);
// //         return;
// //     }

// //     const li = document.createElement('li');
// //     text = document.createTextNode(`${text_address}`);

// //     li.appendChild(text);
// //     li.setAttribute("data-latitude", latitude);
// //     li.setAttribute("data-longitude", longitude);
// //     li.addEventListener("click", function () {
// //         recenter(li.dataset.latitude, li.dataset.longitude);
// //     });
// //     list.appendChild(li);

// // }

// // //recenter to addresses already in the list

// // //distinguish the start page and the one with previous search results
// // const mask = (search, results) => {
// //     document.getElementById("first_search").style.display = search ? "block" : "none";
// //     document.getElementById("search_results").style.display = results ? "block" : "none";
// // }

// // //show the start page and prompt the user for a new search
// // const showStart = () => {
// //     mask(true, false);
// //     document.querySelectorAll('input').forEach(e => e.value = "");
// // }

// // //show the previous search result
// // const showResults = () => {
// //     mask(false, true);
// //     mymap.invalidateSize();
// //     document.querySelectorAll('input').forEach(e => e.value = "");
// // }