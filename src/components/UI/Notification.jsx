import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { FaInfoCircle } from 'react-icons/fa';
import { AnimatePresence, motion } from 'motion/react';

const Notification = ({ type, message, className = '' }) => {
  const styles = {
    success: 'bg-green-500 text-center',
    error: 'bg-red-500 text-center',
    info: 'bg-blue-500 text-center',
  };

  const icons = {
    success: <FaCheckCircle className='mr-2 flex-shrink-0' />,
    error: <MdError className='mr-2 flex-shrink-0' />,
    info: <FaInfoCircle className='mr-2 flex-shrink-0' />,
  };

  return (
    <AnimatePresence>
      <motion.div
        key='notification'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center px-5
           py-3 rounded-lg shadow-md text-white ${styles[type]} ${className}`}
      >
        {icons[type]}
        <span className='text-sm md:text-base'>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
