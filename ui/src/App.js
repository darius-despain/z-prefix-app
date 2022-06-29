import React, { useEffect, useState} from 'react';
import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const App = () => {

  let [names, setNames] = useState([ ]);

  useEffect(() => {
    fetch(ApiUrl + "/authors")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);


  return (
    <div>
      App is running - good work:
      { names.map(author => author.firstName + " ")}
      <p>Testing Testing 123</p>
    </div>
  );
}

export default App;
