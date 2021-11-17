<template>
  <div class="card"> <!-- LA PAGE EST CLEAN -->
        <div id="btn_pbl">
            <router-link  to="/postmessage">Publier</router-link>
        </div>
        <div v-for="message in messages" :key="message.id" id="fil">
            <h2 id="titre"> {{ message.title }} </h2>
            <img :src=" message.attachment " id="image">
            <span id="description"> {{ message.content }} </span>
            <div class="item_bottom">
                <p id="date_post"> {{ message.User.username }} le {{ formatDate(message.createdAt) }} </p>
                <div id="icon_post">
                    <router-link :to="{ name: 'Comment' , params: {id: message.id }}" class=" comment_icon far fa-comment-dots"></router-link>
                    <i v-if="user.isAdmin == 1 || user.id == message.userId" @click="deleteMessage()" class="fas fa-trash" id="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
    data() {
        return {

            messages: [],
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: '',
            }
        }
    },

    methods: {
//::::::::::::::::::::::::::::::::::::::::: Recupération de tous les messages :::::::::::::::::::::::::::::::::::::::::::::::::::
        getAllMessages: function() {
            const token = {headers: {authorization: localStorage.token}};
            axios.get('http://localhost:3000/api/message/messages?page=1', token)
            .then(response => {
                this.messages = response.data.messages;
                console.log(response.data.messages);
            })
            .catch(error => {
                console.log(error);
            })
        },
//::::::::::::::::::::::::::::::::::::::::: Recupération des infos de l'utilisateur :::::::::::::::::::::::::::::::::::::::::::::::
        getInfosUser: function() {
            const token = {headers: {authorization: localStorage.token}};
            axios.get('http://localhost:3000/api/user/myprofile', token)
            .then(response => {
                let userInfos = response.data
                this.user.username = userInfos.username;
                this.user.email = userInfos.email;
                this.user.isAdmin = userInfos.isAdmin;
                this.user.id = userInfos.id;
                console.log(userInfos);
            })
            .catch(error => {
            console.log(error);
            })
        },
//::::::::::::::::::::::::::::::::::::::::: Supprimer un message ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        deleteMessage: function(){
            const token = {headers: {authorization: localStorage.token}};
            const idMessage = this.messages[0].id;
            axios.delete(`http://localhost:3000/api/message/${idMessage}`, token)
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.log(error);
            })
        },
//::::::::::::::::::::::::::::::::::::::::: Recupération de la date de post en string :::::::::::::::::::::::::::::::::::::::::::::::::
        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toLocaleDateString();
        },
    },
//::::::::::::::::::::::::::::::::::::::::: Exécuter certaine fonction au chargement de la page ::::::::::::::::::::::::::::::::::::::::
    mounted() {
        this.getAllMessages();
        this.getInfosUser();
    },
}
</script>

<style scoped lang="scss">
#btn_pbl { // btn publication
    height: 44px;
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    background: #e25435;
    transition: 0.8s;
    &:hover{ // btn au survol
        height: 50px;
        width: 44%;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
        cursor: pointer;
        transition: 0.8s;
    }
    a{ // lien dans btn
        text-decoration: none;
        color: whitesmoke;
    }
}
/* style du bouton */
.card { // div principale
    margin-top: 5%;
    margin-left: 20%;
    margin-right: 20%;
    padding: 1% 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 10px 50px black;
    border-radius: 2rem;
    background-color: whitesmoke;
    #fil { // id pour les posts
        height: fit-content;
        width: 80%;
        margin-top: 20px;
        margin-bottom: 30px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 2rem;
        transition: .2s;
        #titre { // titre du post
            font-size: 30px;
            color: #e25435;
        }
        #image { // image du post
            height: 400px;
            width: 80%;
            border-radius: 30px;  
            object-fit: cover;
        }
        #description { // description du post
            width: 80%;
            margin-top: 20px;
            font-size: 20px;
            color: black;
        }
        #icon { // icon trash
            font-size: 20px;
            color: red;
        }
        .item_bottom { // icônes date + commentaire + trash
            height: 50px;
            width: 100%;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //background-color: pink;
        }
        #date_post { // date de création du post
            height: 50px;
            width: 28%;
            font-size: 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: blue;
            //background-color: orange;
        }
        #icon_post { // icônes commentaire + trash
            height: 50px;
            width: 12%;
            display: flex;
            justify-content: center;
            align-items: center;
            //background-color: yellow;
        }
        .comment_icon { // icône commentaire
            font-size: 26px;
            margin-right: 10px;
            text-decoration: none;
            color: green;
        }
        #icon { // icône trash
            cursor: pointer;
        }
    }
}
/* responsive */
@media screen and (max-width: 800px) {
    .card {
        width: 100%;
        margin-left: 0;
        
    }
}
</style>
