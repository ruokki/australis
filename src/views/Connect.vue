<template>
     <q-dialog 
        v-model="notConnected" 
        persistent 
        transition-show="scale" 
        transition-hide="scale"
    >
        <q-card v-if="step == 'signin'" style="width: 700px; max-width: 80vw;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Connexion</q-toolbar-title>
            </q-toolbar>
            <q-card-section>
                <q-input v-model="user" label="Utilisateur" />
                    <q-input 
                        v-model="pwd" 
                        label="Mot de passe" 
                        :type="isPwdConnect ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwdConnect ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwdConnect = !isPwdConnect"
                            />
                        </template>
                </q-input>
            </q-card-section>

            <q-card-actions class="bg-grey-4 justify-between text-primary">
                <q-btn flat label="Créer un compte" @click="step = 'signup'" />
                <q-btn flat label="Connexion" @click="connectMe" />
            </q-card-actions>
        </q-card>
        <q-card v-if="step == 'signup'" style="width: 700px; max-width: 80vw;">
            <q-toolbar class="bg-primary text-white">
                <q-toolbar-title>Créer un compte</q-toolbar-title>
            </q-toolbar>
            <q-card-section>
                <q-input v-model="newUser.name" label="Nom d'utilisateur" />
                    <q-input 
                        v-model="newUser.pwd" 
                        label="Mot de passe" 
                        :type="isPwd ? 'password' : 'text'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                        </template>
                </q-input>
                <q-input v-model="newUser.lastname" label="Nom" />
                <q-input v-model="newUser.firstname" label="Prénom" />
                <q-input v-model="newUser.email" label="Email" />
            </q-card-section>

            <q-card-actions class="bg-grey-4 justify-between text-primary">
                <q-btn flat label="Retour"  @click="step = 'signin'" />
                <q-btn flat label="Créer" @click="create" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: "Connect",
    data() {
        return {
            notConnected: true,
            isPwd: true,
            isPwdConnect: true,
            user: "",
            pwd: "",
            newUser: {
                name: "",
                firstname: "",
                lastname: "",
                pwd: "",
                email: ""
            },
            step: "signin"
        }
    },
    methods: {
        create() {

        },
        connectMe() {
            
        }
    },
    watch: {
        'step': function() {
            this.isPwd = true;
            this.isPwdConnect = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
</style>