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
    InputLabel
} from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';

import usePokestore from '@/store/pokestore';

const useStyles = makeStyles(theme => ({
    regionSelect: {
        backgroundColor: 'white',
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

    const team = usePokestore((state) => state.team);
    const { region, setRegion } = usePokestore((state) => state);

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
                    xs={12}
                    item
                >
                    <FormControl
                        variant="filled"
                    >
                        <InputLabel>
                            Region
                        </InputLabel>
                        <Select
                            className={classes.regionSelect}
                            label="Region"
                            onChange={selectRegion}
                            value={region}
                            autoWidth
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
                                    <Card>
                                        <Link
                                            href={{
                                                pathname: `/pokemon`,
                                                query: { pos: i }
                                            }}  
                                        >
                                        <CardActionArea>
                                            <ControlPoint />
                                        </CardActionArea>
                                        </Link>
                                    </Card>
                                ) : (
                                    <div> info </div>
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