import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SSRProvider } from '@react-aria/ssr';
import { ThemeProvider } from 'next-themes';
import CommandBar from '@/components/CommandBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  const { title, description, thumbnail } = pageProps;
  const metaTitle = `${title ? `${title} - ` : ''}JackeyLove`;
  const metaDescription = description ? description : 'AD Carry';
  return (
    <>
      <SSRProvider>
        <Head>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
          <meta name="description" content={metaDescription} />
          <meta name="og:description" content={metaDescription} />
          <meta httpEquiv="Content-Language" content="en" />
          <meta property="og:type" content="website" />
          <meta name="author" content="Zhou SongJie" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Head>
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
        >
          <CommandBar>
            <a
              href="#main"
              className="fixed top-0 left-0 p-2 -translate-y-full focus:translate-y-0"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main">
              <Component {...pageProps} />
            </main>
            <Footer />
          </CommandBar>
        </ThemeProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
