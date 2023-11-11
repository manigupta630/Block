import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [coinSupply, setcoinSupply] = useState(null);
  const [blockCount, setBlockCount] = useState(null);
  const [masternodeCount, setmasternodeCount] = useState(null);
  const [marketCap, setmarketCap] = useState(null);
  const [masternodeData, setMasternodeData] = useState([]);
  const [coinHolder, setCoinHolder] = useState(null);
  const [orphanList, setOrphanList] = useState(null);
  const [holdersCount, setHoldersCount] = useState(null);
  const [lastTxsData, setLastTxsData] = useState([]);
  const [networkPeer, setnetworkPeer] = useState([]);
  const [mapData, setmapData] = useState(null);
  // New state for transaction data


  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const fetchWalletData = async (address) => {
    try {
      const walletApiUrl = `http://localhost:8080/https://explorer.blocx.space/ext/getaddresstxs/${address}/0/50`;

      const response = await fetch(walletApiUrl, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Replace with your local development origin
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
    // +++++++++++++++++++++++++++ Fetch Transaction Data +++++++++++++++++++++
  const fetchTransactionData = async (address) => {
    try {
      const walletApiUrl = `http://localhost:8080/https://explorer.blocx.space/ext/gettx/${address}`;

      const response = await fetch(walletApiUrl, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Replace with your local development origin
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // +++++++++++++++++++++++++++++++ Fetch Orphan List ++++++++++++++++++++++++++
  const fetchOrphanList = async () => {
    try {
      const orphanListApiUrl = `http://localhost:8080/https://explorer.blocx.space/ext/getorphanlist/0/10`;

      const response = await fetch(orphanListApiUrl, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Replace with your local development origin
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  
  useEffect(() => {
    // +++++++++++++++++++++++++++++++Fetch Coin Supply+++++++++++++++++++++++++
    const blockApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/getmoneysupply'; // Use your own proxy URL for the block count
    fetch(blockApiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        const formattedcoinSupply = parseFloat(data).toFixed(3);
        setcoinSupply(formattedcoinSupply);
        setIsLoading(false);
        
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // +++++++++++++++++++++++++++++Fetch masternode data++++++++++++++++++++

    const masternodeApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/getmasternodelist'; // Use your own proxy URL for masternode data
    fetch(masternodeApiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMasternodeData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });



  // +++++++++++++++++++++++++++Fetch block height+++++++++++++++++++

  const blockheightApiUrl  = 'http://localhost:8080/https://explorer.blocx.space/api/getblockcount';
  fetch(blockheightApiUrl, {
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:5173', // Replace with your local development origin
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setBlockCount(data);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });

    // +++++++++++++++++++++++++++Fetch master node count+++++++++++++++++++

  const masternodeCountApiUrl  = 'http://localhost:8080/https://explorer.blocx.space/ext/getmasternodecount';
  fetch(masternodeCountApiUrl, {
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:5173', // Replace with your local development origin
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setmasternodeCount(data.totalMasternodes);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });

    // +++++++++++++++++++++++++++Fetch Market Cap+++++++++++++++++++

  const marketCapApiUrl  = 'http://localhost:8080/https://explorer.blocx.space/ext/getmarketcap';
  fetch(marketCapApiUrl, {
    method: 'GET',
    headers: {
      'Origin': 'http://localhost:5173', // Replace with your local development origin
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setmarketCap(data.marketcap.usd);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });

     //++++++++++++++++++++ Fetch holders count+++++++++++++++++++++++++
     const holdersCountApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/getholderscount'; // Use your own proxy URL for holders count
     fetch(holdersCountApiUrl, {
       method: 'GET',
       headers: {
         'Origin': 'http://localhost:5173', // Replace with your local development origin
       },
     })
       .then((response) => {
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
         return response.json();
       })
       .then((data) => {
         setHoldersCount(data.count);
         setIsLoading(false);
       })
       .catch((error) => {
         setError(error);
         setIsLoading(false);
       });
  //++++++++++++++++++++++++ Fetch last transactions data++++++++++++++++++++++++++++++++++ 
       const lastTxsApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/getlasttxs/100/0/100'; // Use your own proxy URL for last transactions data
    fetch(lastTxsApiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLastTxsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

       //++++++++++++++++++++++++ Fetch Network peer data++++++++++++++++++++++++++++++++++ 
       const networkPeerApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/getnetworkpeers'; // Use your own proxy URL for last transactions data
    fetch(networkPeerApiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setnetworkPeer(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
//++++++++++++++++++++++++ Fetch  Coin Holder data++++++++++++++++++++++++++++++++++ 
const coinFolderApiUrl = 'http://localhost:8080/https://explorer.blocx.space/ext/holderslist'; // Use your own proxy URL for last transactions data
fetch(coinFolderApiUrl, {
  method: 'GET',
  headers: {
    'Origin': 'http://localhost:5173', // Replace with your local development origin
  },
})

  .then((response) => {
    console.log(holdersCount);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    setCoinHolder(data.data);
   
    setIsLoading(false);
  })
  .catch((error) => {
    setError(error);
    setIsLoading(false);
  });
       //++++++++++++++++++++++++ Fetch Map data++++++++++++++++++++++++++++++++++ 
       const mapDataApiUrl = 'https://schoolapi-3yo0.onrender.com/getCoordinates'; // Use your own proxy URL for last transactions data
    fetch(mapDataApiUrl, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173', // Replace with your local development origin
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        // console.log(response.json()) ;
      })
      .then((data) => {
        setmapData(data);
        // console.log(JSON.stringify(data, null, 2)) ;
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

// ++++++++++++++++++++++++++++++

  }, []);
  return (
    <ApiContext.Provider value={{ coinSupply,isLoading,marketCap,masternodeCount,blockCount,lastTxsData,holdersCount,networkPeer, masternodeData,fetchWalletData,mapData,fetchTransactionData,fetchOrphanList,coinHolder, error }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiData() {
  return useContext(ApiContext);
}
