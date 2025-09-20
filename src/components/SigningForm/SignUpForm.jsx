import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from 'motion/react';
import * as yup from 'yup';
import Logo from '../Logo';
import { X, Eye, EyeOff } from 'lucide-react';
import GoogleIcon from '../../assets/googleIcon.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Електронна адреса обов'язкова")
    .email('Неправильна електронна адреса'),
  password: yup
    .string()
    .required("Пароль обов'язковий")
    .min(8, 'Мінімальна кількість символів 8')
    .max(20, 'Максимальна кількість символів 20'),
});

const SignUpForm = ({ handleSignUp }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = data => {
    console.log(data);
  };

  const passwordValue = watch('password');

  return (
    <AnimatePresence>
      <motion.div
        key='backdrop'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='fixed inset-0 bg-black z-40 hover:cursor-pointer'
        onClick={handleSignUp}
      />

      <motion.form
        key='signup-form'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className=' fixed top-[55%] left-[50%] z-50 -translate-x-[50%] -translate-y-[50%] w-133 h-125 px-20  rounded-[52px] bg-[#D4DBE2] flex flex-col items-center '
      >
        <X
          className='absolute top-5 right-6 hover:cursor-pointer'
          onClick={handleSignUp}
        />
        <div className='flex flex-col justify-center items-center mb-5'>
          <Logo />
          <h2 className='font-bold text-xl'>Створити обліковий запис</h2>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-col gap-2'>
            <input
              {...register('email')}
              className='border-1 border-black w-full h-14.5 px-3 rounded-2xl bg-white placeholder:text-[#D4DBE2] focus:border-2'
              placeholder='Введіть електрону адресу'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className='relative flex items-center'>
              <input
                {...register('password')}
                className='border-1 border-black w-full h-14.5 px-3 rounded-2xl bg-white placeholder:text-[#D4DBE2] focus:border-2'
                placeholder='Введіть пароль'
                type={isShowPassword ? 'text' : 'password'}
              />
              {passwordValue &&
                passwordValue.length > 0 &&
                (isShowPassword ? (
                  <EyeOff
                    className='absolute right-2 hover:cursor-pointer'
                    color='#000000'
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <Eye
                    className='absolute right-2 hover:cursor-pointer'
                    color='#000000'
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ))}
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='button'
            className='w-full py-4 bg-[#674CFF] rounded-[50px] text-xl text-white text-center transition-colors duration-300 hover:bg-[#5038c6] hover:cursor-pointer'
          >
            Зареєструватись
          </button>
        </div>

        <div className='flex gap-3.5 items-center w-full my-4'>
          <hr className='border-t border-[#1D0F0F] flex-grow' />
          <span className='text-[##1D0F0F]'>АБО</span>
          <hr className='border-t border-[#1D0F0F] flex-grow' />
        </div>
        <button
          type='submit'
          className='w-full flex items-center  bg-[#674CFF] hover:bg-[#5038c6] rounded-[50px] text-xl text-white py-4 transition-colors duration-300 relative hover:cursor-pointer'
        >
          <span className='w-13 h-13 rounded-full bg-white flex justify-center items-center py-2 absolute left-1'>
            <img src={GoogleIcon} alt='Google icon' />
          </span>
          <span className='mx-auto'>Продовжити з Google</span>
        </button>
      </motion.form>
    </AnimatePresence>
  );
};

export default SignUpForm;
