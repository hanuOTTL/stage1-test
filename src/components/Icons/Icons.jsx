export const Send = ({ color = "#34143E" }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.49952 12.5L19.9995 2.00005M9.6271 12.8281L12.2552 19.5861C12.4867 20.1815 12.6025 20.4791 12.7693 20.566C12.9139 20.6414 13.0862 20.6415 13.2308 20.5663C13.3977 20.4796 13.5139 20.1821 13.7461 19.587L20.3364 2.69925C20.546 2.16207 20.6509 1.89348 20.5935 1.72185C20.5437 1.5728 20.4268 1.45583 20.2777 1.40604C20.1061 1.34871 19.8375 1.45352 19.3003 1.66315L2.41258 8.25349C1.8175 8.48572 1.51997 8.60183 1.43326 8.76873C1.35809 8.91342 1.35819 9.08567 1.43353 9.23027C1.52043 9.39707 1.81811 9.51283 2.41345 9.74436L9.17146 12.3725C9.2923 12.4195 9.35273 12.443 9.40361 12.4793C9.44871 12.5114 9.48815 12.5509 9.52031 12.596C9.55661 12.6468 9.58011 12.7073 9.6271 12.8281Z"
        stroke={color}
        stroke-width="2.004"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const TimeCheck = ({ className }) => {
  return (
    <svg
      className={className} // Make it scale with className
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 19L16.5 21L21 16.5M21.9851 12.5499C21.995 12.3678 22 12.1845 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.4354 6.33651 21.858 11.7385 21.9966M12 6V12L15.7384 13.8692"
        stroke="#AB6ACB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Code = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 17L22 12L17 7M7 7L2 12L7 17M14 3L10 21"
        stroke="#AB6ACB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Glasses = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 11.5347C11.2335 10.8218 12.7663 10.8218 13.9999 11.5347M8.82843 9.17157C10.3905 10.7337 10.3905 13.2663 8.82843 14.8284C7.26634 16.3905 4.73367 16.3905 3.17157 14.8284C1.60948 13.2663 1.60948 10.7337 3.17157 9.17157C4.73366 7.60948 7.26633 7.60948 8.82843 9.17157ZM20.8284 9.17157C22.3905 10.7337 22.3905 13.2663 20.8284 14.8284C19.2663 16.3905 16.7337 16.3905 15.1716 14.8284C13.6095 13.2663 13.6095 10.7337 15.1716 9.17157C16.7337 7.60948 19.2663 7.60948 20.8284 9.17157Z"
        stroke="#AB6ACB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

