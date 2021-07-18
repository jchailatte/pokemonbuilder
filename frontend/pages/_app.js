import { Fragment, useEffect, Children } from "react";
import { Provider } from 'next-auth/client';
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import theme from "@/components/theme";
import Background from "@/components/background";

//https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

const App = ({ Component, pageProps = {} }) => {

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Fragment>
            <Provider session={pageProps.session}>
                <ThemeProvider
                    theme={theme}
                >
                    <CssBaseline />
                    <Background>
                        <Component {...pageProps} />
                    </Background>
                </ThemeProvider>
            </Provider>
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
