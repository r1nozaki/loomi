const HeaderSignIn = ({ setSignInModal, signInModal }) => {
  const handleSignInModal = () => {
    setSignInModal(!signInModal);
  };

  return (
    <button
      onClick={handleSignInModal}
      className='text-black text-lg w-25 h-9 bg-white rounded-3xl text-center font-bold transition-colors duration-300 hover:text-black/70 hover:border-1 hover:border-black hover:cursor-pointer '
    >
      Вхід
    </button>
  );
};

export default HeaderSignIn;
