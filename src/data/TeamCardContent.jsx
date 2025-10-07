import Valik from '../assets/team/Valik.png';
import Vanya from '../assets/team/Vanya.png';
import Andrii from '../assets/team/Andrii.png';
import Maxik from '../assets/team/Maxik.png';

import { FaLinkedinIn, FaTelegramPlane, FaGithub } from 'react-icons/fa';

const teamContent = [
  {
    photoMember: Valik,
    fullname: 'Новосад Валентин',
    position: 'Backend розробник',
    description: 'Створює логіку, бази даних і серверну частину платформи.',
    socials: [
      { link: 'https://t.me/r1nozaki', icon: <FaLinkedinIn size={18} /> },
      {
        link: 'https://t.me/r1nozaki',
        icon: <FaTelegramPlane size={18} />,
      },
      {
        link: 'https://github.com/ValentynNovosad',
        icon: <FaGithub size={18} />,
      },
    ],
  },
  {
    photoMember: Vanya,
    fullname: 'Загоруй Іван',
    position: 'Frontend розробник',
    description: 'Завжди шукає баланс між естетикою та продуктивністю.',
    socials: [
      { link: 'https://t.me/r1nozaki', icon: <FaLinkedinIn size={18} /> },
      { link: 'https://t.me/r1nozaki', icon: <FaTelegramPlane size={18} /> },
      { link: 'https://github.com/r1nozaki', icon: <FaGithub size={18} /> },
    ],
  },
  {
    photoMember: Andrii,
    fullname: 'Дроб Андрій',
    position: 'UI/UX дизайнер',
    description: 'Проєктує досвід користувачів і створює візуальний стиль.',
    socials: [
      { link: 'https://t.me/r1nozaki', icon: <FaLinkedinIn size={18} /> },
      { link: 'https://t.me/r1nozaki', icon: <FaTelegramPlane size={18} /> },
      { link: 'https://github.com/andriydrob', icon: <FaGithub size={18} /> },
    ],
  },
  {
    photoMember: Maxik,
    fullname: 'Мальований Максим',
    position: 'Тімлід',
    description: 'Поєднує технічну експертизу з людяністю та баченням.',
    socials: [
      { link: 'https://t.me/r1nozaki', icon: <FaLinkedinIn size={18} /> },
      { link: 'https://t.me/r1nozaki', icon: <FaTelegramPlane size={18} /> },
      { link: 'https://t.me/r1nozaki', icon: <FaGithub size={18} /> },
    ],
  },
];

export default teamContent;
