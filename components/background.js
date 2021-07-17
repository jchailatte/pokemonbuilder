import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//note: replace this later or at least replace the background
// also organize the graphics folder

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#f7f1e1',
        backgroundImage: `url('/graphics/pokebackground.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
        [theme.breakpoints.up('md')]: {
            backgroundPosition: 'right'
        },
        [theme.breakpoints.down('md')]: {
            backgroundPosition: '80%'
        }
    }
}));

export default function Background(props) {
    const classes = useStyles();

    return (
        <div
            className={classes.container}
            id="background"
        >
            {props.children}
        </div>
    );
}

Background.propTypes = {
    children: PropTypes.element
};