import { useState, useEffect } from 'react';
import MyMap from '../Components/Map';
import ReactPaginate from 'react-paginate';
import staticData from '../Context/Staticdata';
import useTheme from '../Context/theme';
import homeedgeBR from '../assets/homeDTL.svg';
import homeedgeBL from '../assets/homeDBL.svg';
import homelightBR from '../assets/homelightBR.png';
import homelightBL from '../assets/homelightBl.png';
import { useApiData } from '../Context/API/ApiProvider';
import CountryFlag from 'react-country-flag';


function NetworkPeers() {
  const { themeMode } = useTheme();
  const { networkPeer } = useApiData();
  const rowsPerPage = 11; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(networkPeer.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;

  const displayedData = networkPeer.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 1024;
      setTableScrollable(isSmallScreen);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isTableScrollable, setTableScrollable] = useState(false);

  const handleClickWalletAddress = async (address) => {
    try {
      const walletData = await fetchWalletData(address);
      // Now you can use the walletData or update your state with this data
      console.log(walletData);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  
  return (
    <>
       <div className="mx-2 md:mx-0 lg:mx-0">
      <div className='tittle dark:text-black max-md:text-3xl'>Network Peers</div>
      <div className="text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className='rounded-lg dark-bg-white dark-text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Address</th>
                <th className='dark-bg-white dark-text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Protocol</th>
                <th className='dark-bg-white dark-text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Sub-Version</th>
                <th className='rounded-lg dark-bg-white dark-text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Country</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td className='rounded-lg dark-bg-white dark-text-black'>{item.address || 'N/A'}</td>
                  <td className='dark-bg-white dark-text-black'>{item.protocol || 'N/A'}</td>
                  <td className='dark-bg-white dark-text-black'>{item.version || 'N/A'}</td>
                  <td className='dark-bg-white dark-text-black '>
                  <div className='flag'>
                      <p>{item.country || 'N/A'}</p>
                    {item.country_code ? (
                      <CountryFlag countryCode={item.country_code} svg />
                    ) : (
                      'N/A'
                    )}
                    </div>
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
          containerClassName={"pagination my-pagination dark-bg-white dark-text-black"}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          activeClassName={'active'}
        />
      </div>
      <div className='map rounded-lg shadow-2xl dark-bg-white dark-text-black'>
        <MyMap />
      </div>
      <div className='bottomImg'>
        <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR} alt="Home Edge" />
        <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL} alt="Home Edge" />
      </div>
      </div>
    </>
  );
}

export default NetworkPeers;
