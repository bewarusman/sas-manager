const ProfileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 3a.75.75 0 01.75.75v4.5A.75.75 0 019 9H5.75A.75.75 0 015 8.25v-4.5A.75.75 0 015.75 3h4z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 11.25A.75.75 0 0110.5 12h2.25a.75.75 0 01.75.75v4.5A.75.75 0 0112.75 18H9.75a.75.75 0 01-.75-.75v-4.5z"
    />
  </svg>
);

export default ProfileIcon;
