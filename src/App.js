import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from "react-dom";

const App = () => {
  

  const inputRef = useRef();
  const [addresses, setAddresses] = useState([{ name: 'Whale', address: '0x0f87dd03a74e6a48d56661d96f44880c79b9d795'}]);
  const [zapperKey, setZapperKey] = useState('96e0cc51-a62e-42ca-acee-910ea7d2a241');
  const [apiData, setApiData] = useState('')


  const sort = function (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
  };

  const handleSaveToPC = jsonData => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'Balances.json';
    link.href = url;
    link.click();
  }

  const updateAccount = (index, val) => {
    let newAddresses = [...addresses]
    newAddresses[index] = val,
    console.log(newAddresses)
    setAddresses(newAddresses)
  }

  async function getTokenList() {
    const tokenListUri = 'https://zapper.fi/api/token-list'
    const tokenListRes = await fetch(tokenListUri);
    const tokenListJson = await tokenListRes.json();
    return tokenListJson
  }

  async function getAssets() {
    addresses.map(async address => {
      const uri = "https://api.zapper.fi/v1/protocols/tokens/balances?addresses[]=" + address.address + "&network=ethereum&api_key=" + zapperKey
      const res = await fetch(uri)
      const json = await res.json()

      const l = await getTokenList()

      let newArr = sort('usd', (json[address.address].products[0].assets.map(token => ({
        symbol: token.symbol,
        name: l.tokens.find(l => l.symbol == token.symbol) ? l.tokens.find(l => l.symbol == token.symbol).name : token.symbol,
        balance: token.balance,
        usd: token.balanceUSD,
        img: token.img || 'https://placehold.it/60x60'
      })))).reverse()

      setApiData(newArr)
      handleSaveToPC(newArr)
    })
  }
    

  async function getCollections(owner) {
    const uri = 'https://api.opensea.io/api/v1/collections?asset_owner=0x0f87dd03a74e6a48d56661d96f44880c79b9d795&offset=0&limit=300'
    const res = await fetch(uri)
    const data = await result.json();
    console.log(data)
    return data
  }

  async function getCollectibles(slug, owner) {
    const uri = 'https://api.opensea.io/api/v1/assets?owner=0x0f87dd03a74e6a48d56661d96f44880c79b9d795&order_direction=desc&offset=0&limit=20&collection=yield-guild-badge'
    const result = await fetch(uri)
    const data = await result.json();
    console.log(data)
    return data
  }

  

  async function fetchData() {

    // getCollectibles()
    await setApiData(
      {
        emoji: "😅",
        watched: "true",
        savedAddresses: [
          {
            savedAddressName: "Villy B",
            emoji: "👽",
            address: "0x2034...3935",
            ens: "villy.eth",
            lastInteracted: "3h ago",
            watching: false,
          }, {
            savedAddressName: "Bill Gates",
            emoji: "⚖️",
            address: "0x2034...3935",
            ens: "illuminati.eth",
            lastInteracted: false,
            watching: false,
          }, {
            savedAddressName: "Buddy",
            emoji: "👽",
            address: "0x2034...3935",
            ens: false,
            lastInteracted: "3h ago",
            watching: false,
          }
        ],
      }
    )
  }

  return (
    <div>
      <h3>Token list generator</h3>
      {
        addresses.map((a, index) => {
          return (
            <div>
               <input
                placeholder="Account name"
                ref={inputRef}
                value={addresses[index].name}
                index={0}
                onChange={e => updateAccount(index, { address: addresses[index].address, name: e.target.value })}
              />
              <input
                placeholder="Account address"
                ref={inputRef}
                value={addresses[index].address}
                index={1}
                onChange={e => updateAccount(index, { name: addresses[index].name, address: e.target.value })}
              />
            </div>
          )
        })
      }
     
      
      <input
        ref={inputRef}
        value={zapperKey}
        onChange={e => setZapperKey(e.target.value)}
      />
      <button onClick={() => getAssets()}>Generate Data</button>
      <div>
        <pre>
          {JSON.stringify(apiData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default App;