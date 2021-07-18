import { Fragment, useEffect } from 'react';
import Link from 'next/link';
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

    const selectRegion = (event) => {
        setRegion(event.target.value);
    }

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
                        style={{ width: '100%' }}
                        variant="contained"
                    >
                        Log In
                    </Button>
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
                                        pos={i}
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