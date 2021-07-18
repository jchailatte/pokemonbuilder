import create from 'zustand';
import { devtools, redux } from 'zustand/middleware'

const Pokestore = create(devtools((set) => {
    return {
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
            set(state=> ({team: [...state.team.slice(0, pos), pokemon, ...state.team.slice(pos+1)]}))
        },
        setRegion: (gen) => set({ region: gen }),
    }
}));

export default Pokestore