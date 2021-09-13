import React, { useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const App = () => {
  
  const inputRef = useRef();
  const [address, setAddress] = useState('0x0f87dd03a74e6a48d56661d96f44880c79b9d795');


  // async function getCollections(owner) {
  //   const uri = 'https://api.opensea.io/api/v1/collections?asset_owner=0x0f87dd03a74e6a48d56661d96f44880c79b9d795&offset=0&limit=300'
  //   const res = await fetch(uri)
  //   const data = await result.json();
  //   console.log(data)
  //   return data
  // }

  // async function getCollectibles(slug, owner) {
  //   const uri = 'https://api.opensea.io/api/v1/assets?owner=0x0f87dd03a74e6a48d56661d96f44880c79b9d795&order_direction=desc&offset=0&limit=20&collection=yield-guild-badge'
  //   const result = await fetch(uri)
  //   const data = await result.json();
  //   console.log(data)
  //   return data
  // }

  return (
    <div>
      <input
        ref={inputRef}
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <Link to={address}>Generate </Link>
    </div>
  );
};

export default App;