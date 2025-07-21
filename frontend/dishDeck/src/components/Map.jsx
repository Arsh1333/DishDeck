import { useState, useEffect, useRef } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttservices from "@tomtom-international/web-sdk-services"; // Your existing import

function Map() {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = import.meta.env.VITE_TOM_TOM_API_KEY; // Replace with your actual API key

  useEffect(() => {
    // Initialize the map
    const newMap = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: [72, 18], // Initial center
      zoom: 1,
    });
    setMap(newMap);

    return () => {
      if (newMap) newMap.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    console.log(ttservices);
    console.log(ttservices.services);

    try {
      // Corrected usage: Access fuzzySearch through ttservices.services
      const response = await ttservices.services.fuzzySearch({
        key: API_KEY,
        query: searchTerm,
      });

      if (response.results && response.results.length > 0) {
        const firstResult = response.results[0];
        const { position } = firstResult;

        // Move the map to the found location
        if (map) {
          map.setCenter([position.lng, position.lat]);
          map.setZoom(14); // Adjust zoom level as needed
          // Optionally, add a marker
          new tt.Marker().setLngLat([position.lng, position.lat]).addTo(map);
        }
      } else {
        console.log("No results found for:", searchTerm);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter place name"
      />
      <button onClick={handleSearch}>Search</button>
      <div ref={mapElement} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
}

export default Map;
