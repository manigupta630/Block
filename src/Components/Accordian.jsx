import React, { useState } from 'react';
import dropdownL from '../assets/dropDownL.svg';
import dropdownD from '../assets/dropDownD.svg';
import dropUPD from '../assets/dropUPD.svg';
import dropUPL from '../assets/dropUPL.svg';
import useTheme from '../Context/theme'

function AccordionItem({ title, content, isOpen, toggleAccordion }) {
  const contentParagraphs = content.split('\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));
  const{themeMode}=useTheme()
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-title dark:text-black max-md:text-2xl max-sm:text-base" onClick={toggleAccordion}>
        <span className="accordion-icon mr-1">
          {isOpen ? <img src={themeMode === 'dark'?dropUPL :dropUPD} className='dropIcon'/> : <img src={themeMode === 'dark'? dropdownL:dropdownD} className='dropIcon'/>}
        </span>
        {title}
      </div>
      {isOpen && (
        <div className="accordion-content dark:text-black">
          {contentParagraphs}
        </div>
      )}
    </div>
  );
}

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const accordionData = [
    {
      title: 'Hide Claim Instruction',
      content: 'Use the Sign Message feature from your BLOCX. wallet to verify ownership of a wallet address that belongs to you.\n' +
        'Enter the following data into the wallet software:\n' +
        'Address: <wallet address from the form below>\n' +
        'Message: <display name from the form below>\n' +
        'Click the Sign Message button in the wallet, and copy/paste the resulting Signature at the bottom of this form.\n' +
        'Finally, click the Claim button below to claim your address, which will display your custom display name instead of the default wallet address on this site.\n' +
        'NOTE: You can update your claimed address at any time, as often as you wish. To remove a previously claimed display name, simply sign a blank message to return the address back to its original value.',
    },
  ];

  const toggleAccordion = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="accordion">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
    
  );
}

export default Accordion;
