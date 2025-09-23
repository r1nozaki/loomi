import ReportProblemForm from './ReportProblemForm';

const ReportProblemSection = () => {
  return (
    <section className='w-full px-3 md:px-0 min-h-screen flex flex-col items-center justify-center bg-[#272727] text-center pt-16'>
      <h1 className='w-full text-4xl font-extrabold text-[#F73149] mb-8'>
        Повідомити про проблему
      </h1>
      <p className='max-w-4xl mx-auto text-xl mb-12 text-white'>
        Будь ласка, повідомте нам про проблему, з якою ви зіткнулись. Ми
        розглянемо вашу заявку і повернемось до вас з відповіддю.
      </p>
      <ReportProblemForm />
    </section>
  );
};

export default ReportProblemSection;
