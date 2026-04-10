"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

// 🔥 Dynamic imports (fix SSR issues)
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

// ✅ SAFE DEFAULT (Mumbai)
const DEFAULT_CENTER = {
  lat: 19.076,
  lng: 72.8777,
};

export default function Map({ position, setPosition, selectedIssue }) {
  const searchParams = useSearchParams();

  // ✅ Parse URL params safely
  const latParam = parseFloat(searchParams.get("lat"));
  const lngParam = parseFloat(searchParams.get("lng"));

  // ✅ Build SAFE center (priority order)
  const center = {
    lat:
      typeof position?.lat === "number"
        ? position.lat
        : typeof selectedIssue?.coords?.lat === "number"
        ? selectedIssue.coords.lat
        : typeof latParam === "number" && !isNaN(latParam)
        ? latParam
        : DEFAULT_CENTER.lat,

    lng:
      typeof position?.lng === "number"
        ? position.lng
        : typeof selectedIssue?.coords?.lng === "number"
        ? selectedIssue.coords.lng
        : typeof lngParam === "number" && !isNaN(lngParam)
        ? lngParam
        : DEFAULT_CENTER.lng,
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  // ✅ Leaflet config fix
  useEffect(() => {
    import("@/leadlet.config");
  }, []);

  if (!isClient) return <p>Loading map...</p>;

  return (
    <MapContainer
      className="w-full h-full"
      center={[center.lat, center.lng]} // ✅ FIX: leaflet expects array
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ✅ Only render marker if valid */}
      {!isNaN(center.lat) && !isNaN(center.lng) && (
        <Marker position={[center.lat, center.lng]}>
          <Popup>
            Selected Location <br />
            Lat: {center.lat}, Lng: {center.lng}
          </Popup>
        </Marker>
      )}

      <Centering position={center} />
      <MapClickHandler setPosition={setPosition} />
    </MapContainer>
  );
}

//
// 🔄 Center map safely
//
function Centering({ position }) {
  const map = useMap();

  useEffect(() => {
    if (
      typeof position?.lat === "number" &&
      typeof position?.lng === "number"
    ) {
      map.setView([position.lat, position.lng]);
    }
  }, [position, map]);

  return null;
}

//
// 🖱️ Handle map click
//
function MapClickHandler({ setPosition }) {
  const pathname = usePathname();
  const router = useRouter();

  useMapEvents({
    click: (e) => {
      const newPos = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPosition?.(newPos);

      router.replace(`${pathname}?lat=${newPos.lat}&lng=${newPos.lng}`);
    },
  });

  return null;
}
