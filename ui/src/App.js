import React, { useEffect, useState} from 'react';
import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const App = () => {

  let [data, setData] = useState('');

  useEffect(() => {
    fetch(ApiUrl + "/")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.log(err))
  }, []);


  return (
    <div>
      App is running - good work:
      {data.length > 0 ? "Getting data from db" : "Not getting anything" }
      <p>Testing Testing 123</p>
    </div>
  );
}

export default App;
