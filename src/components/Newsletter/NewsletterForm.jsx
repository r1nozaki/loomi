import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { Mail, MailPlus, ArchiveRestore } from 'lucide-react';

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Поле ' Електронна адреса ' є обов'язковим")
    .email('Введіть коректну електронну адресу'),
});

const NewsletterForm = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = data => {
    setIsSending(true);

    emailjs
      .send(
        'service_5rqb4bg',
        'template_dxxlf7n',
        { email: data.email },
        'dNwarFQeLfc1EdrRh'
      )
      .then(() => {
        reset();
      })
      .catch(err => {
        console.error('Помилка при відправці:', err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:w-[50%] xl:w-[45%]'
    >
      <div className='w-full flex gap-1'>
        <div className='relative w-full'>
          <input
            {...register('email')}
            className='w-full bg-white h-11 placeholder:text-[#D4DBE2] rounded focus:outline-none focus:border-2 focus:border-black pl-10'
            placeholder='Введіть електронну адресу'
          />
          <Mail className='absolute z-10 top-2.5 left-2 pointer-events-none text-black' />
        </div>
        <button
          type='submit'
          disabled={isSending}
          className='w-full sm:w-fit sm:min-w-32 lg:min-w-36 h-10 lg:h-11 bg-black text-white flex items-center justify-center gap-1 rounded hover:cursor-pointer transition-colors duration-300 hover:bg-[#3D3D3D]'
        >
          {isSending ? (
            <ArchiveRestore />
          ) : (
            <>
              Підписатися <MailPlus />
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <div className='text-white text-sm'>{errors.email.message}</div>
      )}
    </form>
  );
};

export default NewsletterForm;
