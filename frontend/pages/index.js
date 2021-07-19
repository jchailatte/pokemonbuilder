import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button
} from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';

import InfoCard from '@/components/infoCard';

import usePokestore from '@/store/pokestore';

const useStyles = makeStyles(theme => ({
    regionSelect: {
        backgroundColor: 'white',
        width: '100%'
    },
    cardStyle: {
        display: 'flex',
        padding: theme.spacing(3),
        textAlign: 'center',
        minHeight: '25vh',
        height: '100%'
    }
}));

const regions = [
    "All",
    "Kanto(I)",
    "Johto(II)",
    "Hoenn(III)",
    "Sinnoh(IV)",
    "Unova(V)",
    "Kalos(VI)",
    "Alola(VII)",
    "Galar(VIII)"
]

const Index = () => {
    const classes = useStyles();

    const { region, team, setRegion } = usePokestore((state) => state);

    const [session, loading] = useSession();

    const selectRegion = (event) => {
        setRegion(event.target.value);
    }

    const saveTeam = async () => {
        const response = await fetch(
            `http://localhost:3080/pokemon/addteam`,
            {
                method: 'POST',
                cache: 'default',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: session.user.email,
                    team: team
                })
            }
        ).then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log(response);
        //set ID here
    };


return (
    <Fragment>
        <Grid
            spacing={3}
            container
        >
            <Grid
                item
                md={6}
            >
                <Button
                    onClick={()=>saveTeam()}
                    style={{ width: '100%' }}
                    variant="contained"
                >
                    Save Team
                </Button>
            </Grid>
            <Grid
                item
                md={6}
            >
                <Button
                    onClick={!session ? signIn : signOut}
                    style={{ width: '100%' }}
                    variant="contained"
                >
                    {!session ? "Log In" : "Log Out"}
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Link href="/teamselect">
                    <Button
                        style={{ width: '100%' }}
                        variant="contained"
                    >
                        Select Team
                    </Button>
                </Link>
            </Grid>
            <Grid
                xs={12}
                item
            >
                <FormControl
                    variant="filled"
                    style={{ width: '100%' }}
                >
                    <InputLabel>
                        Region
                    </InputLabel>
                    <Select
                        className={classes.regionSelect}
                        label="Region"
                        onChange={selectRegion}
                        value={region}

                    >
                        <MenuItem
                            value={0}
                        >
                            <em>None</em>
                        </MenuItem>
                        {regions.map((item, i) => {
                            return (
                                <MenuItem
                                    key={"select" + i}
                                    value={i + 1}
                                >
                                    {item}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            {team && team.map((pokemon, i) => {
                return (
                    <Grid
                        key={i}
                        xs={6}
                        item
                    >
                        {Object.keys(pokemon).length === 0 ?
                            (
                                <Card
                                    style={{ height: '100%' }}
                                >
                                    <Link
                                        href={{
                                            pathname: `/pokemon`,
                                            query: { pos: i }
                                        }}
                                    >
                                        <CardActionArea
                                            className={classes.cardStyle}
                                        >
                                            <ControlPoint />
                                        </CardActionArea>
                                    </Link>
                                </Card>
                            ) : (
                                <InfoCard
                                    pokemon={team[i]}
                                />
                            )
                        }
                    </Grid>
                )
            })
            }
        </Grid>
    </Fragment >
)
}

export default Index;