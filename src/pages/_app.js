import '@/common/styles/globals.css'
import '@/common/styles/coming-soon.css'
import '@/common/styles/join-us.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

import { PUBLIC_PAGES } from "@/_Constants"
import toast, { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  switch (process.env.APP_ENVIORNMENT) {
    case 'production': {
      return (
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          { ( PUBLIC_PAGES ).includes(router.pathname) ? (
            <Component {...pageProps} /> ) : ( <RedirectToJoinUs />)}
        </>
      );
    }
    default: { 
      return (   
        <>
           <Toaster position="bottom-center" reverseOrder={false} />
          { ( PUBLIC_PAGES ).includes(router.pathname) ? (
            <Component {...pageProps} /> ) : ( <RedirectToJoinUs />)}
        </>
      );
    }
  }
}


function RedirectToJoinUs() {
  useEffect(() => {
    const url = new URL(`${window.location.origin}/join-us`);
    window.location = url;
  }, []);

  return (<></>);
}