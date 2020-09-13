let allTexts = {
    "Menu" : {
        "account" : "Mon compte",
        "userItems" : {
            "main": "Ma réserve",
            "list": "Mes items",
            "createOne": "Créer un item",
            "createMulti": "Créer une collection"
        },
        "desiredItems": "Ma wishlist",
        "borrow": "Mes emprunts",
        "lent": {
            "main": "Prêts",
            "running": "Prêts en cours",
            "histo": "Historiques des prêts"
        },
        "admin": "Administration",
        "allItems": "Médiathèque",
        "searchItems": "Recherche avancée"
    }
};

export default {
    install: function(Vue) {
        Vue.prototype.$getTexts = function(text, component = false) {
            component = component === false ? this.$options._componentTag : component;
            return allTexts[component] === undefined ? "unknown component" : 
                (allTexts[component][text] === undefined ? "unknown text" : allTexts[component][text]);
        }
    }
}
