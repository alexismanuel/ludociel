import Head from 'next/head'
import ContactForm from '@components/ContactForm'

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Ludociel - Contactez-nous !</title>
      </Head>

      <main>
        <div>
            <ContactForm />
        </div>
      </main>
    </div>
  )
};
export default Home;
