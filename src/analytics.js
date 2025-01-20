import ReactGA from 'react-ga';

const trackingId = "G-Z8VNYYZT6X"; // Remplacez par votre ID de suivi
ReactGA.initialize(trackingId);

export const trackPageView = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};