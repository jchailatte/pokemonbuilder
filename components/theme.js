import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: '#000000'
            },
            secondary: {
                main: '#00FFFF'
            },
            error: {
                main: red.A400
            },
            background: {
                default: '#003366'
            }
        },
        typography: {
            fontFamily: "'Raleway', san-serif"
        },
        overrides: {},
        props: {
            MuiButton: {
                color: 'primary'
            }
        }
    })
);

export default theme;
