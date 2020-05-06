declare global {
  interface Window {
    Cypress: unknown;
  }
}

const isDev =
  process.env.NODE_ENV === "development" || (typeof window !== 'undefined' && window.Cypress);

export default isDev;
