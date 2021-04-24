const FolderAddIcon = ({
  color = 'var(--light)',
  width = '20',
  height = '16',
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
        d="M18 2H10L8 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V4C20 2.89 19.11 2 18 2ZM17 10H14V13H12V10H9V8H12V5H14V8H17V10Z"
        fill={color}
      />
    </svg>
  );
};

export default FolderAddIcon;
