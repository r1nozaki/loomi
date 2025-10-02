import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { ClipLoader } from 'react-spinners';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Поле ' Ім'я ' є обов'язковим")
    .min(2, 'Мінімальна довжина імені — 2 символи'),
  email: yup
    .string()
    .required("Поле ' Електронна адреса ' є обов'язковим")
    .email('Введіть коректну електронну адресу'),
  message: yup
    .string()
    .required("Поле ' Тема звернення '  є обов'язковим")
    .min(10, 'Опишіть проблему детальніше (мінімум 10 символів)')
    .max(1500, 'Скоротіть опис — дозволено до 1500 символів'),
});

const ContactForm = () => {
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
        'service_i5joimm',
        'template_n50ityn',
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        'PskL4GEQ6kMNnIPsp'
      )
      .then(reset())
      .catch(err => {
        console.error('Помилка при відправці:', err);
      })
      .finally(() => setIsSending(false));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4 bg-black/20 px-5 py-10 rounded-lg'
    >
      <div className='flex flex-col'>
        <input
          {...register('name')}
          className='w-full border border-gray-200/20 p-3 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder="Ім'я"
        />
        {errors.name && (
          <p className='text-sm text-red-500'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col'>
        <input
          {...register('email')}
          className='w-full border border-gray-200/20 p-3 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder='Електронна адреса'
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>
      <div className='flex flex-col'>
        <textarea
          rows={5}
          {...register('message')}
          className='w-full border border-gray-200/20 p-3 rounded-xl resize-none text-white placeholder:text-white/70 focus:outline-none focus:border-white'
          placeholder='Повідомлення'
        />
        {errors.message && (
          <p className='text-sm text-red-500'>{errors.message.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='w-full bg-[#F73149] text-white p-2 rounded-lg transition-colors duration-300 hover:bg-[#D62B40] hover:cursor-pointer'
      >
        {isSending ? <ClipLoader color='ffffff' /> : 'Надіслати'}
      </button>
    </form>
  );
};

export default ContactForm;
