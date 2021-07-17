import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    FormControl,
    Select,
    MenuItem,
    Typography,
    InputLabel,
    Button,
    Modal,
    Fade,
    Paper,
    CardActionArea,
} from '@material-ui/core';

import SelectModal from '@/components/selectModal';

import usePokestore from '@/store/pokestore';

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
        overflowY: 'scroll'
    },
    pokemonSelect: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    pokemonImage: {
        width: '100%',
        height: 'auto'
    },
    cardStyle: {
        padding: '2rem',
        textAlign: 'center'
    }
}));

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const initialState = { 
    abilities: [],
    types: [],
}

const Pokemon = () => {
    const classes = useStyles();

    const router = useRouter();
    const { pos } = router.query;
    const { team, region } = usePokestore((state) => state);
    const [open, setOpen] = useState(false);
    const [pokemon, setPokemon] = useState("Click to Select Pokemon");
    const [pokemonID, setPokemonID] = useState(0);
    const [pokemonData, setPokemonData] = useState(initialState);
    const [pokemonImage, setPokemonImage] = useState("/graphics/defaultPokemon.png");
    const [ability, setAbility] = useState("");

    const selectPokemon = (id, name) => {
        setPokemonID(id);
        setPokemonImage(`${pokeSpriteUrl}${id}.png`);
        //setPokemonImage(`https://img.pokemondb.net/artwork/large/${name}.jpg`)
        setPokemon(name.toUpperCase());
        setOpen(false);
    };

    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonID}`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            setPokemonData(response);
        };

        if (pokemonID != 0) {
            getPokemon();
        }
    }, [pokemonID])

    return (
        <Fragment>
            <SelectModal
                open={open}
                pokeSpriteUrl={pokeSpriteUrl}
                selectPokemon={selectPokemon}
                setOpen={setOpen}
            />
            <Grid
                spacing={3}
                container
            >
                <Grid
                    lg={4}
                    item
                >
                    <Card>
                        <CardActionArea
                            className={classes.cardStyle}
                            onClick={() => setOpen(true)}
                        >
                            <img
                                alt="pokemon"
                                className={classes.pokemonImage}
                                src={pokemonImage}
                            />
                            <Typography
                                variant="h6"
                            >
                                {pokemon}
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid
                    lg={8}
                    item
                >
                    <Card
                        className={classes.cardStyle}
                    >
                        <Grid
                            container
                        >
                            <Grid
                                item
                            >
                                <Typography>
                                    Type:
                                </Typography>
                                {pokemonData.types.map((obj)=>{
                                        return(
                                            // https://www.serebii.net/pokedex-bw/type/water.gif
                                            obj.type.name
                                        )
                                    })}
                            </Grid>
                            <Grid
                                xs={12}
                                item
                            >
                                <FormControl
                                    variant="outlined"
                                >
                                    <InputLabel>
                                        Abilities
                                    </InputLabel>
                                    <Select
                                        label="Abilities"
                                        onChange={(e)=>setAbility(e.target.value)}
                                        value={ability}
                                        autoWidth
                                    >
                                        <MenuItem
                                            value={""}
                                        >
                                            <em>None</em>
                                        </MenuItem>
                                        {pokemonData.abilities.map((item, i) => {
                                            return (
                                                <MenuItem
                                                    key={"select" + i}
                                                    value={item.ability.name}
                                                >
                                                    {item.ability.name.toUpperCase()}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid
                    xs={12}
                    container
                    item
                >
                    <Paper>
                        moves
                    </Paper>
                </Grid>
            </Grid>
        </Fragment >
    )
}

const PokemonPage = () => {
    return (
        <Fragment>
            <Pokemon />
        </Fragment>
    )
}

export default PokemonPage;