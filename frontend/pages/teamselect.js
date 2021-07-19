import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';

import usePokestore from '@/store/pokestore';

const useStyles = makeStyles(theme => ({
    cardStyle: {
        padding: theme.spacing(3),
    }
}));

const TeamSelect = () => {
    const classes = useStyles();

    const router = useRouter();
    const { newTeam, setTeamID } = usePokestore(state => state);

    const [session, loading] = useSession();
    const [teamJson, setTeamJson] = useState([]);

    const replaceTeam = (team, id) => {
        newTeam(team);
        setTeamID(id);
        router.push("/");
    }

    const deleteTeam = async (id) => {
        console.log(id);
        const response = await fetch(
            `http://localhost:3080/pokemon/deleteteam?id=${id}`,
            {
                method: 'DELETE',
                cache: 'default',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const getTeams = async () => {
            const response = await fetch(
                `http://localhost:3080/pokemon/getteams?email=${session.user.email}`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            ).then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            setTeamJson(response);
        };
        getTeams();
    })

    return (
        <Fragment>
            <Grid
                container
                spacing={2}
            >
                <Grid 
                    item 
                    xs={12}
                >
                    <Button 
                        style={{width: '100%'}}
                        variant="contained"
                        onClick={()=>router.push("/")}
                    > 
                        Home Page
                    </Button>
                </Grid>
                {teamJson.map((item, i) => {
                    return (
                        <Grid
                            key={"row" + i}
                            item
                            xs={12}
                        >
                            <Card
                                className={classes.cardStyle}
                            >
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        lg={2} md={4} sm={12}
                                        item
                                        style={{ height: '100%' }}
                                    >
                                        <Typography>
                                            ID: {item._id}
                                        </Typography>
                                        <Button
                                            onClick={() => deleteTeam(item._id)}
                                            variant="contained"
                                            style={{ width: '100%' }}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10} md={8} sm={12}
                                    >
                                        <CardActionArea
                                            onClick={() => replaceTeam(item.team, item._id)}
                                            style={{width: '100%'}}
                                        >
                                            <Grid 
                                                container
                                                spacing={3}
                                            >
                                                {item.team.map((pokemon, i) => {
                                                    return (
                                                        <Grid
                                                            md={2}
                                                            item
                                                            key={"team" + i}
                                                            style={{ textAlign: 'center' }}
                                                        >
                                                            {pokemon.id &&
                                                                <Fragment>
                                                                    <img
                                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                                                    />
                                                                    <Typography>
                                                                        {pokemon.pokemon}
                                                                    </Typography>
                                                                </Fragment>}
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </CardActionArea>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
}

const TeamSelectPage = () => {
    const [session, loading] = useSession();

    if (loading) return null;
    if (!loading && !session) {
        return (
            <p>
                Access Denied
            </p>
        )
    }

    return (
        <TeamSelect />
    )
}

export default TeamSelectPage;