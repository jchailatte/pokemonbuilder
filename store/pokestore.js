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
            console.log(pokemon);
        },
        setRegion: (gen) => set({ region: gen }),
    }
}));

// const initialState = {
//     team: [
//         {},
//         {},
//         {},
//         {},
//         {},
//         {}
//     ],
//     region: 2,
// };

// const types = {
//     changeRegion: "REGION",
//     addParty: "ADD",
// };

// const reducer = (state, { type, by }) => {
//     switch (type) {
//         case type.changeRegion:
//             return {...state, region: by }
//         case type.addParty:
//             return console.log(by);
//         default:
//             return
//     }
// }

// const usePokestore = create(
//     devtools(
//         redux(reducer, initialState)
//     )
// )

export default Pokestore