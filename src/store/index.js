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
                category_name: "Audio",
                category_icon: "music_note",
                category_id: 1,
                children: [
                    {
                        category_name: "Album",
                        category_id: 11
                    },
                    {
                        category_name: "Audiobook",
                        category_id: 12
                    },
                    {
                        category_name: "Saga",
                        category_id: 13
                    },
                ]
            },
            {
                category_name: "Vidéo",
                category_icon: "movie",
                category_id: 2,
                children: [
                    {
                        category_name: "Série",
                        category_id: 21
                    },
                    {
                        category_name: "Anime",
                        category_id: 22
                    },
                    {
                        category_name: "Film",
                        category_id: 23
                    },
                ]
            },
            {
                category_name: "Livres",
                category_icon: "menu_book",
                category_id: 3,
                children: [
                    {
                        category_name: "Livre",
                        category_id: 31
                    },
                    {
                        category_name: "Comic",
                        category_id: 32
                    },
                    {
                        category_name: "Manga",
                        category_id: 33
                    },
                    {
                        category_name: "BD",
                        category_id: 34
                    },
                ]
            },
            {
                category_name: "Jeux",
                category_icon: "gamepad",
                category_id: 4,
                children: [
                    {
                        category_name: "Jeux vidéo",
                        category_id: 41
                    },
                    {
                        category_name: "Jeux de plateau",
                        category_id: 42
                    },
                    {
                        category_name: "Jeux de rôle",
                        category_id: 43
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
                if(one.category_id == id) {
                    return one;
                }
            }
        },
        getSubCategory: (state, getters) => (main, sub) => {
            let parent = getters.getCategory(main);
            let child;
            for(var i in parent.children) {
                child = parent.children[i];
                if(child.category_id == sub) {
                    return child;
                }
            }
        },
        tooltipTransition: (state) => state.tooltip.transition,
        tooltipClass: (state) => state.tooltip.class,
        getBorrowSate: (state) => (type) => state.borrowSate[type],
    },
    mutations: {},
    actions: {},
    modules: {}
});