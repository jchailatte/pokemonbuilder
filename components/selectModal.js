import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Fade,
    Typography,
    Paper,
    Grid,
    Button,
} from '@material-ui/core';

import usePokestore from '@/utils/store/pokestore';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    paperModal: {
        width: '90vw',
        maxHeight: '90vh',
        overflowY: 'scroll',
        padding: '1rem',
    },
    pokemonSelect: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
}));

const SelectModal = (props) => {
    const classes = useStyles();

    const { region } = usePokestore((state) => state);
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const getPokemonList = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokedex/${region}`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => response.json())
                .catch(error => {
                    console.error('Error:', error);
                });
            setPokemonList(response.pokemon_entries)
        };
    
        getPokemonList();
    }, [region])

    return (
        <Fragment>
            <Modal
                className={classes.modal}
                onClose={() => props.setOpen(false)}
                open={props.open}
                closeAfterTransition
            >
                <Fade
                    in={props.open}
                >
                    <Paper
                        className={classes.paperModal}
                    >
                        <Grid
                            justify="center"
                            spacing={1}
                            container
                        >
                            <Grid
                                xs={12}
                                item
                            >
                                <Typography
                                    variant="h4"
                                >
                                    <b>
                                        Pick a Pokemon
                                    </b>
                                </Typography>
                            </Grid>
                            {pokemonList && pokemonList.map((entry, i) => {
                                const speciesNumber = entry.pokemon_species.url.split('/').slice(-2)[0];
                                return (
                                    <Grid
                                        key={i}
                                        item
                                    >
                                        <Button
                                            onClick={() => { props.selectPokemon(speciesNumber, entry.pokemon_species.name) }}
                                            variant="outlined"
                                        >
                                            <div
                                                className={classes.pokemonSelect}
                                            >
                                                <img
                                                    src={`${props.pokeSpriteUrl}${speciesNumber}.png`}
                                                />
                                                <Typography
                                                    variant="caption"
                                                >
                                                    {entry.pokemon_species.name}
                                                </Typography>
                                            </div>
                                        </Button>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Paper >
                </Fade >
            </Modal >
        </Fragment>
    )
}

SelectModal.propTypes = {
    open: PropTypes.bool.isRequired,
    pokeSpriteUrl: PropTypes.string.isRequired,
    selectPokemon: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default SelectModal;