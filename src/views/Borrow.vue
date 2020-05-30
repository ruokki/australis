<template>
    <q-page>
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>{{ getTitle }}</q-toolbar-title>
            <q-btn v-if="$route.params.type != 'oldLent'" flat :label="getHelp" icon-right="help" @click="modalInfo = true"></q-btn>
        </q-toolbar>
        <div class="q-pa-sm">
            <q-table 
                :columns="cols"
                :data="datas"
            >
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="item" :props="props">{{ props.row.item_name }}</q-td>
                        <q-td key="lender" :props="props">{{ props.row.user_name }}</q-td>
                        <q-td key="date_ask" :props="props">{{ props.colsMap.date_ask.format() }}</q-td>
                        <q-td key="state" :props="props">{{  props.colsMap.state.format(props.row.borrow_state) }}</q-td>
                        <q-td key="date_begin" class="text-left" :props="props">{{ props.colsMap.date_begin.format() }}</q-td>
                        <q-td key="date_end" :props="props">{{ props.colsMap.date_end.format() }}</q-td>
                        <q-td v-if="$route.params.type == 'borrower'" key="action" :props="props">
                            <q-icon 
                                v-if="props.row.borrow_state == 'WA' || props.row.borrow_state == 'TB'"
                                name="close" 
                                size="sm" 
                                class="cursor-pointer"
                                 @click="borrowId = props.row.borrow_id; deleteBorrow()"
                            >
                                <q-tooltip
                                    :transition-show="tooltipTransition"
                                    :transition-hide="tooltipTransition"
                                    :content-class="tooltipClass"
                                    anchor="center left" self="center right"
                                >
                                    Supprimer ma demande
                                </q-tooltip>
                            </q-icon>
                            <q-icon 
                                v-else-if="props.row.borrow_state == 'BO'"
                                name="autorenew" 
                                size="sm" 
                                class="cursor-pointer"
                            >
                                <q-tooltip
                                    :transition-show="tooltipTransition"
                                    :transition-hide="tooltipTransition"
                                    :content-class="tooltipClass"
                                    anchor="center left" self="center right"
                                >
                                    Demander une rallonge
                                </q-tooltip>
                            </q-icon>
                        </q-td>
                        <q-td v-else-if="$route.params.type == 'lender'" key="action" :props="props">
                            <div v-if="props.row.borrow_state == 'WA'">
                                <q-icon name="done" size="sm" class="cursor-pointer">
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Accepter la demande
                                    </q-tooltip>
                                </q-icon>
                                <q-icon name="close" size="sm" class="cursor-pointer">
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Refuser la demande
                                    </q-tooltip>
                                </q-icon>
                            </div>
                            <div v-else-if="props.row.borrow_state == 'TB'">
                                <q-icon name="local_shipping" size="sm" class="cursor-pointer">
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Confirmer prêt
                                    </q-tooltip>
                                </q-icon>
                            </div>
                            <div v-else-if="props.row.borrow_state == 'BO'">
                                <q-icon name="autorenew"  size="sm" class="cursor-pointer" >
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Modifier la date de fin
                                    </q-tooltip>
                                </q-icon>
                                <q-icon name="pan_tool"  size="sm" class="cursor-pointer" >
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Terminer le prêt
                                    </q-tooltip>
                                </q-icon>
                            </div>
                            <div v-else-if="props.row.borrow_state == 'AR'">
                                <q-icon name="visibility"  size="sm" class="cursor-pointer" >
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Voir la rallonge
                                    </q-tooltip>
                                </q-icon>
                            </div>
                        </q-td>
                        <q-td v-else key="action" :props="props"></q-td>
                    </q-tr>
                </template>
            </q-table>

             <q-dialog v-model="modalInfo" full-width>
                <q-card v-if="$route.params.type == 'lender'">
                    <q-card-section>
                        <div class="text-h6">Fonctionnement des prêts</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <p class="text-body1">Les prêts fonctionnent de la façon suivante :</p>
                        <ul class="text-body1">
                            <li>Un autre utilisateur effectue une demande concernant un de vos items.</li>
                            <li>Cette demande apparait dans votre liste avec le statut "{{ getBorrowSate(this.$route.params.type)["WA"] }}".</li>
                            <li>Vous choisissez si oui ou non, vous voulez prêter l'item.</li>
                            <li>
                                Si vous décidez de le prêter, l'item passe en état "{{ getBorrowSate(this.$route.params.type)["TB"] }}". A vous définir avec 
                                l'autre utilisateur où, quand et pour combien de temps vous allez lui transmettre l'item.
                            </li>
                            <li>
                                Une fois transmis, vous devez revenir sur cette interface et indiquer que c'est l'autre utilisateur qui l'a
                                en sa possession en cliquant sur l'icone <q-icon name="local_shipping" size="sm" />
                            </li>
                            <li>
                                Indiquer la durée du prêt. Une notification sera affiché pour l'emprunteur une semaine avant
                                la date de fin du prêt. Il est possible d'allonger la durée du prêt à l'aide de l'icone <q-icon name="autorenew" size="sm" />
                            </li>
                            <li>Il est possible de terminer le prêt avant la date limite.</li>
                            <li>
                                Une fois le prêt terminé et l'item rendu, cliquer sur l'icone <q-icon name="pan_tool" size="sm" /> pour terminer le prêt
                                et rendre l'item à nouveau disponible. <br />
                                NE TERMINER PAS UN PRÊT TANT QUE VOUS N'AVEZ PAS RÉCUPÉRÉ L'ITEM
                            </li>
                        </ul>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
                <q-card v-if="$route.params.type == 'borrower'">
                    <q-card-section>
                        <div class="text-h6">Fonctionnement des emprunts</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <p class="text-body1">Les emprunts fonctionnent de la façon suivante :</p>
                        <ul class="text-body1">
                            <li>Vous effectuez une demande de prêt</li>
                            <li>Le propriétaire reçoit une demande sur son compte. Il dispose de 2 options :</li>
                            <li>
                                Soit il accepte et votre demande passe en état "{{ getBorrowSate(this.$route.params.type)["TB"] }}"
                            </li>
                            <li>
                                Soit il refuse votre demande et indique un motif.
                            </li>
                            <li>
                                En cas d'acceptation, à vous de régler avec le propriétaire le moment et l'endroit où il vous transmettra l'item ainsi que la durée du prêt
                            </li>
                            <li>
                                Une fois transmis, le propriétaire passe la demande en état "{{ getBorrowSate(this.$route.params.type)["BO"] }}" et indique la durée convenu.<br />
                                Une notification s'affichera une semaine avant la fin du prêt sur le menu "Mes emprunts" indiquant le nombre d'item arrivant à échéance.
                            </li>
                            <li>
                                Il est possible de demander une rallonge (ou un raccourcissement) de la durée du prêt à l'aide de l'icone <q-icon name="autorenew" size="sm" />
                            </li>
                            <li>
                                Une fois l'item rendu, le priopriétaire passe la demande en état "{{ getBorrowSate(this.$route.params.type)["GB"] }}" et celle-ci disparait de votre interface.
                            </li>
                        </ul>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'tooltipTransition',
            'tooltipClass',
            'getBorrowSate'
        ]),
        getTitle: function() {
            return this.titles[this.$route.params.type];
        },
        getHelp: function() {
            return this.help[this.$route.params.type];
        },
    },
    methods: {

    },
    data() {
        return {
            modalInfo: false,

            // Id du borrow pour la modal ouverte
            borrowId: 0,

            titles: {
                borrower: "Mes emprunts",
                lender: "Mes demandes de prêt",
                oldLent: "Historique des prêts",
            },
            help: {
                borrower: "Fonctionnement des emprunts",
                lender: "Fonctionnement des prêts",
                oldLent: "",
            },
            cols:  [
                { name: "item", label: "Item", field: "item_name"  },
                { name: "lender", label: "Demandé à", field: "user_name"  },
                { name: "date_ask", label: "Date de la demande", field: "borrow_date_create", format: (val) => moment(val).format('DD/MM/YYYY') },
                { name: "state", label: "État de la demande", field: "borrow_state", format: (val) => this.getBorrowSate(this.$route.params.type)[val], align: "left" },
                { name: "date_begin", label: "Date de début", field: "borrow_date_start", format: (val) => moment(val).format('DD/MM/YYYY') },
                { name: "date_end", label: "Date de fin", field: "borrow_date_end", format: (val) => moment(val).format('DD/MM/YYYY') },
                { name: "action", label: "Actions", field: "borrow_id"},
            ],
            datas: [
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "WA",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "TB",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "BO",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "AR",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "GB",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "DE",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                },
                {
                    item_name: "Truc",
                    user_name: "Jean Mich",
                    borrow_date_create: new Date(),
                    borrow_state: "En attente de réponse",
                    borrow_date_start: new Date(),
                    borrow_date_end: new Date(),
                    borrow_id: 1
                }
            ]
        };
    }
}
</script>
<style lang="scss" scoped>

</style>