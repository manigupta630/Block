import homeedgeBR from '../assets/homeDTL.svg'
import homeedgeBL from '../assets/homeDBL.svg'
import homelightBR from '../assets/homelightBR.png'
import homelightBL from '../assets/homelightBL.png'
import useTheme from '../Context/theme'

function Transaction() {
    const{themeMode}=useTheme()
  return (
    <>
        <div className='tittle dark:text-black max-md:text-3xl'>Transaction</div>
        <div className='bottomImg'>
<img className='homeedgeBR' src={themeMode === 'dark' ? homelightBR : homeedgeBR}/>
<img className='homeedgeBL' src={themeMode === 'dark' ? homelightBL : homeedgeBL}/>
</div>
    </>
    
  )
}

export default Transaction