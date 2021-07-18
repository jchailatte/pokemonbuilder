import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    Typography,
    Paper,
    CardActionArea,
    Button
} from '@material-ui/core';

import Dropdown from '@/components/dropDown';
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
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '30%'
        },
    },
    cardStyle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%',
    },
    bars: {
        display: 'block',
        height: '100%',
        backgroundColor: 'green',
        textIndent: '10px',
        overflow: 'hidden',
        color: 'white',
        borderRadius: '5px',
        textAlign: 'left'
    }
}));

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const initialState = {
    abilities: [],
    types: [],
    stats: [{
        "base_stat": 0,
        "stat": {
            "name": "hp",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "attack",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "defense",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "special-attack",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "special-defense",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "speed",
        }
    },],
}

const Pokemon = () => {
    const classes = useStyles();

    const router = useRouter();
    const { pos } = router.query;
    const { team, region, setPokemonTeam } = usePokestore((state) => state);
    const [open, setOpen] = useState(false);
    const [pokemon, setPokemon] = useState("Click to Select Pokemon");
    const [pokemonID, setPokemonID] = useState(0);
    const [pokemonData, setPokemonData] = useState(initialState);
    const [itemData, setItemData] = useState([]);
    const [natureData, setNatureData] = useState([]);
    const [pokemonImage, setPokemonImage] = useState("/graphics/defaultPokemon.png");
    const [ability, setAbility] = useState("");
    const [heldItem, setHeldItem] = useState("");
    const [nature, setNature] = useState("");
    const [moves, setMoves] = useState(["", "", "", ""])
    //add EV's at some point

    const selectPokemon = (id, name) => {
        setPokemonID(id);
        setPokemonImage(`${pokeSpriteUrl}${id}.png`);
        setPokemon(name.toUpperCase());
        setOpen(false);
    };

    const savePokemon = () => {
        if (pokemonID != 0) {
            setPokemonTeam(pos, {
                "pokemon": pokemon,
                "type": pokemonData.types,
                "ability": ability,
                "item": heldItem,
                "nature": nature,
                "moves": moves,
                "id": pokemonID,
            })
        }
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
        const getItems = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/item-attribute/5`,
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
            setItemData(response.items);
        };
        const getNatures = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/nature/?limit=25`,
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
            setNatureData(response.results);
        };

        if (pokemonID != 0) {
            getItems();
            getNatures();
            getPokemon();
        }
    }, [pokemonID]);

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
                    xs={12}
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
                                {pokemonData.types.map((item, i) => {
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
                                <Dropdown
                                    label="Abilities"
                                    onChange={setAbility}
                                    value={ability}
                                    list={pokemonData.abilities}
                                    concat="ability"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Base Stats:
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={10}
                                style={{
                                    alignItems: "flex-start"
                                }}
                            >
                                {pokemonData.stats.map((item, i) => {
                                    const length = item.base_stat / 200;
                                    return (
                                        <Fragment
                                            key={"stat" + i}
                                        >
                                            <Grid
                                                item
                                                xs={12} sm={2}
                                                style={{ textAlign: 'left' }}
                                            >
                                                <Typography>
                                                    {item.stat.name.toUpperCase()}:
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12} sm={10}
                                            >
                                                <span
                                                    style={{ width: `${item.base_stat > 180 ? 100 : item.base_stat / 1.8}%` }}
                                                    className={classes.bars}
                                                >
                                                    {item.base_stat}
                                                </span>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
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
                                <Dropdown
                                    label="Items"
                                    onChange={setHeldItem}
                                    value={heldItem}
                                    list={itemData}
                                />
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
                                <Dropdown
                                    label="Natures"
                                    onChange={setNature}
                                    value={nature}
                                    list={natureData}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid
                    xs={12}
                    item
                >
                    <Paper
                        className={classes.cardStyle}
                    >
                        <Grid
                            container
                            alignItems="center"
                            spacing={2}
                        >
                            {moves.map((_, i) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        key={"moves" + i}
                                    >
                                        <Dropdown
                                            label="Moves"
                                            onChange={(e) => setMoves([
                                                ...moves.slice(0, i),
                                                e,
                                                ...moves.slice(i + 1)
                                            ])}
                                            value={moves[i]}
                                            list={pokemonData.moves || []}
                                            concat="move"
                                        />
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                    </Paper>

                </Grid>
                <Grid
                    item
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >

                        <Button
                            onClick={savePokemon}
                            style={{ width: '100%' }}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                    >
                        <Button
                            onClick={() => router.push("/")}
                            style={{ width: '100%' }}
                            variant="contained"
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment >
    )
}

export default Pokemon;