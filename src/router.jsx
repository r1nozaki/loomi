import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import AboutPage from './pages/AboutPage';

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
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUsPage = lazy(() => import('./pages/AboutPage'));
const SafetyPage = lazy(() => import('./pages/TipsSafetyPage'));
const PolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsConditionsPage'));
const ReportProblemPage = lazy(() => import('./pages/ReportProblemPage'));

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
      { path: '*', element: '' },
    ],
  },
]);
