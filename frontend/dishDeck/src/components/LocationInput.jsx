import { useState, useEffect } from "react";
import axios from "axios";

function LocationInput({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchSuggestions = async (e) => {
      try {
        const res = await axios.get(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(
            query
          )}&limit=5`,
          { signal: controller.signal }
        );
        // console.log(res);
        const data = res.data;
        setResults(data.features);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching locations:", err);
        }
        console.log(err);
      }
    };
    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);
  const handleSelect = (place) => {
    setSelected(place.properties.name);
    setQuery(place.properties.name);
    setResults([]);
    onSelect(place); // pass full place object to parent
  };
  return (
    <div className="relative">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Search for a location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="absolute bg-white border rounded shadow-md mt-1 z-10 w-full">
          {results.map((place, i) => (
            <li
              key={i}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.properties.name},{" "}
              {place.properties.city ||
                place.properties.state ||
                place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
