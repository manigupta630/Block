import { useState } from 'react';
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
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className='topheader dark:bg-slate-100 dark:text-black'>
      <header className="header">
        <nav className="nav container dark:bg-slate-100 dark:text-black">
          <div className="nav__data">
            <div className="logo-price-container">
              <NavLink to="/" className="nav__logo">
                {themeMode === 'dark' ? <img src={logo1} alt="Logo1" /> : <img src={blockLogo} alt="blockLogo" />}
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
      <div className='navBottom'>
        <img className='homeedgeTR' src={themeMode === 'dark' ? homelightTR : homeedgeTR} alt="HomeEdgeTR" />
        <div className="search-container dark:bg-slate-100 dark:text-black">
          <h4 className="dark:text-black">Search</h4>
          <div className="search-input-container shadow-2xl dark:bg-white dark:text-black">
            <input type="text" className="search-input dark:bg-white dark:text-black" />
            {themeMode === 'dark' ? <FaSearch color={'black'} /> : <FaSearch color={'white'} />}
          </div>
        </div>
        <img className='homeedgeTL' src={themeMode === 'dark' ? homelightTL : homeedgeTL} alt="HomeEdgeTL" />
      </div>
    </div>
  );
}

export default Navbar;
