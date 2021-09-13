
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Accounts = () => {

  const { address } = useParams()

  const zapperKey = "96e0cc51-a62e-42ca-acee-910ea7d2a241"
  const [data, setData] = useState('Loading...');
  const [loaded, setLoaded] = useState(false)

  const sort = function (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;

    arr.sort(function (a, b) {
      var i = 0;
      while (i < len) { a = a[prop[i]]; b = b[prop[i]]; i++; }
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr.reverse();
  };

  const tokenList = axios.get('https://zapper.fi/api/token-list')
  const accountData = axios.get("https://api.zapper.fi/v1/protocols/tokens/balances?addresses[]=" + address + "&network=ethereum&api_key=" + zapperKey)

  axios.all([tokenList, accountData]).then(axios.spread((...responses) => {
    const list = responses[0].data.tokens
    console.log('data', list)
    const assets = responses[1].data[address].products[0].assets

    const output = sort('usd', (assets.map(token => {
      let name = token.symbol
      if (list.find(l => l.symbol == token.symbol)) {
        name = list.find(l => l.symbol == token.symbol).name
      }
      return ({
        symbol: token.symbol,
        name: name,
        balance: token.balance,
        usd: token.balanceUSD,
        img: token.img || 'https://placehold.it/60x60'
      })
    })))

    if (!loaded) {
      setTimeout(() => {
        setData(output)
      },3000)
      setLoaded(true)
    }
  }))

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )

};

export default Accounts;