import { useState } from 'react';
import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBl.png'
import useTheme from '../Context/theme'
import Accordion from '../Components/Accordian'
import '../App.css'

function ClaimAddress() {
    const{themeMode}=useTheme()
    const [address, setWalletAddress] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [signature, setSignature] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
      };
    
  return (
    <>
        <div className='tittle dark:text-black max-md:text-3xl'>Claim Address</div>
        <Accordion/>
        <div className="claim-address-form">
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="wallet-address" className='dark:text-black'>Wallet Address</label>
      <input type="text" id="wallet-address" className="form-control dark:text-white" value={address} onChange={(event) => setWalletAddress(event.target.value)} />
    </div>
    <div className="form-group">
      <label htmlFor="display-name" className='dark:text-black'>Display Name</label>
      <input type="text" id="display-name" className="form-control dark:text-white" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
    </div>
    <div className="form-group">
      <label htmlFor="signature" className='dark:text-black'>Signature</label>
      <input type="text" id="signature" className="form-control dark:text-white" value={signature} onChange={(event) => setSignature(event.target.value)} />
    </div>
    
    <button type="submit" className="btn btn-primary">Claim</button>
    
  </form>
</div>

        <div className='bottomImg'>
<img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR}/>
<img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL}/>
</div>
    </>
  )
}

export default ClaimAddress