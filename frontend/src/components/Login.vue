<template>
<div id="container">
    <div class="card">
        <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="card__title" v-else>Inscription</h1>
        <div class="form-line">
            <input v-model="email" class="form-input" type="text" placeholder="Adresse mail"/>
        </div>
        <div class="form-line" v-if="mode == 'create'">
            <input v-model="username" class="form-input" type="text" placeholder="Nom d'utilisateur"/>
        </div>
        <div class="form-line">
            <input v-model="password" class="form-input" type="password" placeholder="Mot de passe"/>
        </div>
        <div class="form-line">
            <button @click="login()" class="button" v-if="mode == 'login'">
                <span>Connexion</span>
            </button>
            <button @click="register()" class="button" v-else>
                <span>Créer mon compte</span>
            </button>
        </div>
        <p v-if="mode == 'login'"><span class="card-click" @click="switchToCreateAccount()">Créer un compte</span></p>
        <p v-else><span class="card-click" @click="switchToLogin()">Se connecter</span></p>
  </div>
</div>
</template>

<script>

export default {
    name:'Login',
    data() {
        return {
            mode: 'login',
            email: '',
            username: '',
            password: '',
            error: null,
            success: false
        }
    },
    
    methods: {
//::::::::::::::::::::::::::::::::::::::::: Function go to creer un compte :::::::::::::::::::::::::::::::::::::::::::::::::::
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
//::::::::::::::::::::::::::::::::::::::::: Function go to se connecter :::::::::::::::::::::::::::::::::::::::::::::::::::
        switchToLogin: function () {
            this.mode = 'login';
        },
//::::::::::::::::::::::::::::::::::::::::: connexion :::::::::::::::::::::::::::::::::::::::::::::::::::
        login: function () {
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', {email, password})
            .then(() => this.$router.push('/homepage'))
            .catch(err => console.log(err))
        },
//::::::::::::::::::::::::::::::::::::::::: inscription :::::::::::::::::::::::::::::::::::::::::::::::::::
        register: function () {
            let data = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('register', data)
            .then(() => location.reload())
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
#container { 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
    width: auto;
}
.card { 
    width: 320px;
    height: 430px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 40px;
    background-color: #f7c665;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-click{
    font-size: 20px;
    font-weight: 800;
    color: black;
    cursor: pointer;
}

.card-click:hover {
    color: green;
}

.button {
  height: 40px;
  width: 160px;
  border-radius:30px;
  border: none;
  background-color: #e25435;
  color: white;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #e7765d;
}

.form-input {
  height: 44px;
  width: 220px;
  border-radius:30px;
  border: none;
  outline: none;
  background-color: white;
  text-align: center;
  font-size: 16px;
}

</style>>