import {
  FaTiktok,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Socials = () => {
  const socialsIcon = [
    {
      icon: <FaInstagram size={24} />,
      link: 'https://www.instagram.com/_r1nozaki/?hl=ru',
      alt: 'Instagram',
    },
    {
      icon: <FaTelegramPlane size={24} />,
      link: 'https://web.telegram.org/k/#r1nozaki',
      alt: 'Telegram',
    },
    {
      icon: <FaYoutube size={24} />,
      link: 'https://www.youtube.com/results?search_query=%D1%88%D0%BE%D1%83+%D1%88%D0%B2%D0%B8%D0%B4%D0%BA%D1%96+%D0%BF%D0%BE%D0%B1%D0%B0%D1%87%D0%B5%D0%BD%D0%BD%D1%8F',
      alt: 'Youtube',
    },
    {
      icon: <FaXTwitter size={24} />,
      link: 'https://x.com/r1nozaki',
      alt: 'Twitter',
    },
    {
      icon: <FaTiktok size={24} />,
      link: 'https://www.tiktok.com/@r1nozaki1',
      alt: 'TikTok',
    },
  ];
  return (
    <div className='flex items-center justify-center gap-5 w-full'>
      {socialsIcon.map(({ icon, link, alt }) => (
        <a
          key={alt}
          href={link}
          alt={alt}
          target='_blank'
          className='transition-colors duration-300 hover:text-[#F73149]'
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
