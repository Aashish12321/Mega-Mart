import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";

// Custom marker icon for location select
const redIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const kathmanduCoords = {
  lat: 27.708317,
  lng: 85.3205817,
};

const MapClickHandler = ({ setCoordinates, setAddress, calculateDistance }) => {
  const map = useMap();

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng });

      // Reverse geocoding to get text address from lat, lng
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
          calculateDistance({ lat, lng });
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        setAddress("Error fetching address");
      }
    },
  });

  useEffect(() => {
    if (map) {
      map.flyTo([map.getCenter().lat, map.getCenter().lng], map.getZoom());
    }
  }, [map]);

  return null;
};

const MapComponent = ({ setOrder }) => {
  const [coordinates, setCoordinates] = useState({
    lat: 27.708317,
    lng: 85.3205817,
  });
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef();

  const calculateDistance = async (destCoords) => {
    const apiKey = "5b3ce3597851110001cf6248ed449c315f004c9989df313198de2b7a";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${kathmanduCoords?.lng},${kathmanduCoords?.lat}&end=${destCoords?.lng},${destCoords?.lat}`;
    
    if (destCoords?.lat === kathmanduCoords?.lat){
      setDistance(0.001); // giving dummy custom distance to the kmc office location
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data?.features && data?.features?.length > 0) {
        const distanceInMeters =
          data?.features[0]?.properties?.summary?.distance;
        setDistance(parseFloat(distanceInMeters / 1000).toFixed(3));
      }
    } catch (error) {
      toast.error("Error calculating distance");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setCoordinates(newCoords);
        setAddress(display_name);
        setError(null);

        // Auto zoom to the selected location
        if (mapRef.current) {
          const map = mapRef.current;
          map.flyTo([lat, lon], 13);
        }
        calculateDistance(newCoords);
      } else {
        setError("Location not found. Please enter correct address");
      }
    } catch (err) {
      setError("Error fetching location.");
    }
  };

  useEffect(() => {
    if (address && distance) {
      setOrder((prev) => ({
        ...prev,
        address: address,
        distance: distance,
        shippingCharge:
          prev?.totalWeight < 5 && distance < 5
            ? 50
            : parseInt(50 + distance * 15 + prev?.totalWeight * 10),
      }));
    }
  }, [address, setOrder, distance]);

  useEffect(() => {
    if (address && distance) {
      setOrder((prev) => ({
        ...prev,
        total: prev?.subTotal + prev?.shippingCharge - prev?.couponDiscount,
      }));
    }
  }, [setOrder, distance, address]);

  return (
    <div className="w-full border-2 border-zinc-500 p-2">
      <form
        onSubmit={handleSearch}
        className="w-full mb-2 flex justify-between"
      >
        <input
          type="text"
          placeholder="Search for your location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none rounded-l-full px-4 py-2 bg-zinc-800 text-white"
        />
        <button
          type="submit"
          className="flex px-6 items-center text-center rounded-r-full bg-green-500"
        >
          Search
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={13}
        className="w-full h-80 md:h-96 z-0"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          calculateDistance={calculateDistance}
        />
        <Marker position={[coordinates.lat, coordinates.lng]} icon={redIcon}>
          <Popup>
            <span className="font-semibold">Selected Location : </span> <br />{" "}
            {address || "Fetching address..."}
          </Popup>
        </Marker>
      </MapContainer>
      {address && (
        <div>
          <span className="font-semibold">Selected Address : </span>
          <span>{address}</span>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
