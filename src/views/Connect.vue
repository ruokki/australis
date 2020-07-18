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
                <q-input v-model="newUser.user_name" ref="user" label="Nom d'utilisateur" :rules="[ nameValidation ]" lazy-rules />
                    <q-input 
                        v-model="newUser.user_pwd" 
                        label="Mot de passe" 
                        ref="pass"
                        :rules="[ nameValidation ]" 
                        lazy-rules
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
                <q-input v-model="newUser.user_lastname" lazy-rules ref="lastname" label="Nom" :rules="[ nameValidation ]"  />
                <q-input v-model="newUser.user_firstname" lazy-rules ref="firstname" label="Prénom" :rules="[ nameValidation ]" />
                <q-input v-model="newUser.user_email" lazy-rules ref="email" :rules="[ validateEmail ]" label="Email" />
            </q-card-section>

            <q-card-actions class="bg-grey-4 justify-between text-primary">
                <q-btn flat label="Retour" @click="step = 'signin'" />
                <q-btn flat label="Créer" @click="create" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Connect",
    data() {
        return {
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
    computed: {
        ...mapGetters([
            'getToken'
        ]),
        notConnected: function() {
            if(this.getToken === null) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    methods: {
        ...mapActions([
            'setToken',
            'setMe'
        ]),
        validateEmail(val) {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(val == '') {
                return 'Champ obligatoire';
            }
            else if(regex.test(val)) {
                return true;
            }
            else {
                return 'Format incorrect';
            }
        },
        nameValidation(val) {
            if(val.length > 100) {
                return 'Longueur maximale de 100 caractères';
            }
            else if(val == '') {
                return 'Champ obligatoire';
            }
            else {
                return true;
            }
        },
        create() {
            this.$refs.user.validate();
            this.$refs.pass.validate();
            this.$refs.lastname.validate();
            this.$refs.firstname.validate();
            this.$refs.email.validate();

            if (
                this.$refs.user.hasError || 
                this.$refs.pass.hasError || 
                this.$refs.lastname.hasError || 
                this.$refs.firstname.hasError || 
                this.$refs.email.hasError
            ) {
                this.$q.notify({
                    icon: "warning",
                    message: "Erreurs dans le formulaire",
                    color: "negative"
                });
            }
            else {
                let formData = new FormData();
                for(var i in this.newUser) {
                    formData.append(i, this.newUser[i]);
                }

                var thos = this;
                this.$api.url('user/create')
                    .success(function(data){
                        if(data.error === true) {
                            let keys = Object.keys(data.errors);
                            thos.$q.notify({
                                icon: "warning",
                                message: data.errors[keys[0]],
                                color: "negative"
                            });
                        }
                        else {
                            thos.$q.notify({
                                message: "Utilisateur créé",
                                color: "positive"
                            });
                            thos.step = 'signin';
                        }
                    })
                    .formData()
                    .send(formData);
            }
        },
        connectMe() {
            var thos = this;
            let send = {
                'user': this.user,
                'pwd': this.pwd
            };

            this.$api.url('user/connect')
                .success(data => {
                    if(data.error === true) {
                        let message = [];
                        for(var i in data.errors) {
                            if(Array.isArray(data.errors[i])) {
                                message = message.concat(data.errors[i]);
                            }
                            else {
                                message.push(data.errors[i]);
                            }
                        }
                        thos.$q.notify({
                            message: message.join(" "),
                            color: "negative"
                        });
                    }
                    else {
                        thos.setToken(data.token);
                        thos.setMe(data.me);
                    }
                })
                .send(send);
        }
    },
    watch: {
        'step': function() {
            this.isPwd = true;
            this.isPwdConnect = true;
            this.newUser = {
                user_name: "",
                user_firstname: "",
                user_lastname: "",
                user_pwd: "",
                user_email: ""
            };
            this.user = "";
            this.pwd = "";
        }
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
</style>