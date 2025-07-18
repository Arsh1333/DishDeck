import { useState, useEffect } from "react";

function LocationInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      setResults([]);
      return;
    }
  }, [query]);
}

export default LocationInput;
