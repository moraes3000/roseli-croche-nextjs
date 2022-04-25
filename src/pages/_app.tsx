import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header';
import BtnWhatssap from '../components/btnWhatssap';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className='max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
        <Component {...pageProps} />
        <BtnWhatssap phone={5511983931270} msg='Olá gostaria de conversar sobre o...' />
      </div>
    </>
  )
}

export default MyApp
