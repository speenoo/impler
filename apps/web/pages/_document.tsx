import Script from 'next/script';
import getConfig from 'next/config';
import { createGetInitialProps } from '@mantine/next';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

const { publicRuntimeConfig } = getConfig();
const getInitialProps = createGetInitialProps();
const isAuthPage = (pathname: string) => /^\/auth\/.+/gm.test(pathname);

interface MyDocumentProps extends DocumentInitialProps {
  isAuthPage: boolean;
}

export default class _Document extends Document<MyDocumentProps> {
  static getInitialProps = async (ctx: DocumentContext) => {
    const initialprops = await getInitialProps(ctx);
    const { pathname } = ctx;

    return { ...initialprops, isAuthPage: isAuthPage(pathname) };
  };

  render() {
    return (
      <Html>
        <Head>
          <div></div>
        </Head>
        <body>
          <Main />
          <NextScript />
          {publicRuntimeConfig.NEXT_PUBLIC_EMBED_URL && (
            <Script
              type="text/javascript"
              src={publicRuntimeConfig.NEXT_PUBLIC_EMBED_URL}
              strategy="beforeInteractive"
            />
          )}
        </body>
      </Html>
    );
  }
}
