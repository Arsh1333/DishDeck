import { useState, useEffect, useRef } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttservices from "@tomtom-international/web-sdk-services";
import { useLocation } from "react-router-dom";

function Map() {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = import.meta.env.VITE_TOM_TOM_API_KEY;

  const location = useLocation();
  const passedState = location.state;

  const [currentMarker, setCurrentMarker] = useState(null);

  useEffect(() => {
    const newMap = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: [72, 18],
      zoom: 10,
    });
    setMap(newMap);

    return () => {
      if (newMap) newMap.remove();
    };
  }, [API_KEY]);

  // Effect to handle initial search based on passed state
  // useEffect(() => {
  //   console.log(passedState);
  //   if (map && passedState) {
  //     const initialSearchTerm =
  //       passedState.location || passedState.restaurant || passedState.food;
  //     if (initialSearchTerm) {
  //       setSearchTerm(initialSearchTerm);
  //       handleSearch(initialSearchTerm);
  //     }
  //   }
  // }, [map, passedState]); // Re-run when map or passedState changes
  useEffect(() => {
    if (map && passedState) {
      let initialSearchQuery = "";
      if (passedState.restaurant && passedState.location) {
        initialSearchQuery = `${passedState.restaurant}, ${passedState.location}`;
      } else if (passedState.location) {
        initialSearchQuery = passedState.location;
      } else if (passedState.restaurant) {
        initialSearchQuery = passedState.restaurant;
      } else if (passedState.food) {
        initialSearchQuery = passedState.food;
      }

      if (initialSearchQuery) {
        setSearchTerm(initialSearchQuery);
        handleSearch(initialSearchQuery);
      }
    }
  }, [map, passedState]);

  const handleSearch = async (query = searchTerm) => {
    if (!query) {
      console.warn("Search term is empty. Please enter a location.");
      return;
    }

    try {
      const response = await ttservices.services.fuzzySearch({
        key: API_KEY,
        query: query,
        // countrySet: ["IN"], // Example: Restrict search to India
      });

      if (response.results && response.results.length > 0) {
        const firstResult = response.results[0];
        const { position } = firstResult;

        if (map) {
          map.setCenter([position.lng, position.lat]);
          map.setZoom(16);

          if (currentMarker) {
            currentMarker.remove();
          }

          const markerElement = document.createElement("div");
          markerElement.style.width = "24px";
          markerElement.style.height = "24px";
          markerElement.style.backgroundColor = "red";
          markerElement.style.borderRadius = "50%";
          markerElement.style.border = "2px solid white";
          markerElement.style.cursor = "pointer";

          const newMarker = new tt.Marker({
            element: markerElement,
            anchor: "bottom",
          })
            .setLngLat([position.lng, position.lat])
            .addTo(map);

          setCurrentMarker(newMarker);

          const popup = new tt.Popup({ offset: 30 })
            .setLngLat([position.lng, position.lat])
            .setHTML(
              `<h3>${
                passedState?.restaurant || firstResult.address.freeformAddress
              }</h3><p>${passedState?.food || ""}</p>`
            );

          newMarker.setPopup(popup);
          popup.addTo(map);
        }
      } else {
        console.log("No results found for:", query);
        alert(
          "No results found for your search. Please try a different query."
        );
      }
    } catch (error) {
      console.error("Error during search:", error);
      alert("An error occurred during search. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-2">
        <div className="flex-grow">
          <Label
            htmlFor="searchTerm"
            value="Search Location"
            className="sr-only"
          />
          <TextInput
            id="searchTerm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter place name (e.g., Gateway of India, Mumbai)"
            className="w-full"
          />
        </div>
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>
      <div
        ref={mapElement}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
}

export default Map;
