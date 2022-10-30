import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`

      @font-face {
        font-family: 'Myriad Pro bold';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/MyriadProBoldCondensed.ttf') format('truetype');
      }
      /* latin */
      @font-face {
        font-family: 'Myriad Pro';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/MyriadProCondensed.ttf') format('truetype');
      }
      `}
  />
)

export default Fonts