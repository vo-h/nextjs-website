import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Script from 'next/script'
import Link from 'next/link'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />
    <Script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin/>
    <Script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossorigin/>
    <Component {...pageProps} />
    </>
  )
}
// return (
//   <Layout>
//     <Component {...pageProps} />
//   </Layout>
// )
