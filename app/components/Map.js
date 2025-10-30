"use client";

import { defaultIcon } from "@/leadlet.config";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map({ mock, position, setPosition, selectedIssue }) {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [isClient, setIsClient] = useState(false);
  let center = selectedIssue ? selectedIssue.coords : position;
  if ((lat, lng)) {
    center = { lat, lng };
  }
  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    import("@/leadlet.config");
  }, []);
  if (!isClient) return <p>Loading map...</p>;
  return (
    <MapContainer
      className="w-full h-full md:h-full md:w-full"
      center={center}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Centering position={center} />
    </MapContainer>
  );
}

function Centering({ position }) {
  const map = useMap();
  map.setView({ lat: position.lat, lng: position.lng });
}
