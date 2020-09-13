let allTexts = {
    "All": {
        "category": "Catégorie",
        "subCategory": "Sous-catégorie"
    },
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
    },
    "Item": {
        "similar": "Items similaires"
    },
    "ItemAction": {
        "borrow": "Emprunter l'item",
        "dialogPossessor": {
            "title": "Choix du possesseur",
            "question": "À qui souhaitez vous emprunter"
        },
        "editItem": "Modifier l'item",
        "lentAllow": "Prêts autorisés",
        "lentForbidden": "Prêts interdits",
        "addItemToUser": "Ajouter à ma réserve",
        "removeItemToUser": "Retirer de ma réserve",
        "notify": {
            "borrowable": "L'item peut à nouveau être emprunté",
            "noBorrowable": "L'item ne peux plus être emprunté",
            "borrowAsked": "Demande enregistrée",
            "noUserSelected": "Veuillez choisir au moins un utilisateur",
            "itemPossessed": "Item ajouté à votre réserve",
            "itemNotPossessed": "Item retiré de votre réserve"
        }
    },
    "Borrow": {
        "delete": "Supprimer ma demande",
        "moreTime": "Demander une rallonge",
        "accept": "Accepter la demande",
        "deny": "Refuser la demande",
        "start": "Démarrer le prêt",
        "end": "Terminer le prêt",
        "seeMoreTime": "Voir la rallonge"
    },
    "Create": {
        "oneShot": "L'item doit être un one-shot.",
        "listPossessed": "Liste des tomes possédés",
        "nbItems": "Nombre de tome",
        "hintNbItems": "Pour gérer les tomes possédés, cliquer sur l'icône",
    },
    "Home": {
        "chart": "Mon joli chart",
        "allItems": "Ma médiathèque",
        "waitingBorrow": "Demandes en attente",
        "runningLent": "Emprunts en cours"
    }
};

export default {
    install: function(Vue) {
        Vue.prototype.$getTexts = function(text, component = false) {
            component = component === false ? this.$options._componentTag : component;
            if(allTexts[component] === undefined) {
                console.error(component);
                return "unknown component";
            }
            else if(allTexts[component][text] === undefined) {
                console.error(component, text);
                return "unknown text";
            }
            return  allTexts[component][text];
        }
    }
}
