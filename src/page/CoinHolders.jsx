import { useState ,useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import staticData from '../Context/Staticdata'
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBL.png'

import flagD from '../assets/flagD.svg'
import flagL from '../assets/flagL.svg'
import useTheme from '../Context/theme'
import PieChartComponent from '../Components/PieChart';
import { useApiData } from '../Context/API/ApiProvider';

function CoinHolders() {
    const{themeMode}=useTheme()
    const{coinHolder}=useApiData();
    if (coinHolder === null) {
      // You can return a loading indicator or an empty state here
      return <div>Loading...</div>;
    }
    const rowsPerPage = 11; // Number of rows per page
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(coinHolder.length / rowsPerPage);
    const offset = currentPage * rowsPerPage;
  
    const displayedData = coinHolder ? coinHolder.slice(offset, offset + rowsPerPage) : [];

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

    useEffect(() => {
      // Add a listener to handle screen size changes
      const handleResize = () => {
          // Check if the screen size is small and set a flag accordingly
          const isSmallScreen = window.innerWidth <= 1124; // Adjust the width as needed
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
          
    
          <div className='tittle dark:text-black max-md:text-3xl'>Coin Holders</div>
          <div className={`column-3 rounded-lg shadow-2xl dark:bg-white dark:text-black ${isTableScrollable ? 'scrollable' : ''}`}>
                <div className="table-container">
                    <table className="custom-table">
      <thead>
        <tr>
          <th className=' dark:bg-white dark:text-black text-2xl flagAlign md:text-base' style={{ minWidth: '150px' }} ><img className='flagCH' src={themeMode ==='dark'?flagL: flagD}/></th>
          <th className='dark:bg-white dark:text-blue text-2xl md:text-base' style={{ minWidth: '150px' }}>Address</th>
          <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Balance(BLOCX)</th>
          <th className='rounded-lg dark:bg-white dark:text-black text-xl md:text-base' style={{ minWidth: '150px' }}>%</th>
         
        </tr>
      </thead>
      <tbody>
        {displayedData.map((item, index) => (
          <tr key={index}>
            <td className='rounded-lg dark:bg-white  dark:text-black idAddress'>{index+1}</td>
            <td className='dark:bg-white text-blue address'>{item.a_id}</td>
            <td className='dark:bg-white dark:text-black'>{item.balance}</td>
            <td className='rounded-lg dark:bg-white dark:text-black'>N/A
            
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
      <PieChartComponent/>
     
    <div className='bottomImg'>
    <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR}/>
    <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL}/>
    </div>
        </>
      )
}

export default CoinHolders