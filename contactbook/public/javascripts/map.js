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

    contactMap.invalidateSize();
}

// // ***********************mark the map********************************
// /**
//  * Mark(contacts): marks the map with the contact addresses given 
// //  */

const Mark = async (contacts) => {
    var markers = [];
    for (contact in contacts) {
       
        // mark each address co-ordinates
        const contactObj = contacts[contact];
        
        const latitude = contactObj.latitude;
        const longitude = contactObj.longitude;

        console.log(contactObj.street, latitude);

        markers.push([latitude, longitude]);

        // add Tooltip to each marker
        var marker = L.marker([latitude, longitude]);
        const info =
            `Contact Name: ${contactObj.prefix}  ${contactObj.firstName}  ${contactObj.lastName} \ Address: ${contactObj.street}  ${contactObj.city}  ${contactObj.state}  ${contactObj.zip}`;

        marker.bindTooltip(JSON.stringify(info)).openTooltip().addTo(contactMap);

    }
    // focus map-radius according to the contacts in the list 
    var bounds = new L.LatLngBounds(markers);
    contactMap.fitBounds(bounds);
   
    contactMap.invalidateSize();
} 

// // ***********************recenter the map********************************
// /**
//  * Recenter(contact): recenters map to the location passed 
// //  */
const Recenter = (contact) => {
    const latitude = contact.latitude;
    const longitude = contact.longitude;
    contactMap.flyTo([ latitude, longitude], 10);  
}


