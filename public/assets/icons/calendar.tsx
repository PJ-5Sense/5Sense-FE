interface CalendarIconProps {
  width: string
  height: string
  color: string
}

const CalendarIcon: React.FC<CalendarIconProps> = ({ width, height, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
    <mask id="path-1-inside-1_3163_2680" fill="white">
      <path d="M2.25 14.4C2.25 14.758 2.39223 15.1014 2.64541 15.3546C2.89858 15.6078 3.24196 15.75 3.6 15.75H14.4C14.758 15.75 15.1014 15.6078 15.3546 15.3546C15.6078 15.1014 15.75 14.758 15.75 14.4V7.65H2.25V14.4ZM11.7 9.3375C11.7 9.24799 11.7356 9.16214 11.7989 9.09885C11.8621 9.03556 11.948 9 12.0375 9H12.7125C12.802 9 12.8879 9.03556 12.9511 9.09885C13.0144 9.16214 13.05 9.24799 13.05 9.3375V10.0125C13.05 10.102 13.0144 10.1879 12.9511 10.2511C12.8879 10.3144 12.802 10.35 12.7125 10.35H12.0375C11.948 10.35 11.8621 10.3144 11.7989 10.2511C11.7356 10.1879 11.7 10.102 11.7 10.0125V9.3375ZM11.7 12.0375C11.7 11.948 11.7356 11.8621 11.7989 11.7989C11.8621 11.7356 11.948 11.7 12.0375 11.7H12.7125C12.802 11.7 12.8879 11.7356 12.9511 11.7989C13.0144 11.8621 13.05 11.948 13.05 12.0375V12.7125C13.05 12.802 13.0144 12.8879 12.9511 12.9511C12.8879 13.0144 12.802 13.05 12.7125 13.05H12.0375C11.948 13.05 11.8621 13.0144 11.7989 12.9511C11.7356 12.8879 11.7 12.802 11.7 12.7125V12.0375ZM8.325 9.3375C8.325 9.24799 8.36056 9.16214 8.42385 9.09885C8.48714 9.03556 8.57299 9 8.6625 9H9.3375C9.42701 9 9.51286 9.03556 9.57615 9.09885C9.63944 9.16214 9.675 9.24799 9.675 9.3375V10.0125C9.675 10.102 9.63944 10.1879 9.57615 10.2511C9.51286 10.3144 9.42701 10.35 9.3375 10.35H8.6625C8.57299 10.35 8.48714 10.3144 8.42385 10.2511C8.36056 10.1879 8.325 10.102 8.325 10.0125V9.3375ZM8.325 12.0375C8.325 11.948 8.36056 11.8621 8.42385 11.7989C8.48714 11.7356 8.57299 11.7 8.6625 11.7H9.3375C9.42701 11.7 9.51286 11.7356 9.57615 11.7989C9.63944 11.8621 9.675 11.948 9.675 12.0375V12.7125C9.675 12.802 9.63944 12.8879 9.57615 12.9511C9.51286 13.0144 9.42701 13.05 9.3375 13.05H8.6625C8.57299 13.05 8.48714 13.0144 8.42385 12.9511C8.36056 12.8879 8.325 12.802 8.325 12.7125V12.0375ZM4.95 9.3375C4.95 9.24799 4.98556 9.16214 5.04885 9.09885C5.11214 9.03556 5.19799 9 5.2875 9H5.9625C6.05201 9 6.13786 9.03556 6.20115 9.09885C6.26444 9.16214 6.3 9.24799 6.3 9.3375V10.0125C6.3 10.102 6.26444 10.1879 6.20115 10.2511C6.13786 10.3144 6.05201 10.35 5.9625 10.35H5.2875C5.19799 10.35 5.11214 10.3144 5.04885 10.2511C4.98556 10.1879 4.95 10.102 4.95 10.0125V9.3375ZM4.95 12.0375C4.95 11.948 4.98556 11.8621 5.04885 11.7989C5.11214 11.7356 5.19799 11.7 5.2875 11.7H5.9625C6.05201 11.7 6.13786 11.7356 6.20115 11.7989C6.26444 11.8621 6.3 11.948 6.3 12.0375V12.7125C6.3 12.802 6.26444 12.8879 6.20115 12.9511C6.13786 13.0144 6.05201 13.05 5.9625 13.05H5.2875C5.19799 13.05 5.11214 13.0144 5.04885 12.9511C4.98556 12.8879 4.95 12.802 4.95 12.7125V12.0375Z" />
      <path d="M15.75 4.95C15.75 4.59196 15.6078 4.24858 15.3546 3.99541C15.1014 3.74223 14.758 3.6 14.4 3.6H13.05V2.925C13.05 2.74598 12.9789 2.57429 12.8523 2.4477C12.7257 2.32112 12.554 2.25 12.375 2.25C12.196 2.25 12.0243 2.32112 11.8977 2.4477C11.7711 2.57429 11.7 2.74598 11.7 2.925V3.6H9.675V2.925C9.675 2.74598 9.60388 2.57429 9.4773 2.4477C9.35071 2.32112 9.17902 2.25 9 2.25C8.82098 2.25 8.64929 2.32112 8.5227 2.4477C8.39612 2.57429 8.325 2.74598 8.325 2.925V3.6H6.3V2.925C6.3 2.74598 6.22888 2.57429 6.1023 2.4477C5.97571 2.32112 5.80402 2.25 5.625 2.25C5.44598 2.25 5.27429 2.32112 5.1477 2.4477C5.02112 2.57429 4.95 2.74598 4.95 2.925V3.6H3.6C3.24196 3.6 2.89858 3.74223 2.64541 3.99541C2.39223 4.24858 2.25 4.59196 2.25 4.95V6.3H15.75V4.95Z" />
    </mask>
    <path
      d="M2.25 14.4C2.25 14.758 2.39223 15.1014 2.64541 15.3546C2.89858 15.6078 3.24196 15.75 3.6 15.75H14.4C14.758 15.75 15.1014 15.6078 15.3546 15.3546C15.6078 15.1014 15.75 14.758 15.75 14.4V7.65H2.25V14.4ZM11.7 9.3375C11.7 9.24799 11.7356 9.16214 11.7989 9.09885C11.8621 9.03556 11.948 9 12.0375 9H12.7125C12.802 9 12.8879 9.03556 12.9511 9.09885C13.0144 9.16214 13.05 9.24799 13.05 9.3375V10.0125C13.05 10.102 13.0144 10.1879 12.9511 10.2511C12.8879 10.3144 12.802 10.35 12.7125 10.35H12.0375C11.948 10.35 11.8621 10.3144 11.7989 10.2511C11.7356 10.1879 11.7 10.102 11.7 10.0125V9.3375ZM11.7 12.0375C11.7 11.948 11.7356 11.8621 11.7989 11.7989C11.8621 11.7356 11.948 11.7 12.0375 11.7H12.7125C12.802 11.7 12.8879 11.7356 12.9511 11.7989C13.0144 11.8621 13.05 11.948 13.05 12.0375V12.7125C13.05 12.802 13.0144 12.8879 12.9511 12.9511C12.8879 13.0144 12.802 13.05 12.7125 13.05H12.0375C11.948 13.05 11.8621 13.0144 11.7989 12.9511C11.7356 12.8879 11.7 12.802 11.7 12.7125V12.0375ZM8.325 9.3375C8.325 9.24799 8.36056 9.16214 8.42385 9.09885C8.48714 9.03556 8.57299 9 8.6625 9H9.3375C9.42701 9 9.51286 9.03556 9.57615 9.09885C9.63944 9.16214 9.675 9.24799 9.675 9.3375V10.0125C9.675 10.102 9.63944 10.1879 9.57615 10.2511C9.51286 10.3144 9.42701 10.35 9.3375 10.35H8.6625C8.57299 10.35 8.48714 10.3144 8.42385 10.2511C8.36056 10.1879 8.325 10.102 8.325 10.0125V9.3375ZM8.325 12.0375C8.325 11.948 8.36056 11.8621 8.42385 11.7989C8.48714 11.7356 8.57299 11.7 8.6625 11.7H9.3375C9.42701 11.7 9.51286 11.7356 9.57615 11.7989C9.63944 11.8621 9.675 11.948 9.675 12.0375V12.7125C9.675 12.802 9.63944 12.8879 9.57615 12.9511C9.51286 13.0144 9.42701 13.05 9.3375 13.05H8.6625C8.57299 13.05 8.48714 13.0144 8.42385 12.9511C8.36056 12.8879 8.325 12.802 8.325 12.7125V12.0375ZM4.95 9.3375C4.95 9.24799 4.98556 9.16214 5.04885 9.09885C5.11214 9.03556 5.19799 9 5.2875 9H5.9625C6.05201 9 6.13786 9.03556 6.20115 9.09885C6.26444 9.16214 6.3 9.24799 6.3 9.3375V10.0125C6.3 10.102 6.26444 10.1879 6.20115 10.2511C6.13786 10.3144 6.05201 10.35 5.9625 10.35H5.2875C5.19799 10.35 5.11214 10.3144 5.04885 10.2511C4.98556 10.1879 4.95 10.102 4.95 10.0125V9.3375ZM4.95 12.0375C4.95 11.948 4.98556 11.8621 5.04885 11.7989C5.11214 11.7356 5.19799 11.7 5.2875 11.7H5.9625C6.05201 11.7 6.13786 11.7356 6.20115 11.7989C6.26444 11.8621 6.3 11.948 6.3 12.0375V12.7125C6.3 12.802 6.26444 12.8879 6.20115 12.9511C6.13786 13.0144 6.05201 13.05 5.9625 13.05H5.2875C5.19799 13.05 5.11214 13.0144 5.04885 12.9511C4.98556 12.8879 4.95 12.802 4.95 12.7125V12.0375Z"
      fill={color}
    />
    <path
      d="M15.75 4.95C15.75 4.59196 15.6078 4.24858 15.3546 3.99541C15.1014 3.74223 14.758 3.6 14.4 3.6H13.05V2.925C13.05 2.74598 12.9789 2.57429 12.8523 2.4477C12.7257 2.32112 12.554 2.25 12.375 2.25C12.196 2.25 12.0243 2.32112 11.8977 2.4477C11.7711 2.57429 11.7 2.74598 11.7 2.925V3.6H9.675V2.925C9.675 2.74598 9.60388 2.57429 9.4773 2.4477C9.35071 2.32112 9.17902 2.25 9 2.25C8.82098 2.25 8.64929 2.32112 8.5227 2.4477C8.39612 2.57429 8.325 2.74598 8.325 2.925V3.6H6.3V2.925C6.3 2.74598 6.22888 2.57429 6.1023 2.4477C5.97571 2.32112 5.80402 2.25 5.625 2.25C5.44598 2.25 5.27429 2.32112 5.1477 2.4477C5.02112 2.57429 4.95 2.74598 4.95 2.925V3.6H3.6C3.24196 3.6 2.89858 3.74223 2.64541 3.99541C2.39223 4.24858 2.25 4.59196 2.25 4.95V6.3H15.75V4.95Z"
      fill={color}
    />
    <path
      d="M2.25 14.4C2.25 14.758 2.39223 15.1014 2.64541 15.3546C2.89858 15.6078 3.24196 15.75 3.6 15.75H14.4C14.758 15.75 15.1014 15.6078 15.3546 15.3546C15.6078 15.1014 15.75 14.758 15.75 14.4V7.65H2.25V14.4ZM11.7 9.3375C11.7 9.24799 11.7356 9.16214 11.7989 9.09885C11.8621 9.03556 11.948 9 12.0375 9H12.7125C12.802 9 12.8879 9.03556 12.9511 9.09885C13.0144 9.16214 13.05 9.24799 13.05 9.3375V10.0125C13.05 10.102 13.0144 10.1879 12.9511 10.2511C12.8879 10.3144 12.802 10.35 12.7125 10.35H12.0375C11.948 10.35 11.8621 10.3144 11.7989 10.2511C11.7356 10.1879 11.7 10.102 11.7 10.0125V9.3375ZM11.7 12.0375C11.7 11.948 11.7356 11.8621 11.7989 11.7989C11.8621 11.7356 11.948 11.7 12.0375 11.7H12.7125C12.802 11.7 12.8879 11.7356 12.9511 11.7989C13.0144 11.8621 13.05 11.948 13.05 12.0375V12.7125C13.05 12.802 13.0144 12.8879 12.9511 12.9511C12.8879 13.0144 12.802 13.05 12.7125 13.05H12.0375C11.948 13.05 11.8621 13.0144 11.7989 12.9511C11.7356 12.8879 11.7 12.802 11.7 12.7125V12.0375ZM8.325 9.3375C8.325 9.24799 8.36056 9.16214 8.42385 9.09885C8.48714 9.03556 8.57299 9 8.6625 9H9.3375C9.42701 9 9.51286 9.03556 9.57615 9.09885C9.63944 9.16214 9.675 9.24799 9.675 9.3375V10.0125C9.675 10.102 9.63944 10.1879 9.57615 10.2511C9.51286 10.3144 9.42701 10.35 9.3375 10.35H8.6625C8.57299 10.35 8.48714 10.3144 8.42385 10.2511C8.36056 10.1879 8.325 10.102 8.325 10.0125V9.3375ZM8.325 12.0375C8.325 11.948 8.36056 11.8621 8.42385 11.7989C8.48714 11.7356 8.57299 11.7 8.6625 11.7H9.3375C9.42701 11.7 9.51286 11.7356 9.57615 11.7989C9.63944 11.8621 9.675 11.948 9.675 12.0375V12.7125C9.675 12.802 9.63944 12.8879 9.57615 12.9511C9.51286 13.0144 9.42701 13.05 9.3375 13.05H8.6625C8.57299 13.05 8.48714 13.0144 8.42385 12.9511C8.36056 12.8879 8.325 12.802 8.325 12.7125V12.0375ZM4.95 9.3375C4.95 9.24799 4.98556 9.16214 5.04885 9.09885C5.11214 9.03556 5.19799 9 5.2875 9H5.9625C6.05201 9 6.13786 9.03556 6.20115 9.09885C6.26444 9.16214 6.3 9.24799 6.3 9.3375V10.0125C6.3 10.102 6.26444 10.1879 6.20115 10.2511C6.13786 10.3144 6.05201 10.35 5.9625 10.35H5.2875C5.19799 10.35 5.11214 10.3144 5.04885 10.2511C4.98556 10.1879 4.95 10.102 4.95 10.0125V9.3375ZM4.95 12.0375C4.95 11.948 4.98556 11.8621 5.04885 11.7989C5.11214 11.7356 5.19799 11.7 5.2875 11.7H5.9625C6.05201 11.7 6.13786 11.7356 6.20115 11.7989C6.26444 11.8621 6.3 11.948 6.3 12.0375V12.7125C6.3 12.802 6.26444 12.8879 6.20115 12.9511C6.13786 13.0144 6.05201 13.05 5.9625 13.05H5.2875C5.19799 13.05 5.11214 13.0144 5.04885 12.9511C4.98556 12.8879 4.95 12.802 4.95 12.7125V12.0375Z"
      stroke={color}
      strokeWidth="2"
      mask="url(#path-1-inside-1_3163_2680)"
    />
    <path
      d="M15.75 4.95C15.75 4.59196 15.6078 4.24858 15.3546 3.99541C15.1014 3.74223 14.758 3.6 14.4 3.6H13.05V2.925C13.05 2.74598 12.9789 2.57429 12.8523 2.4477C12.7257 2.32112 12.554 2.25 12.375 2.25C12.196 2.25 12.0243 2.32112 11.8977 2.4477C11.7711 2.57429 11.7 2.74598 11.7 2.925V3.6H9.675V2.925C9.675 2.74598 9.60388 2.57429 9.4773 2.4477C9.35071 2.32112 9.17902 2.25 9 2.25C8.82098 2.25 8.64929 2.32112 8.5227 2.4477C8.39612 2.57429 8.325 2.74598 8.325 2.925V3.6H6.3V2.925C6.3 2.74598 6.22888 2.57429 6.1023 2.4477C5.97571 2.32112 5.80402 2.25 5.625 2.25C5.44598 2.25 5.27429 2.32112 5.1477 2.4477C5.02112 2.57429 4.95 2.74598 4.95 2.925V3.6H3.6C3.24196 3.6 2.89858 3.74223 2.64541 3.99541C2.39223 4.24858 2.25 4.59196 2.25 4.95V6.3H15.75V4.95Z"
      stroke={color}
      strokeWidth="2"
      mask="url(#path-1-inside-1_3163_2680)"
    />
  </svg>
)

export default CalendarIcon