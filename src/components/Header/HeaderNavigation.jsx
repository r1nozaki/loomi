import { NavLink } from 'react-router';

const HeaderNavigation = () => {
  const navItems = [
    { path: '/about', label: 'Про нас' },
    { path: '/safety', label: 'Поради та безпека' },
    { path: '/support', label: 'Підтримка' },
  ];

  return (
    <>
      {navItems.map(({ path, label }) => (
        <NavLink key={label} to={path}>
          {({ isActive }) => (
            <span
              className={`text-lg transition-colors duration-300 rounded-3xl font-bold hover:bg-white hover:text-black p-2 ${
                isActive ? 'rounded-3xl bg-white text-center' : 'text-white'
              }`}
            >
              {label}
            </span>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default HeaderNavigation;
