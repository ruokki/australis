<template>
    <q-page>
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>{{ getTitle }}</q-toolbar-title>
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
                                <q-icon name="weekend" size="sm">
                                    <q-tooltip
                                        :transition-show="tooltipTransition"
                                        :transition-hide="tooltipTransition"
                                        :content-class="tooltipClass"
                                        anchor="center left" self="center right"
                                    >
                                        Item prêté
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
        }
    },
    methods: {

    },
    data() {
        return {
            // Id du borrow pour la modal ouverte
            borrowId: 0,

            titles: {
                borrower: "Mes emprunts",
                lender: "Mes demandes de prêt",
                oldLent: "Historique des prêts",
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