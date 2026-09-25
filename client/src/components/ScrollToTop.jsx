import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component renders nothing visible — its only job is to run
// an effect every time the URL path changes.
function ScrollToTop() {
  // useLocation() gives us info about the current URL. Whenever the
  // pathname changes (i.e. the user navigates to a different route),
  // this component re-renders with a new `pathname` value.
  const { pathname } = useLocation();

  // Because `pathname` is in the dependency array [pathname], this
  // effect runs every time the route changes (not just once on mount).
  useEffect(() => {
    window.scrollTo(0, 0); // instantly snap scroll back to the very top
  }, [pathname]);

  return null; // this component has no visual output
}

export default ScrollToTop;
