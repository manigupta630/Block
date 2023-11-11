import { FaSun, FaMoon, FaTwitter, FaDiscord, FaGithub, FaGlobe, FaTelegram } from 'react-icons/fa6';
import useTheme from '../Context/theme';

function Footer() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className='footer dark:bg-gray-500 dark:border-white'>
      <div className={`darkmode-toggle`}>
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={themeMode === 'light'}
          onChange={toggleTheme}
        />
        <label htmlFor="darkmode-toggle">
          <FaSun className='sun' />
          <FaMoon className='moon' />
        </label>
      </div>
      <div className='socialLinks'>
        <FaGithub className='icons' />
        <FaTwitter className='icons' />
        <FaDiscord className='icons' />
        <FaTelegram className='icons' />
        <FaGlobe className='icons' />
      </div>
    </div>
  );
}

export default Footer;
