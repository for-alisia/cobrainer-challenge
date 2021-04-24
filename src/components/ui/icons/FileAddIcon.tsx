const FileAddIcon = ({
  color = 'var(--light)',
  width = '20',
  height = '20',
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.34159 3.33329C3.34159 2.41663 4.08325 1.66663 4.99992 1.66663H11.6666L16.6666 6.66663V16.6666C16.6666 17.5833 15.9166 18.3333 14.9999 18.3333H4.99158C4.07492 18.3333 3.33325 17.5833 3.33325 16.6666L3.34159 3.33329ZM10.8333 2.91663V7.49996H15.4166L10.8333 2.91663ZM8 7H10V10H13V12H10V15H8V12H5V10H8V7Z"
        fill={color}
      />
    </svg>
  );
};

export default FileAddIcon;
