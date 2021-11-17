<template>
<div id="container"> <!-- LA PAGE EST CLEAN -->
    <div class="card">
        <h1 class="card_title">Mon espace</h1>
        <div class="profil_img">
            <img src="../Images/icon.png">
        </div>
        <div class="profil_name">Nom : {{user.username}}</div>
        <div class="profil_mail">Mail : {{user.email}}</div>
        <div class="profil_type" v-if="user.isAdmin == 1">Profile : Administrateur</div>
        <div class="profil_type" v-else>Profile : Utilisateur</div>
        <button @click="deleteAccount()" type="submit">Supprimer mon compte</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    data() {
        return {
            user: {
                username: '',
                email: '',
                isAdmin: ''
            }
        }
    },
    
    methods: {
//::::::::::::::::::::::::::::::::::::::::: Supprimer son compte :::::::::::::::::::::::::::::::::::::::::::::::::::::
        deleteAccount: function() {
            this.$store.dispatch('deleteAccount')
            .then(() => this.$router.push('/connexion'))
            .catch(err => console.log(err))
        }
    },
//::::::::::::::::::::::::::::::::::::::::: Recupération des infos du profile quand la page est chargé ::::::::::::::::
    mounted: function() {
        const token = {headers: {authorization: localStorage.token}};
        axios.get('http://localhost:3000/api/user/myprofile', token)
        .then(response => {
            let userInfos = response.data
            this.user.username = userInfos.username;
            this.user.email = userInfos.email;
            this.user.isAdmin = userInfos.isAdmin;
            console.log(userInfos);
        })
        .catch(error => {
            console.log(error);
        })
        
    }
}
</script>

<style lang="scss" scoped>
#container{ // div principale
    height: 820px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
h1 {
    padding: 0;
    margin: 0;
}
.card { // div de la box card
    height: 500px;
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 10px 10px 50px black;
    border-radius: 40px;
    background-color: whitesmoke;
    img { // logo du profil
        width: 60%;
        border: 1px solid silver;
        border-radius: 50%;
    }
    p { // adresse mail
        color: blue;
    }
    button{ // btn de suppression
        margin: 10px 0px;
        padding: 8px;
        background: #e25435;
        font-weight: bold;
        border: none;
        border-radius: 50px;
        color: white;
        cursor: pointer;
    }
    .profil_img { // bloc image
        height: 160px;
        width: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        //background-color: yellow;
    }
    .profil_name { // bloc name
        height: 30px;
        width: 80%;
        font-size: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .profil_mail { // bloc mail
        height: 30px;
        width: 80%;
        font-size: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .profil_type { // bloc type
        height: 30px;
        width: 80%;
        font-size: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        //background-color: skyblue;
    }
}
</style>