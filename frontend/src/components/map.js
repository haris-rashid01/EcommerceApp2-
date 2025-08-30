import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MyMap() {
  return (
    <MapContainer center={[31.5204, 74.3587]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[31.5204, 74.3587]}>
        <Popup>
          Lahore - Delivery Location
        </Popup>
      </Marker>
    </MapContainer>
  );
}
