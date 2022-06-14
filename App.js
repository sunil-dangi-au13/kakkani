import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadSearch = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api.domainsdb.info/v1/domains/search?"
      );
      setSearch(response.data);
      setLoading(false);
    };

    loadSearch();
  }, []);

  return (
    <div className="App">
      <h3>Search Bar</h3>
      <input
        style={{ width: "30%", height: "25px" }}
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      {loading ? (
        <h4>Loading ...</h4>
      ) : (
        search
          .filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <h5 key={item.id}>{item.title}</h5>)
      )}
    </div>
  );
}

export default App;
