import { Fragment } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Card,
    CardActionArea
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
                style={{height: '100%'}}
            >
                <Link
                    href={{
                        pathname: `/pokemon`,
                        query: { pos: props.pos }
                    }}
                >
                    <CardActionArea
                        className={classes.cardStyle}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                md={4}
                                item
                                style={{textAlign: 'center'}}
                            >
                                <img
                                    alt="pokemon"
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`}
                                />
                                <Typography>
                                    {props.pokemon.pokemon}
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
                                        {props.pokemon.type.map((item, i) => {
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
                                            {props.pokemon.ability.toUpperCase()}
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
                                            {props.pokemon.item.toUpperCase()}
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
                                            {props.pokemon.nature.toUpperCase()}
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
                                        {props.pokemon.moves.map((move,i) => {
                                            return (
                                                <Typography
                                                    key={"move" + i}
                                                >
                                                    {move.toUpperCase()}
                                                </Typography>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Link>
            </Card>
        </Fragment >
    )
}

export default InfoCard;