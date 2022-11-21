import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./App.css";

function App() {
  
  const [selectedData, setSelectedData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('s');
  const [items, setItems] = useState([]);
  const [result, setResult] = useState({});
  useEffect(() => {
    if(searchKeyword){
      fetch(`https://c8gur7sev1.execute-api.us-east-1.amazonaws.com/Prod/Postcode/AutoComplete?postcode=${searchKeyword}`)
         
        .then((response) => response.json())
        .then((res) => {
       
          const formatList = res.map((item, i) => {
            return { id: item, name: item };
          });
         
          setItems(formatList);
        });       
    }
  }, [searchKeyword]);
  useEffect(() => {

    if (selectedData) {
    
      fetch(`https://c8gur7sev1.execute-api.us-east-1.amazonaws.com/Prod/Postcode/Lookup?postcode=${selectedData.id}`)
          
       .then((response) => response.json())      
        .then((res) => {
        
          setResult(res);
        })
        .catch((error) => {
        
        });
    }
  }, [selectedData]);
  const handleOnSearch = (string, results) => {
    setSearchKeyword(string);
  };

  const handleOnHover = (result) => {
  };

  const handleOnSelect = (item) => {
    setSelectedData(item);
  };

  const handleOnFocus = () => {
  };

  const handleOnClear = () => {
  };

  const formatResult = item => <span className="result-span">{item.id}</span>

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 600, margin: 25  }}>
          <div style={{ marginBottom: 10 }}>Enter Postcode</div>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 1 }}
            formatResult={formatResult}
            inputDebounce={1}
            autoFocus
          />          
        </div>
        {result && (
          <div>
            <div className="old_ie_wrapper">
            <table className="fixed_headers">
  <thead>
    <tr>
      <th>Item</th>
      <th>Value</th>
    </tr>
   
  </thead>
  <tbody>
  <tr>
      <td>Post Code</td>
      <td>{result.postcode}</td>
    </tr>
    <tr>
      <td>Country</td>
      <td>{result.country}</td>
      
    </tr>
    <tr>
      <td>Latitude</td>
      <td>{result.latitude}</td>
     
    </tr>
    <tr>
      <td>Region</td>
      <td>{result.region}</td>
     
    </tr>
    <tr>
      <td>Admin District</td>
      <td>{result.adminDistrict}</td>
     
    </tr>
    <tr>
      <td>Parliamentary Constituency</td>
      <td>{result.parliamentaryConstituency}  </td>
    
    </tr>
    <tr>
      <td>Area</td>
      <td>{result.area} </td>
     
    </tr>
   
  </tbody>
</table>
</div>
                               
          </div>
        )}
      </header>
    </div>
  );
}

export default App;