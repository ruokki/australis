import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        me: null,
        tooltip: {
            transition: "scale",
            class: "bg-primary text-body1"
        },
        categories: [],
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
        // Récupère l'ensemble des catégories
        getAllCategories:(state) => state.categories,
        // Récupère une catégorie
        getCategory:(state) => (id) => {
            let one;
            for(var i in state.categories) {
                one = state.categories[i];
                if(one.category_id == id) {
                    return one;
                }
            }
        },
        // Récupère une sous catégorie
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
        // Récupère les catégories autorisées pour les collections
        getCollectionCategories: (state) => {
            let collectionCategories = [];
            let one;

            for(var i in state.categories) {
                one = state.categories[i];
                if(one.category_allow_collection == 1) {
                    collectionCategories.push(one);
                }
            }
            console.log(collectionCategories);
            return collectionCategories;
        },
        // Transition CSS pour les tooltips
        tooltipTransition: (state) => state.tooltip.transition,
        // Classes CSS pour les tooltips
        tooltipClass: (state) => state.tooltip.class,
        // Récupère la liste des états pour les emprunts
        getBorrowSate: (state) => (type) => state.borrowSate[type],
        // Récupération du token après connexion
        getToken: (state) => state.token,
        // Récupération de l'id user
        getMe: (state) => state.me
    },
    mutations: {
        SET_CAT(state, payload) {
            state.categories = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_ME(state, payload) {
            state.me = payload;
        }
    },
    actions: {
        setCategories({ commit }, categories) {
            commit('SET_CAT', categories);
        },
        setToken({ commit }, token) {
            commit('SET_TOKEN', token);
        },
        setMe({ commit }, token) {
            commit('SET_ME', token);
        },
    },
    modules: {}
});