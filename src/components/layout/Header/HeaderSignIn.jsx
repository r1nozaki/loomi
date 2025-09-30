import SignInForm from '../../SigningForm/SignInForm';

const HeaderSignIn = ({ setSignInModal, signInModal }) => {
  const handleSignInModal = () => {
    setSignInModal(!signInModal);
  };

  return (
    <>
      <button
        onClick={handleSignInModal}
        className={`text-black text-lg md:w-25 h-9 bg-white rounded-3xl text-center font-bold transition-colors duration-300 hover:text-black/70 hover:border-1 hover:border-black hover:cursor-pointer w-65 ${
          !signInModal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Вхід
      </button>

      {signInModal && <SignInForm handleSignInModal={handleSignInModal} />}
    </>
  );
};

export default HeaderSignIn;
