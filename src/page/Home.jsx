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
  function formatNumber(number) {
    if (number != null) {
      return number.toLocaleString('en-US');
    }
    return ''; // Return an empty string or any default value if number is null or undefined
  }


  return (
    <>
      {/* <Navbar /> */}
      {/* <h1 className='text-white'>{blockCount}</h1> */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-white flex flex-col justify-between gap-10 border-radius-10 dark:bg-slate-100 dark:text-black ">
            <div className="flex flex-col justify-between bg-1D1D29 border border-solid border-[#2c293f] rounded-tl-2xl rounded-tr-2xl  shadow-2xl dark:bg-white dark:text-black h-[-1rem] lg:mb-[-2rem]">
              <h3 className="font-bold  whitespace-nowrap" style={{
                paddingLeft: '20px',
                paddingTop: '12px',
              }}>
                Network Hashrate
              </h3>
              <img src={wave} alt="Wave" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4  mt-[-10px] mb-[-10px] dark:bg-slate-100 dark:text-black">
              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2  font-bold">Coin Supply</h3>
                <div className='icons mb-4'>
                  {themeMode === 'dark' ? <img src={CoinSupplyL} alt="Coin Supply" /> : <img src={CoinSupplyD} alt="Coin Supply" />}
                  <p>{formatNumber(parseFloat(coinSupply))}</p>
                </div>
              </div>
              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2  whitespace-nowrap font-bold text-sm">Masternodes</h3>
                <div className='icons mb-4 text-sm'>{themeMode === 'dark' ? <img src={MasternodesL} /> : <img src={MasternodesD} />}<p>{masternodeCount}</p> </div>

              </div>
              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2  whitespace-nowrap font-bold text-sm">Market Cap</h3>
                <div className='icons mb-4 text-sm'>{themeMode === 'dark' ? <img src={MarketCapL} /> : <img src={MarketCapD} />} <p>{formatNumber(parseFloat(marketCap))}</p>  </div>
              </div>

              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2  whitespace-nowrap font-bold text-sm">Block Height</h3>
                <div className='icons mb-4 text-sm'>{themeMode === 'dark' ? <img src={BlockHeightL} /> : <img src={BlockHeightD} />} <p>{blockCount} Blocks</p> </div>

              </div>
              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2 whitespace-nowrap font-bold text-sm">Network Hashrate</h3>
                <div className='icons mb-4 text-sm'>{themeMode === 'dark' ? <img src={NetworkHashrateL} /> : <img src={NetworkHashrateD} />}<p>597549.899(TH/s)  </p> </div>

              </div>
              <div className='flex flex-col box justify-center shadow-2xl dark:bg-white dark:text-black  items-center rounded-10'>
                <h3 className="mb-2  whitespace-nowrap font-bold text-sm">Holders</h3>
                <div className='icons mb-4 text-sm'>{themeMode === 'dark' ? <img src={CoinHolderL} /> : <img src={CoinHolderD} />} <p>{holdersCount}</p>
                </div>  </div>

            </div>
            <div className="flex flex-col justify-between bg-1D1D29 border border-solid border-[#2c293f] rounded-tl-2xl rounded-tr-2xl  shadow-2xl dark:bg-white dark:text-black  h-[-1rem] ">
              <h3 className="font-bold  whitespace-nowrap" style={{
                paddingLeft: '20px',
                paddingTop: '12px',
              }}>
                Network Difficulty
              </h3>
              <img src={wave1} />
            </div>
          </div>
          <div>

            <div className='text-white shadow-2xl  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto'>
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
                        <td className={`rounded-lg dark-bg-white dark-text-black ${themeMode}`}>
                          {convertTimestampToUTC(item.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='pagination rounded-lg   shadow-2xl'>
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
        <div className='map rounded-lg  mt-[2rem] shadow-2xl dark:bg-white dark:text-black'>

          <MyMap />
        </div>

        <div className='text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto'>
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
        <div className='pagination rounded-lg   shadow-2xl'>
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
      </div>
    </>
  )
}

export default Home