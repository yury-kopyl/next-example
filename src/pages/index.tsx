import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import {ReactElement} from "react";
import {NextPageWithLayout} from "#app/pages/_app";
import {PublicLayout} from "#app/layouts/publicLayout";
import {serverSideProtected} from "#lib/serverSideProtected";


const Home: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>React-example</title>

        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}

          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a
            className={styles.card}
            href="https://nextjs.org/docs"
          >
            <h2>Documentation &rarr;</h2>

            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href="https://nextjs.org/learn"
          >
            <h2>Learn &rarr;</h2>

            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/canary/examples"
          >
            <h2>Examples &rarr;</h2>

            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h2>Deploy &rarr;</h2>

            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          Powered by{' '}

          <span className={styles.logo}>
            <Image
              alt="Vercel Logo"
              height={16}
              src="/vercel.svg"
              width={72}
            />
          </span>
        </a>
      </footer>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <PublicLayout user={page.props.user}>
      {page}
    </PublicLayout>
  );
}


export const getServerSideProps = serverSideProtected('', false, true);
export default Home;
