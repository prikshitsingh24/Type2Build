export const AddIcon = ({
  fill = 'currentColor', // Default to currentColor to inherit color from parent
  size = 24, // Default size
  height,
  width,
  label,
  ...props
}: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height || size}
      width={width || size}
      viewBox="0 0 24 24"
      fill={fill} // Set fill to currentColor or passed color
      {...props}
    >
      <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};