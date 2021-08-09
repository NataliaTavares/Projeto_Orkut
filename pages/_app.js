import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons';


const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
     
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Masterkut</title>
              <link
                rel="icon"
                href="https://uc-emoji.azureedge.net/orig/1b/226304666f25b257960f88e692873c.png"
              />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
