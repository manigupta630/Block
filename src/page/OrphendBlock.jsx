import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import staticData from '../Context/Staticdata'
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBL.png'

import useTheme from '../Context/theme'
import { useApiData } from '../Context/API/ApiProvider';

function OrphendBlock() {
  const { themeMode } = useTheme()
  const rowsPerPage = 11; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(staticData.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;

  const displayedData = staticData.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
      <div className="mx-2 md:mx-0 lg:mx-0">
        <div className='tittle dark:text-black max-md:text-3xl'>Orphaned Blocks</div>
        <div className="text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className='rounded-lg dark:bg-white dark:text-black text-2xl ' >Orphaned Block Hash</th>
                  <th className='dark:bg-white dark:text-black text-2xl'>Actual Block</th>
                  <th className='dark:bg-white dark:text-black text-2xl text-sm-xl'>Previous Block</th>
                  <th className='rounded-lg dark:bg-white dark:text-black text-2xl text-sm-xl'>Next Block</th>

                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={index}>
                    <td className='rounded-lg dark:bg-white dark:text-black address'>000000000000006864a8caebba75634a2e77df4cb58afe45630bbb5ff922c9ca</td>
                    <td className='dark:bg-white dark:text-black'>42412</td>
                    <td className='dark:bg-white dark:text-black'>35207</td>
                    <td className='rounded-lg dark:bg-white dark:text-black'>33015

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

export default OrphendBlock