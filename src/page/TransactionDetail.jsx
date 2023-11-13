import { useState, useEffect } from 'react';
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBL.png'

import useTheme from '../Context/theme'
import { useApiData } from '../Context/API/ApiProvider';
import { useParams } from 'react-router-dom';

function TransactionDetail() {
  const { themeMode } = useTheme();
  const { fetchTransactionData } = useApiData();
  const { txHash } = useParams(); 
  const [transactionData, setTransactionData] = useState(null);
  const [transactionVin, setTransactionVin] = useState([]);
const [transactionVout, setTransactionVout] = useState([]);


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

  // +++++++++++++++++++++++++++++++++++
  useEffect(() => {
    fetchTransactionData(txHash)
      .then((data) => {
        setTransactionData(data);
      })
      .catch((error) => {
        console.error('Error fetching wallet data:', error);
      });
  }, [txHash]);

  useEffect(() => {
    if (transactionData) {
      const vin = transactionData.tx.vin;
      const vout = transactionData.tx.vout;
  
      setTransactionVin(vin);
      setTransactionVout(vout);
    }
  }, [transactionData]);
  const amountBackgroundColor = (amount) => {
    if (transactionVin.includes(amount)) {
      return 'green';
    } else if (transactionVout.includes(amount)) {
      return 'red';
    } else {
      return 'black';
    }
  };
    
  return (
    <>
     <div className="mx-2 md:mx-0 lg:mx-0">
      <div className='tittle dark:text-black max-md:text-3xl'>Block Transaction Details</div>
      <div className="text-white shadow-2xl bg-[#1d1d29]  mt-[2rem]  flex flex-col justify-between gap-10  border  border-[#2c293f] rounded-xl dark:bg-slate-100 dark:text-black overflow-x-auto">
        <div className="table-container">
          <table className="custom-table">
            <tbody>
              <tr>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Hash   :</th>
                <td className='rounded-lg dark:bg-white dark:text-black address'>{transactionData?.tx?.txid || 'N/A'}</td>
              </tr>
              <tr>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Confirmation   :</th>
                <td className='dark:bg-white dark:text-black'>{transactionData?.confirmations || 'N/A'}</td>
              </tr>
              <tr>
                <th className='rounded-lg dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>TimeStamp   :</th>
                <td className='dark:bg-white dark:text-black'>{transactionData?.tx?.timestamp || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination component */}
      </div>

      <div className='tittle dark:text-black max-md:text-3xl'>Transactions</div>
      <div className='column-3 rounded-lg shadow-2xl dark:bg-white dark:text-black overflow-x-auto'>
                <div className="table-container">
                    <table className="custom-table">
          <thead>
            <tr>
              <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Address</th>
              <th className='dark:bg-white dark:text-black text-2xl md:text-base' style={{ minWidth: '150px' }}>Amount (BLOCX)</th>
            </tr>
          </thead>
          <tbody>
      {transactionVin.map((transaction, index) => (
        <tr key={index}>
          <td className=" dark:bg-white dark:text-black address">{transaction.addresses}</td>
          <td className="dark:bg-white dark:text-black" >{transaction.amount}</td>
        </tr>
      ))}
      {transactionVout.map((transaction, index) => (
        <tr key={index}>
          <td className=" dark:bg-white dark:text-black address">{transaction.addresses}</td>
          <td className="dark:bg-white dark:text-black" >{transaction.amount}</td>
        </tr>
      ))}
    </tbody>
        </table>
        </div>
        {/* Pagination component */}
       
      </div>
      <div className='bottomImg'>
        <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR} />
        <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL} />
      </div>
      </div>
    </>

  )
}

export default TransactionDetail