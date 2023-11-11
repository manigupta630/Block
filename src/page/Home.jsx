import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import '../App.css'
import ReactPaginate from 'react-paginate';
import wave from '../assets/Vector.png'
import wave1 from '../assets/Vector.png'
import MyMap from '../Components/Map';
import useTheme from '../Context/theme';
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBl.png'
import MarketCapD from '../assets/MarketCapD.svg'
import MasternodesD from '../assets/MasternodesD.svg'
import NetworkHashrateD from '../assets/NetworkHashrateD.svg'
import CoinHolderD from '../assets/CoinHoldersD.svg'
import CoinSupplyD from '../assets/CoinSupplyD.svg'
import BlockHeightD from '../assets/BlockHeightD.svg'
import MarketCapL from '../assets/MarketCapL.svg'
import MasternodesL from '../assets/MasternodesL.svg'
import NetworkHashrateL from '../assets/NetworkHashrateL.svg'
import CoinHolderL from '../assets/CoinHoldersL.svg'
import CoinSupplyL from '../assets/CoinSupplyL.svg'
import BlockHeightL from '../assets/BlockHeightL.svg'
import { NavLink } from 'react-router-dom';
import { useApiData } from '../Context/API/ApiProvider';
function Home() {
  const { themeMode } = useTheme();
  const { coinSupply, blockCount, marketCap, masternodeCount, holdersCount, lastTxsData } = useApiData();

  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(lastTxsData.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const displayedData = lastTxsData.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  function convertTimestampToUTC(timestamp) {
    const date = new Date(timestamp * 1000);
    const utcString = date.toISOString();
    const dateAndTime = utcString.replace('Z', '').replace('T', ' ').slice(0, -4);
    return dateAndTime + ' UTC';
  }

  useEffect(() => {
    // Add a listener to handle screen size changes
    const handleResize = () => {
      // Check if the screen size is small and set a flag accordingly
      const isSmallScreen = window.innerWidth <= 1024; // Adjust the width as needed
      setTableScrollable(isSmallScreen);
    };

    // Attach the listener
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isTableScrollable, setTableScrollable] = useState(false);

  return (
    <>
      {/* <Navbar /> */}
      {/* <h1 className='text-white'>{blockCount}</h1> */}
      <div className="grid-container">
        <div className="column-1 dark:bg-slate-100 dark:text-black">
          <div className="row-1 shadow-2xl dark:bg-white dark:text-black"><h3>
            Network Hashrate
          </h3>
            <img src={wave} />
          </div>
          <div className="row-2 dark:bg-slate-100 dark:text-black">
            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Coin Supply</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={CoinSupplyL} /> : <img src={CoinSupplyD} />}<p>{coinSupply}</p>  </div>

            </div>
            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Masternodes</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={MasternodesL} /> : <img src={MasternodesD} />}<p>{masternodeCount}</p> </div>

            </div>
            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Market Cap</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={MarketCapL} /> : <img src={MarketCapD} />} <p>{marketCap}</p>  </div>
            </div>

            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Block Height</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={BlockHeightL} /> : <img src={BlockHeightD} />} <p>{blockCount} Blocks</p> </div>

            </div>
            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Network Hashrate</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={NetworkHashrateL} /> : <img src={NetworkHashrateD} />}<p>597549.899(TH/sec)  </p> </div>

            </div>
            <div className='col shadow-2xl dark:bg-white dark:text-black'>
              <h3>Holders</h3><br />
              <div className='icons'>{themeMode === 'dark' ? <img src={CoinHolderL} /> : <img src={CoinHolderD} />} <p>{holdersCount}</p>
              </div>  </div>

          </div>
          <div className="row-3 shadow-2xl dark:bg-white dark:text-black">
            <h3>
              Network Difficulty
            </h3>
            <img src={wave1} />
          </div>
        </div>
        <div>

          <div className={`column-2 rounded-lg shadow-2xl dark:bg-white dark:text-black ${isTableScrollable ? 'scrollable' : ''}`}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th className={` rounded-lg dark:bg-white dark:text-black ${themeMode}`}>Block</th>
                    <th className={` rounded-lg dark:bg-white dark:text-black ${themeMode}`}>Recipients</th>
                    <th className={` rounded-lg dark:bg-white dark:text-black ${themeMode}`}>Amount (BLOCX)</th>
                    <th className={` rounded-lg dark:bg-white dark:text-black ${themeMode}`}>TimeStamp</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedData.map((item, index) => (
                    <tr key={index}>
                      <td className=' rounded-lg dark:bg-white dark:text-black '>{item.blockindex}</td>
                      <td className={`dark:bg-white dark:text-black ${themeMode}`}>{item.recipients}</td>
                      <td className={`dark:bg-white dark:text-black ${themeMode}`}>{item.amount}</td>
                      <td className="rounded-lg dark-bg-white dark-text-black">
                        {convertTimestampToUTC(item.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='pagination rounded-lg shadow-2xl'>
            <ReactPaginate
              previousLabel={'< '}
              nextLabel={' >'}
              containerClassName={"pagination my-pagination dark:bg-white dark:text-black"}
              pageCount={pageCount}
              pageRangeDisplayed={8}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              // containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
      <div className='map rounded-lg shadow-2xl dark:bg-white dark:text-black'>

        <MyMap />
      </div>


      <div className={`column-3 rounded-lg shadow-2xl dark:bg-white dark:text-black ${isTableScrollable ? 'scrollable' : ''}`}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Tx Hash</th>
                <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Amount (BLOCX)</th>
                <th className=' rounded-lg dark:bg-white dark:text-black text-2xl text-sm-xl md:text-base' style={{ minWidth: '150px' }}>TimeStamp</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td className='rounded-lg dark:bg-white dark:text-black address'> <NavLink to={`/tx/${item.txid}`}>{item.txid}</NavLink></td>
                  <td className='dark:bg-white dark:text-black'>{item.amount}</td>
                  <td className=' rounded-lg dark:bg-white dark:text-black '>{convertTimestampToUTC(item.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination component */}

      </div>
      <div className='pagination rounded-lg shadow-2xl'>
        <ReactPaginate
          previousLabel={'< '}
          nextLabel={' >'}
          containerClassName={"pagination my-pagination dark:bg-white dark:text-black"}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          // containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      <div className='bottomImg'>
        <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR} />
        <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL} />
      </div>
    </>
  )
}

export default Home