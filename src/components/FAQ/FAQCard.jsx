import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaQuestionCircle } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

const FAQCard = ({ question, answer }) => {
  const [isOpenFAQ, setIsOpenFAQ] = useState(false);

  return (
    <div className=' bg-black/20 rounded-md mb-3 transition-colors duration-300 hover:bg-[#3A3A3A]'>
      <button
        onClick={() => setIsOpenFAQ(!isOpenFAQ)}
        className='w-full flex justify-between items-center py-3 px-4 text-left font-medium text-white hover:cursor-pointer pr-2 md:pr-0'
      >
        <div className='flex  items-center gap-3 text-sm md:text-base'>
          <FaQuestionCircle
            className='w-5 h-5 md:w-6 md:h-6 flex-shrink-0'
            color='#F73149 '
          />
          {question}
        </div>
        <motion.div
          animate={{ rotate: isOpenFAQ ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className='w-5 h-5' />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpenFAQ && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='px-4 pb-4 text-white/80 text-sm md:text-base'>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCard;
