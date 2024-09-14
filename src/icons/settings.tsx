const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12v5a2 2 0 002 2h4a2 2 0 002-2v-5" />
  </svg>
);

export default SettingsIcon;
