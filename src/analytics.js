import ReactGA from 'react-ga4';

const trackingId = "G-Z8VNYYZT6X"; // Remplacez par votre ID de suivi
ReactGA.initialize(trackingId);

export const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};