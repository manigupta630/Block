// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import QRCode from 'qrcode.react';

// const QRCodeDisplay = () => {
//   const [qrCodeData, setQRCodeData] = useState(null);

//   useEffect(() => {
//     // Make an HTTP request to the API
//     axios.get('http://localhost:8080/https://explorer.blocx.space/qr/BCMJMpBgYAaU2MLNgqY67tbnvf54syHFCu')
//       .then(response => {
//         setQRCodeData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching QR code data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {qrCodeData && <QRCode value={qrCodeData} />}
//     </div>
//   );
// };

// export default QRCodeDisplay;
