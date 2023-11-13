import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import homeedgeBR from '../assets/homeDTL.svg';
import homeedgeBL from '../assets/homeDBL.svg';
import homelightBR from '../assets/homelightBR.png';
import homelightBL from '../assets/homelightBl.png';
import useTheme from '../Context/theme';
import { useApiData } from '../Context/API/ApiProvider';
import { useParams } from 'react-router-dom';

function WalletAddress() {
  const { themeMode } = useTheme();
  const { fetchWalletData } = useApiData();
  const { address } = useParams(); // Get the dynamic address from URL params

  const [walletData, setWalletData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 11;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchWalletData(address)
      .then((data) => {
        setWalletData(data);
      })
      .catch((error) => {
        console.error('Error fetching wallet data:', error);
      });
  }, [address]);

  const walletDataArray = walletData ? (Array.isArray(walletData) ? walletData : []) : [];

  const pageCount = Math.ceil(walletDataArray.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const displayedData = walletDataArray.slice(offset, offset + rowsPerPage);

  function convertTimestampToUTC(timestamp) {
    const date = new Date(timestamp * 1000);
    const utcString = date.toISOString();
    const dateAndTime = utcString.replace('Z', '').replace('T', ' ').slice(0, -4);
    return dateAndTime + ' UTC';
  }

  function getAmountColor(sent) {
    return sent > 0 ? 'green' : 'red';
  }
  // +++++++++++++++++++++++++++++++++++
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
      <div className="mx-2 md:mx-0 lg:mx-0">
        <div className='qrCode-container'>
          <div className='qrIImage'>
            <img src={`https://explorer.blocx.space/qr/${address}`} alt="QR Code" />
            <p className='dark:text-black'>QR Code</p>
          </div>
          <div className='qrcodeContent dark:text-black'>
            <h3 className='dark:text-black md-text-base'>Balance(BLOCX)</h3>
            <h3 className='dark:text-black md-text-base'>{walletDataArray[0]?.balance}</h3>
          </div>
        </div>
        <div className='tittle dark:text-black'>Last Transaction</div>
        <div className="text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className='dark:bg-white dark:text-black text-2xl flagAlign md-text-base' style={{ minWidth: '150px' }}>TX Hash</th>
                  <th className='dark:bg-white dark:text-black text-2xl'>Amount(Blocx)</th>
                  <th className='dark:bg-white dark:text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Balance(Blocx)</th>
                  <th className='dark:bg-white dark:text-black text-2xl md-text-base' style={{ minWidth: '150px' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={index}>
                    <td className='dark:bg-white dark:text-black'>{item.txid}</td>
                    <td className='dark:bg-white dark:text-black'>
                      <p style={{ backgroundColor: getAmountColor(item.sent) === 'green' ? 'green' : 'red' }} className="rounded-full">
                        {item.sent > 0 ? `+${item.sent}` : `-${item.received}`}
                      </p>

                    </td>
                    <td className='dark:bg-white dark:text-black'>{item.balance}</td>
                    <td className='dark:bg-white dark:text-black'>
                      {convertTimestampToUTC(item.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='pagination shadow-2xl'>
          <ReactPaginate
            previousLabel={'< '}
            nextLabel={' >'}
            containerClassName={"pagination my-pagination dark:bg-white dark:text-black"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            activeClassName={'active'}
          />
        </div>
        <div className='bottomImg'>
          <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR} />
          <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL} />
        </div>
      </div>
    </>
  );
}

export default WalletAddress;
