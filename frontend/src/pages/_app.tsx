import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import {
  ApolloClient, ApolloClientOptions, ApolloProvider, InMemoryCache, NormalizedCacheObject
} from "@apollo/client";

import { theme } from "../lib/theme";
import {
  ConfigKey, getConfig, saveConfig
} from "../lib/config";

const defaultServerUri = "https://snippet.qfstudio.net/graphql";

const apolloClientSettings: ApolloClientOptions<NormalizedCacheObject> = {
  uri: defaultServerUri,
  cache: new InMemoryCache(),
  credentials: "include"
};

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [apolloClient, setApolloClient] = React.useState<ApolloClient<NormalizedCacheObject>>(null);

  React.useEffect(() => {
    const uri = String(getConfig(ConfigKey.SERVER_URL));
    if (uri) {
      Object.assign(apolloClientSettings, { uri });
      setApolloClient(new ApolloClient(apolloClientSettings));
    } else {
      const defaultUri = defaultServerUri;
      saveConfig(ConfigKey.SERVER_URL, defaultUri);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>Snippet Flow</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          apolloClient && <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        }
      </ThemeProvider>
    </React.Fragment>
  );
}
