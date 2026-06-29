import { createGlobalStyle } from 'styled-components'
import  { globalStyles } from 'twin.macro'

const GlobalStyles = createGlobalStyle(globalStyles, `
   /* Below animations are for modal created using React-Modal */
     .ReactModal__Overlay {
     transition: transform 300ms ease-in-out;
     transition-delay: 100ms;
     transform: scale(0);
   }
   .ReactModal__Overlay--after-open{
     transform: scale(1);
   }
   .ReactModal__Overlay--before-close{
     transform: scale(0);
   }

   /* CDN Tailwind must not reset custom app buttons */
   button.schedule-action-btn {
     background-color: #6415ff !important;
     background-image: linear-gradient(90deg, #6415ff, #430ce5) !important;
     color: #ffffff !important;
     border: none !important;
   }

   button.contact-send-btn {
     display: block !important;
     width: 100% !important;
     background-color: #6415ff !important;
     background-image: linear-gradient(90deg, #6415ff, #430ce5) !important;
     color: #ffffff !important;
     border: none !important;
   }

   button.contact-send-btn:hover:not(:disabled) {
     background-color: #430ce5 !important;
     background-image: linear-gradient(90deg, #6415ff, #430ce5) !important;
     color: #ffffff !important;
   }

   button.contact-whatsapp-btn {
     display: block !important;
     width: 100% !important;
     background-color: #16a34a !important;
     background-image: linear-gradient(90deg, #22c55e, #16a34a) !important;
     color: #ffffff !important;
     border: none !important;
   }

   button.contact-whatsapp-btn:hover {
     background-color: #15803d !important;
     background-image: linear-gradient(90deg, #22c55e, #16a34a) !important;
     color: #ffffff !important;
   }
`)

export default GlobalStyles