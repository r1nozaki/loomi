const Btn = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`w-full text-lg font-bold h-12 bg-gradient-to-t from-[#FD267A] to-[#FF6036] text-center text-white rounded-[40px] hover:cursor-pointer transition-colors duration-300 hover:from-[#FF5c93] hover:to-[#FF8C6B]  ${className}`}
    >
      {children}
    </button>
  );
};

export default Btn;
