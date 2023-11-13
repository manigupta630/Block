import { useState, useEffect } from 'react';
import MyMap from '../Components/Map'
import ReactPaginate from 'react-paginate';
import staticData from '../Context/Staticdata'
import useTheme from '../Context/theme'
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBl.png'
import { NavLink } from 'react-router-dom';
import { useApiData } from '../Context/API/ApiProvider';

function Masternode() {
  const { themeMode } = useTheme()

  const { masternodeData } = useApiData();

  const rowsPerPage = 11;
  const pageCount = Math.ceil(masternodeData.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * rowsPerPage;

  const displayedData = masternodeData.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
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
  // +++++++++++++++++++++++++++++++++++++++++++

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

      <div className='tittle dark:text-black max-md:text-3xl'>Masternodes</div>
      <div className="text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>IP Address</th>
                <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Wallet Address</th>
                <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Last Paid</th>
                <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Last Paid Block</th>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td className="rounded-lg dark:bg-white dark:text-black">{item.ip_address}</td>
                  <td className="dark:bg-white dark:text-black">
                    <p className="address">
                      <NavLink to={`/address/${item.addr}`}>{item.addr}</NavLink>
                    </p>
                  </td>
                  <td className="dark:bg-white dark:text-black">{item.lastpaid}</td>
                  <td className="dark:bg-white dark:text-black">{item.last_paid_block}</td>
                  <td className="rounded-lg dark:bg-white dark:text-black">
                    <button className="custom-button">{item.status}</button>
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

export default Masternode
