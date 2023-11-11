
import { useEffect, useState ,useCallback} from 'react';
import './App.css'
import Footer from './Components/Footer';
import { ThemeProvider } from './Context/theme';
import Api from './Context/Api';
import Container from 'react-bootstrap/Container';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Transaction from './page/Transaction';
import CoinHolders from './page/CoinHolders';
import ClaimAddress from './page/ClaimAddress';
import NetworkPeers from './page/NetworkPeers';
import OrphendBlock from './page/OrphendBlock';
import Masternode from './page/Masternode';
import WalletAddress from './page/WalletAddress';
import { ApiProvider } from './Context/API/ApiProvider';
import TransactionDetail from './page/TransactionDetail';
function App() {
const [themeMode,setThemeMode] = useState("light")

const lightTheme = () => {
  setThemeMode("light")
}

const darkTheme = () => {
  setThemeMode("dark")
}


const toggleTheme = useCallback(() => {
  setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
}, []);

useEffect(() => {
  document.querySelector('html').classList.remove("light","dark")
  document.querySelector('html').classList.add(themeMode)
},[themeMode])
  return (
    <>
    
    <ThemeProvider value={{themeMode,lightTheme,darkTheme , toggleTheme}}>
    <section className='section dark:bg-slate-100 dark:text-black'>
    <BrowserRouter>
    <Navbar/>
    <ApiProvider>
    <Container fluid className="margin_Horizontally dark:bg-slate-100 dark:text-black">
      
      <Routes>
       <Route path='/' element={<Home/>}/>
        <Route path='/masternode' element={<Masternode/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/coinholders' element={<CoinHolders/>}/>
        <Route path='/claimaddress' element={<ClaimAddress/>}/>
        <Route path='/networkpeers' element={<NetworkPeers/>}/>
        <Route path='/orphendBlock' element={<OrphendBlock/>}/>
        <Route path="/address/:address" element={<WalletAddress/>}/>
        <Route path="/tx/:txHash" element={<TransactionDetail/>}/>
      </Routes>
    </Container>
    </ApiProvider>
    <Footer/>
    </BrowserRouter>
    </section>
    </ThemeProvider>
    </>
  )
}

export default App
