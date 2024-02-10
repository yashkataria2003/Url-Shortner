import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ShorUrlRedirected.css'

const ShortUrlRedirect  = () => {
  const { urlCode } = useParams();
  const serverBaseUrl = import.meta.env.VITE_APP_URI;

  const redirect = () => {
    let url = (serverBaseUrl + `/${urlCode}`);
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      redirect();
    }
  }, [ urlCode ]);

  return (
    <div>
      <h2 className='ShorUrlRedirectedHeading'>
        Redirecting...
      </h2>
    </div>
  );
}

export default ShortUrlRedirect 

