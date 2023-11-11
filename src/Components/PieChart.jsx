
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import staticData from '../Context/Staticdata'
import { PieChart } from 'react-minimal-pie-chart';
import '../App.css'; // Import your CSS file

const PieChartComponent = () => {
    const data = [
      { title: 'Top 1-25', value: 15, color: '#516F80' },
      { title: 'Top 26-50', value: 25, color: '#427D9D' },
      { title: 'Top 51-75', value: 18, color: '#9BBEC8' },
      { title: 'Top 76-100', value: 10, color: '#98E4FF' },
      { title: 'Top 101+', value: 22, color: '#D1F1FC' },
    ];

    const rowsPerPage = 4; // Number of rows per page
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(staticData.length / rowsPerPage);
    const offset = currentPage * rowsPerPage;
  
    const displayedData = staticData.slice(offset, offset + rowsPerPage);
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    }
    return (
      <>
        <div className='piechat_container'>
        <div className="pie-chart-container">
        <PieChart
          data={data}
          label={({ dataEntry }) => `${dataEntry.value}%`}
          lineWidth={70}
          labelStyle={(index) => ({
            // fill: data[index].color,
            fontSize: '6px',
            fontWeight: 'bold',
            color:'black',
            margin: '20px',
          textAlign: 'center',
          })}
          animate
        />
      </div>
      <div>
      <table className="custom-table">
      <thead>
        <tr>
         
          <th className='dark:bg-white dark:text-black text-2xl'>Amount(Blocx)</th>
         
          <th className='dark:bg-white dark:text-black text-2xl text-sm-xl'>Percentage %</th>
         
        </tr>
      </thead>
      <tbody>
        {displayedData.map((item, index) => (
          <tr key={index}>
          
            <td className='dark:bg-white dark:text-black'>35,207,834,990</td>
            <td className='dark:bg-white dark:text-black'>56.45%
            
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
        </div>
      </>
    );
  };
  

export default PieChartComponent;
