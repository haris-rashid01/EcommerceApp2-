import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export default function MapComponent({ lng, lat }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl());
  }, [lng, lat]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "300px", marginTop: "20px", borderRadius: "10px" }}
    />
  );
}
