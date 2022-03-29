import { ReactElement } from 'react';
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types';
import { Provider } from 'react-redux';

import Head from 'next/head';

import store from '../services/store';

import '../styles/globals.less';
import '../styles/bootstrap.less';
import '../styles/antd.less';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): ReactElement {

  const getLayout = Component.getLayout ?? ((page) => page);

  return <Provider store={store}>
    <Head>
      <title>SETSAIL TEST</title>
    </Head>
    {getLayout(<Component {...pageProps} />)}
  </Provider>
}

export default MyApp
