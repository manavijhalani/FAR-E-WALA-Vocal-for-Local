import './App.css';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Sidebar from './sidebar';


function Map() {
  const geolocation = () => {
    document.getElementById('buttondisable').style.visibility = 'hidden';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const haversine = (vendorlat, vendorlong, mypositionlat, mypositionlong) => {
    const R = 6371; // Radius of the Earth in kilometers

    const Lat1 = toRadians(vendorlat);
    const Lat2 = toRadians(mypositionlat);
    const Long1 = toRadians(vendorlong);
    const Long2 = toRadians(mypositionlong);

    const ΔLat = Lat2 - Lat1;
    const ΔLong = Long2 - Long1;

    const a = Math.sin(ΔLat / 2) * Math.sin(ΔLat / 2) +
              Math.cos(Lat1) * Math.cos(Lat2) *
              Math.sin(ΔLong / 2) * Math.sin(ΔLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    console.log(distance); // Output distance in kilometers

    return distance;
  };

  function success(position) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXZpMTIzIiwiYSI6ImNsc3hjdjAzcTAxb3kycXAya3IyNnl3djgifQ.vyfIAPnhABA9sgvga4F6XA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 8
    });

    const marker = new mapboxgl.Marker({ color: "black" });
    marker.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);

    let vendors = [
      ['Ram Fruits', 19.0760, 72.8777],
      ['PZ Panipuri', 19.0822, 72.8816],
      ['shyamsabzi', 19.2077, 72.8626]
    ];

    map.on('load', function () {
      vendors.forEach(function (vendor) {
        let dist = haversine(vendor[1], vendor[2], position.coords.latitude, position.coords.longitude);
        console.log(dist);
        if (dist <= 10) {
          const marker = new mapboxgl.Marker({ color: "blue" });
          marker.setLngLat([vendor[2], vendor[1]]); // [lng, lat] format
          marker.textContent = vendor[0];
          marker.addTo(map);

          const popup = new mapboxgl.Popup({ offset: 15 })
            .setHTML(`<h5>${vendor[0]}</h5>`);

          marker.setPopup(popup);

          // Open the popup by default
          popup.addTo(map);
        }
      });
    });
  }

  function error() {
    alert("Something went wrong");
  }

  return (
  <>
   <button class="location-button" id='buttondisable' onClick={geolocation}>Get location</button>
  <div className="map-container">
    <div className="map" id="map"></div>
    <Sidebar />
  </div>
 
  </>
  );
}

export default Map;