import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Card
} from '@material-ui/core';

import usePokestore from '@/store/pokestore';

const useStyles = makeStyles(theme => ({
    cardStyle: {
        padding: theme.spacing(3),
    }
}));

const InfoCard = (props) => {
    const { team } = usePokestore(state => state);
    const classes = useStyles();

    return (
        <Fragment>
            <Card
                className={classes.cardStyle}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        md={4}
                        item
                    >
                        <img
                            alt="pokemon"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${team[props.pos].id}.png`}
                        />
                        <Typography>
                            {team[props.pos].pokemon}
                        </Typography>
                    </Grid>
                    <Grid
                        md={8}
                        item
                    >
                        <Grid
                            container
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Type:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                                xs={10}
                            >
                                {team[props.pos].type.map((item, i) => {
                                    return (
                                        <img
                                            src={`https://www.serebii.net/pokedex-bw/type/${item.type.name}.gif`}
                                            placeholder={item.type.name}
                                            height={18}
                                            key={"type" + i}
                                        />
                                    )
                                })}
                            </Grid>
                            <Grid
                                xs={2}
                                item
                            >
                                <Typography>
                                    Ability:
                                </Typography>
                            </Grid>
                            <Grid
                                xs={10}
                                item
                            >
                                <Typography>
                                    {team[props.pos].ability.toUpperCase()}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Item:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                            >
                                <Typography>
                                    {team[props.pos].item.toUpperCase()}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Nature:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                            >
                                <Typography>
                                    {team[props.pos].nature.toUpperCase()}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Moves:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                            >
                                {team[props.pos].moves.map((move) => {
                                    return (
                                        <Typography>
                                            {move.toUpperCase()}
                                        </Typography>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Fragment >
    )
}

export default InfoCard;