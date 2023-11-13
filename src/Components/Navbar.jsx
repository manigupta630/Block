import { useState, useEffect } from 'react';
import '../assets/css/Navbar.css';
import { FaBars } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/BLOCXD.svg';
import logo1 from '../assets/blocxL.svg';
import blockLogo from '../assets/blockLogo.png';
import homeedgeTL from '../assets/homeDTR.svg';
import homeedgeTR from '../assets/homeDBR.svg';
import homelightTL from '../assets/homelightTL.png';
import homelightTR from '../assets/homelightTR.png';
import useTheme from '../Context/theme';
import { NavLink } from 'react-router-dom'; // Import NavLink

function Navbar() {
  const { themeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 912 ) {
        setIsOpen(false);
        setIsMobile(true); // Adjust the threshold as needed
      }else{
        setIsMobile(false);
      }
    };

    handleResize(); // Set initial mobile state

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='container bg-true-gray-900 dark:bg-slate-100 dark:text-black  overflow-x-auto'>
      {/* <header className="fixed top-0 left-0 w-full z-[var(--z-fixed)] flex justify-center items-center bg-true-gray-900 bg-opacity-80">
        <nav className="bg-true-gray-900 dark:bg-slate-100 dark:text-black w-full fixed top-0 left-0 z-[var(--z-fixed)] flex justify-between items-center">
          <div className='shadow-md w-full top-0 left-0'>
            <div className='lg:flex items-center justify-between bg-true-gray-900 bg-opacity-80 py-4  lg:px-10 '>
              <div className="flex flex-row justify-between">
                <div className='font-bold text-2xl cursor-pointer font-[Poppins]  text-gray-800 ml-[0rem] md:ml-[-4rem] mt-[-1rem]'>
                  <div className="flex items-center">
                    <NavLink to="/" >
                      {themeMode === 'dark' ? <img src={logo1} className="mt-[1rem] w-[10rem] lg:ml-[3rem] h-[6rem] max-w-none" alt="Logo1" /> : <img className="mt-[1rem] w-[10rem] lg:ml-[3rem] h-[6rem] max-w-none" src={blockLogo} alt="blockLogo" />}
                    </NavLink>
                    <div style={{ color: '#1399fc' }} className="text-blue-500 font-semibold absolute lg:ml-[8rem] ml-[5rem] text-sm mt-[1rem]">
                      $0.0505
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => setIsOpen(!isOpen)} className={`text-2xl absolute right-8 top-[3rem] cursor-pointer  ${isMobile ? '' : 'md:hidden'}`}>
                <div className="text-white" id="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? (
                    <FaX className="nav__icon dark:text-white block" />
                  ) : (
                    <FaBars className="nav__icon dark:text-white block" />
                  )}
                </div>
              </div>
              <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full transition-all duration-500 ease-in  ${isOpen ? 'top-20 ' : 'top-[-490px]'}`}>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm md:my-0 mt-16'>
                  <NavLink to="/masternode" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Masternodes</NavLink>
                </li>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm  md:my-0 my-7'>
                  <NavLink to="/networkpeers" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Network Peers</NavLink>
                </li>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm  md:my-0 my-7'>
                  <NavLink to="/transaction" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Transactions</NavLink>
                </li>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm  md:my-0 my-7'>
                  <NavLink to="/coinholders" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Coin Holders</NavLink>
                </li>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm  md:my-0 my-7'>
                  <NavLink to="/claimaddress" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Claim Address</NavLink>
                </li>
                <li className='lg:ml-1 ml-2 md:ml-4  text-xl lg:text-sm  md:my-0 my-7'>
                  <NavLink to="/orphendBlock" activeClassName="active" className="block  lg:inline-block dark:text-black text-sm lg:px-4 whitespace-nowrap text-white font-semibold transition duration-300">Orphaned Blocks</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header> */}
           <header className="header w-full">
        <nav className="nav container dark:bg-slate-100 dark:text-black">
          <div className="nav__data">
            <div className="logo-price-container">
              <NavLink to="/" className="nav__logo">
                {themeMode === 'dark' ? <img src={blockLogo} alt="Logo1" /> : <img src={logo} alt="Logo" />}
              </NavLink>
              <div className="blocxL">
                $0.0505
              </div>
            </div>
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
              {showMenu ? (
                <FaX className="nav__icon dark:text-black" />
              ) : (
                <FaBars className="nav__icon dark:text-black" />
              )}
            </div>
          </div>

          <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
            <ul className="nav__list dark:text-black">
              <li>
              </li>
              <NavLink to="/masternode" activeClassName="active" className="nav__link">Masternodes</NavLink>
              <li>
                <NavLink to="/networkpeers" activeClassName="active" className="nav__link">Network Peers</NavLink>
              </li>
              <li>
                <NavLink to="/transaction" activeClassName="active" className="nav__link">Transactions</NavLink>
              </li>
              <li>
                <NavLink to="/coinholders" activeClassName="active" className="nav__link">Coin Holders</NavLink>
              </li>
              <li>
                <NavLink to="/claimaddress" activeClassName="active" className="nav__link">Claim Address</NavLink>
              </li>
              <li>
                <NavLink to="/orphendBlock" activeClassName="active" className="nav__link">Orphaned Blocks</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="xl:w-96 mx-auto mt-[15rem]  mb-[2rem] md:mb-[8rem]">
        <img className='absolute top-0 right-0 w-30 h-30' src={themeMode === 'dark' ? homelightTR : homeedgeTR} alt="HomeEdgeTR" />
        <div className="flex flex-col items-center justify-center  rounded-2xl dark:bg-slate-100 dark:text-black">
          <div className="relative">
            <h3 className="dark:text-black mb-2 font-bold text-white text-20">Search</h3>
            <div className="flex   shadow-2xl items-stretch">
              <input
                type="text"
                // className="relative m-0 flex-auto shadow-2xl rounded border text-black dark:bg-slate-100 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] dark:text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                className="px-3  relative border-none outline-none  w-full md:w-[34rem] bg-[#1d1d29] p-4 rounded-md text-white dark:bg-white dark:text-black"
                aria-label="Search"
               
                aria-describedby="button-addon2"
              />
              <span className=" flex items-center  absolute dark:text-black right-0 whitespace-nowrap rounded px-3 py-[1.2rem] text-center text-base font-normal text-neutral-700 dark:text-neutral-200" id="basic-addon2">
                {themeMode === 'dark' ? <FaSearch color={'black'} /> : <FaSearch color={'white'} />}
              </span>
            </div>
          </div>
          <img className='md:top-[10rem] top-[0rem] absolute bottom-0 left-0' src={themeMode === 'dark' ? homelightTL : homeedgeTL} alt="HomeEdgeTL" />
        </div>
      </div>

      {/* <div className='navBottom '>
        <img className='homeedgeTR' src={themeMode === 'dark' ? homelightTR : homeedgeTR} alt="HomeEdgeTR" />
        <div className="search-container dark:bg-slate-100 dark:text-black">
          <div className="flex flex-col items-center justify-center w-full mt-[14rem] rounded-2xl dark:bg-slate-100 dark:text-black">
            <h4 className="dark:text-black">Search</h4>
            <div className="w-2/5 text-left text-white text-lg mb-6 font-bold shadow-2xl dark:bg-white dark:text-black">
              <input type="text" className="border-none outline-none w-full bg-gray-900 px-24 rounded-md text-white dark:bg-white dark:text-black" />
              {themeMode === 'dark' ? <FaSearch color={'black'} /> : <FaSearch color={'white'} />}
            </div>
          </div>
          <img className='homeedgeTL' src={themeMode === 'dark' ? homelightTL : homeedgeTL} alt="HomeEdgeTL" />
        </div>

      </div> */}
    </div>

  );
}

export default Navbar;
