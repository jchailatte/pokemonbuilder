import create from 'zustand';

const Pokestore = create((set) => {
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
        // setPokemon: (pos, pokemon) => {
        //     state.team[pos] = pokemon
        // },
        setRegion: (gen) => set({region: gen}),
    }
});

export default Pokestore;