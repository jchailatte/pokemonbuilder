import create from 'zustand';
import { devtools, redux } from 'zustand/middleware'

const Pokestore = create(devtools((set) => {
    return {
        teamID: "",
        team: [
            {},
            {},
            {},
            {},
            {},
            {}
        ],
        region: 2,
        setPokemonTeam: (pos, pokemon) => {
            set(state => {
                let newArr = [...state.team];
                newArr[pos] = pokemon;
                return (
                    {team: newArr}
                )
            })
        },
        setRegion: (gen) => set({ region: gen }),
        setTeamID: (id) => set({teamID: id}),
        newTeam: (newTeam) => set({team : newTeam})
    }
}));

export default Pokestore