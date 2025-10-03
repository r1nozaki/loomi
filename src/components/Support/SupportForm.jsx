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
  topic: yup
    .string()
    .required("Поле ' Тема звернення '  є обов'язковим")
    .min(10, 'Опишіть проблему детальніше (мінімум 10 символів)')
    .max(1500, 'Скоротіть опис — дозволено до 1500 символів'),
});

const SupportForm = ({ setSuccess, setError }) => {
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
        'template_hyy7fbc',
        {
          name: data.name,
          email: data.email,
          topic: data.topic,
        },
        'PskL4GEQ6kMNnIPsp'
      )
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        reset();
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full bg-black/20 p-10 text-white'
    >
      <div className='flex flex-col mb-5'>
        <label htmlFor='name' className='text-white mb-2'>
          Ім'я
        </label>
        <input
          {...register('name')}
          className='w-full h-10 border border-gray-200/20 pl-2 bg-[#272727]  rounded focus:outline-none focus:border-2'
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-5'>
        <label htmlFor='email' className='text-white mb-2'>
          Електронна адреса
        </label>
        <input
          {...register('email')}
          className='w-full h-10 border border-gray-200/20 pl-2 bg-[#272727]  rounded focus:outline-none focus:border-2'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-5'>
        <label htmlFor='topic' className='text-white mb-2'>
          Тема звернення
        </label>
        <textarea
          rows={4}
          {...register('topic')}
          className='w-full  border border-gray-200/20 pl-2 bg-[#272727]  rounded focus:outline-none focus:border-2 resize-none'
        />
        {errors.topic && (
          <p className='text-red-500 text-sm'>{errors.topic.message}</p>
        )}
      </div>
      <div className='flex items-center gap-3 mt-6'>
        <button
          type='sumbit'
          disabled={isSending}
          className='py-3 px-5 text-white bg-[#F73149] rounded-md transition-colors duration-300 hover:bg-[#D62B40] hover:cursor-pointer'
        >
          {isSending ? <ClipLoader size={30} color='#ffffff' /> : 'Надіслати'}
        </button>
        <span className='text-white/80 text-sm'>
          Ми відповімо протягом 24 годин.
        </span>
      </div>
    </form>
  );
};

export default SupportForm;
