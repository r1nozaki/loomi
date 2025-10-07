import TeamMemberCard from './TeamMemberCard';
import teamContent from '../../data/TeamCardContent';

const TeamContent = () => {
  return (
    <div className='w-full md:max-w-6xl mb-10'>
      <h1 className='text-2xl md:text-5xl text-center font-bold text-white mb-5'>
        Наша команда
      </h1>
      <p className='text-base md:text-lg text-center text-white/80 mb-5 md:mb-10 lg:mb-20'>
        Ми - команда студентів об'єднаних спільною метою створити простір для
        знайомств, розвитку та взаємної підтримки
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5 md:mb-10 lg:mb-20 place-items-center'>
        {teamContent.map(social => (
          <TeamMemberCard
            key={social.position}
            photoMember={social.photoMember}
            fullname={social.fullname}
            position={social.position}
            description={social.description}
            socials={social.socials}
          />
        ))}
      </div>
      <div className=''>
        <h2 className='text-xl md:text-4xl font-bold text-white text-center mb-5 '>
          За кулісами
        </h2>
        <p className='text-base md:text-lg text-white/80 text-center'>
          Ми — не просто команда, ми друзі, яких об’єднала спільна мета. Кожен
          із нас має свій характер, стиль і підхід, але саме це створює
          гармонію. Ми разом шукаємо ідеї, ділимося натхненням і підтримуємо
          одне одного в кожному рядку коду, кожній деталі дизайну. За кожною
          кнопкою, кольором і анімацією стоять наші обговорення, жарти й кава о
          третій ночі. Ми віримо, що щирість і взаємоповага — це фундамент, на
          якому народжуються справжні проєкти.
        </p>
      </div>
    </div>
  );
};

export default TeamContent;
