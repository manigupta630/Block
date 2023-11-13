import { useState } from 'react';
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBL.png'

import useTheme from '../Context/theme'
import Accordion from '../Components/Accordian'
import '../App.css'

function ClaimAddress() {
  const { themeMode } = useTheme()
  const [address, setWalletAddress] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [signature, setSignature] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className='tittle dark:text-black  text-sm max-md:text-xl'>Claim Address</div>
      <Accordion />

      <div className="relative md:w-96 p-20 w-60">

        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label htmlFor="wallet-address" className="text-white mb-2 whitespace-nowrap">Wallet Address</label>
            {/* <label htmlFor="wallet-address" className='dark:text-black'></label> */}
            <input type="text" id="wallet-address" className="md:w-96 w-60 m-0 flex-auto rounded border  border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              value={address} onChange={(event) => setWalletAddress(event.target.value)} />
          </div>
          <div className="mb-10">
            <label htmlFor="display-name" className="text-white mb-2 whitespace-nowrap">Display Name</label>

            {/* <label htmlFor="display-name" className='dark:text-black'>Display Name</label> */}
            <input type="text" id="display-name" className="md:w-96 w-60 m-0 flex-auto rounded border  border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </div>
          <div className="mb-10">
            <label htmlFor="signature" className="text-white mb-2 whitespace-nowrap">Signature</label>

            {/* <label htmlFor="signature" className='dark:text-black'>Signature</label> */}
            <input type="text" id="signature" className="md:w-96 w-60 m-0 flex-auto rounded border  border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              value={signature} onChange={(event) => setSignature(event.target.value)} />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              style={{ backgroundColor: '#1399fc' }}
              className=" text-white w-40 px-6 py-2 border border-solid border-blue-500 rounded cursor-pointer transition duration-300 ease-in-out mx-auto"
            >
              Claim
            </button>
          </div>
        </form>
      </div>

      <div className='bottomImg'>
        <img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR} />
        <img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL} />
      </div>
    </>
  )
}

export default ClaimAddress