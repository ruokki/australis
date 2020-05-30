import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tooltip: {
            transition: "scale",
            class: "bg-primary text-body1"
        },
        categories: [
            {
                name: "Audio",
                icon: "music_note",
                id: 1,
                children: [
                    {
                        name: "Album",
                        id: 11
                    },
                    {
                        name: "Audiobook",
                        id: 12
                    },
                    {
                        name: "Saga",
                        id: 13
                    },
                ]
            },
            {
                name: "Vidéo",
                icon: "movie",
                id: 2,
                children: [
                    {
                        name: "Série",
                        id: 21
                    },
                    {
                        name: "Anime",
                        id: 22
                    },
                    {
                        name: "Film",
                        id: 23
                    },
                ]
            },
            {
                name: "Livres",
                icon: "menu_book",
                id: 3,
                children: [
                    {
                        name: "Livre",
                        id: 31
                    },
                    {
                        name: "Comic",
                        id: 32
                    },
                    {
                        name: "Manga",
                        id: 33
                    },
                    {
                        name: "BD",
                        id: 34
                    },
                ]
            },
            {
                name: "Jeux",
                icon: "gamepad",
                id: 4,
                children: [
                    {
                        name: "Jeux vidéo",
                        id: 41
                    },
                    {
                        name: "Jeux de plateau",
                        id: 42
                    },
                    {
                        name: "Jeux de rôle",
                        id: 43
                    },
                ]
            }
        ],
        borrowSate: {
            lender: {
                'WA': 'En attente de réponse',
                'TB': 'À prêter',
                'BO': 'Item prété',
                'AR': 'Rallonge demandée',
                'GB': 'Item récupéré',
                'DE': 'Demande refusée'
            },
            borrower: {
                'WA': 'En attente de réponse',
                'TB': 'Demande acceptée',
                'BO': 'Emprunt en cours',
                'AR': 'Rallonge demandée',
                'GB': 'Item rendu',
                'DE': 'Demande refusée'
            }
        }
    },
    getters: {
        getAllCategories:(state) => state.categories,
        getCategory:(state) => (id) => {
            let one;
            for(var i in state.categories) {
                one = state.categories[i];
                if(one.id == id) {
                    return one;
                }
            }
        },
        tooltipTransition: (state) => state.tooltip.transition,
        tooltipClass: (state) => state.tooltip.class,
        getBorrowSate: (state) => (type) => state.borrowSate[type]
    },
    mutations: {},
    actions: {},
    modules: {}
});