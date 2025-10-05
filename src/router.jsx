import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

export const ROUTER_PATHS = {
  HOME: '/',
  ABOUTUS: '/about',
  SAFETY: '/safety',
  SUPPORT: '/support',
  POLICY: '/policy',
  TERMS: '/terms',
  PROBLEM: '/problem',
  MISSION: '/mission',
  TEAM: '/team',
  PARTNER: '/partner',
  FAQ: '/faq',
  CONTACT: '/contact',
  INSTRUCTION: '/instruction',
};

const AppLayout = lazy(() => import('./App'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUs/AboutPage'));
const SafetyPage = lazy(() => import('./pages/TipsSafety/TipsSafetyPage'));
const PolicyPage = lazy(() =>
  import('./pages/PrivacyPolicy/PrivacyPolicyPage')
);
const TermsPage = lazy(() =>
  import('./pages/TermsConditions/TermsConditionsPage')
);
const ReportProblemPage = lazy(() =>
  import('./pages/ReportProblem/ReportProblemPage')
);
const SupportPage = lazy(() => import('./pages/Support/SupportPage'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage'));
const ContactUs = lazy(() => import('./pages/Сontact/Contact'));
const InstructionPage = lazy(() =>
  import('./pages/Instruction/InstructionPage')
);
const MissionPage = lazy(() => import('./pages/Mission/MissionPage'));
const NotFoundPage = lazy(() => import('./pages/404/Page404'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTER_PATHS.ABOUTUS, element: <AboutUsPage /> },
      { path: ROUTER_PATHS.SAFETY, element: <SafetyPage /> },
      { path: ROUTER_PATHS.PROBLEM, element: <ReportProblemPage /> },
      { path: ROUTER_PATHS.POLICY, element: <PolicyPage /> },
      { path: ROUTER_PATHS.TERMS, element: <TermsPage /> },
      { path: ROUTER_PATHS.SUPPORT, element: <SupportPage /> },
      { path: ROUTER_PATHS.FAQ, element: <FAQPage /> },
      { path: ROUTER_PATHS.CONTACT, element: <ContactUs /> },
      { path: ROUTER_PATHS.INSTRUCTION, element: <InstructionPage /> },
      { path: ROUTER_PATHS.MISSION, element: <MissionPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
