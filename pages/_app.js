import { Fragment, useEffect, Children } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
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
            <ThemeProvider
                theme={theme}
            >
                <CssBaseline />
                <Background>
                    <Component {...pageProps} />
                </Background>
            </ThemeProvider>
        </Fragment>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
