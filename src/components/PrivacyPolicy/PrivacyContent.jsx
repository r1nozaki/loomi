const PrivacyContent = ({ title, content }) => {
  return (
    <div>
      <h2 className='text-3xl font-bold text-white mb-6'>{title}</h2>
      {Array.isArray(content) ? (
        <ul className='list-disc pl-6 mb-8 text-white/80'>
          {content.map((item, index) => (
            <li key={index} className='text-lg text-white/80'>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-lg mb-8 text-white/80'>{content}</p>
      )}
    </div>
  );
};

export default PrivacyContent;
