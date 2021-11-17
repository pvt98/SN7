<template>
  <div class="card">
        <div v-for="message in messages" :key="message.id" id="fil">
            <h2 id="titre">{{ message.title }}</h2>
            <img :src=" message.attachment " id="image">
            <span id="description">{{ message.content}} </span>
            <div class="item_bottom">
                <p id="date_post">{{ user.username }} le {{ formatDate(message.createdAt) }}</p>
                <i  class="fas fa-trash" id="icon_a"></i>
            </div>
        </div>
        <div class="command-cont-all">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <div class="date_comment"> {{ formatDate(comment.createdAt) }} </div>
                <div class="name_comment">{{ comment.User.username }}</div>
                <div class="content_comment">{{ comment.content }}</div>
                <i v-if="user.isAdmin == 1 || user.id == comment.userId" @click="deleteComment(comment.id)" class="fas fa-trash" id="icon"></i>
            </div>
            <div class="form-comment">
                <label for="content">Commenter la publication :</label>
                <input v-model="content" id="content" type="text" name="content">
                <button @click.prevent="postComm()" type="submit">Poster</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Comment',
    props: ['id'],
    data() {
        return {
            content: '',
            messages: [],
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: '',
            },
            comments: {
                id: '',
                content: '',
                userId: '',
                messageId: '',
                User: [],
            }
        }
    },

    methods: {
//::::::::::::::::::::::::::::::::::::::::: Récupération de un message :::::::::::::::::::::::::::::::::::::::::::::::::::
       getOneMessage: function(){
            const token = {headers: {authorization: localStorage.token}};
            console.log(this.$route.params.id);
            axios.get('http://localhost:3000/api/message/'+ this.$route.params.id, token)
            .then((response) => {
                this.messages = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
//::::::::::::::::::::::::::::::::::::::::: Poster un message :::::::::::::::::::::::::::::::::::::::::::::::::::
        postComm: function() {
            console.log(this.user.id);
            console.log(this.content);
            console.log(this.$route.params.id);
            var newCom = {
                content: this.content,
                messageId: this.$route.params.id,
                userId: this.user.id
            };
            const token = {headers: {authorization: localStorage.token}};
            axios.post('http://localhost:3000/api/message/new/' + this.$route.params.id, newCom, token)
            .then (( response) => {
                console.log(response.data);
                location.reload();
            })
            .catch(error => {
                console.log(error);
                location.reload();
            })
        },

//:::::::::::::::::::::::::::::::::::::::: Récupération des commentaires ::::::::::::::::::::::::::::::::::::
        getComments: function(){
            const token = {headers: {authorization: localStorage.token}};
            axios.get('http://localhost:3000/api/message/comments/' + this.$route.params.id , token)
            .then((response) => {
                this.comments = response.data.comments;
                console.log(response.data.comments);
            })
            .catch(error => {
                console.log(error);
            })
        },
        
//:::::::::::::::::::::::::::::::::::::::: Récupération des infos du user ::::::::::::::::::::::::::::::::::::

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

//:::::::::::::::::::::::::::::::::::::::: Supprimer un message ::::::::::::::::::::::::::::::::::::
        deleteComment: function(comId){
            const token = {headers: {authorization: localStorage.token}};
            const idMessage = this.comments.id;
            console.log(idMessage);
            axios.delete(`http://localhost:3000/api/message/${this.$route.params.id}/comment/${comId}` , token)
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.log(error);
            })
        },
//:::::::::::::::::::::::::::::::::::::::: Récupération de la date du post ::::::::::::::::::::::::::::::::::::
        formatDate(dateString) {
            let convertedDate = new Date(dateString);
            return convertedDate.toLocaleDateString();
        },
    },
//:::::::::::::::::::::::::::::::::::::::: Charger certaine fonction au chargement du dom ::::::::::::::::::::::::::::::::::::
    mounted() {
        this.getInfosUser();
        this.getOneMessage();
        this.getComments();
    },
}
</script>

<style scoped lang="scss">
#icon {
    color: red;
    cursor: pointer;
    height: 80%;
    width: 10%;
    border-left: 1px solid silver;
    display: flex;
    justify-content: center;
    align-items: center;
}
.comment_fil { //
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
    .comment { //
        height: fit-content;
        width: 100%;
        margin-top: 10px;
        padding: 10px;
    }
    .user_comment { //
        height: fit-content;
        width: 100%;
        padding: 10px;
    }
    .user_message { //
        height: fit-content;
        width: 100%;
        padding: 10px;
    }
}
.card { //
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
    #fil { //
        height: fit-content;
        width: 80%;
        margin-top: 20px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 2rem;
        cursor: pointer;
        #image { //
            height: 400px;
            width: 80%;
            border-radius: 30px;  
            object-fit: cover;
        }
        h2 { //
            font-size: 30px;
            color: #e25435;
        }
        #description { //
            width: 80%;
            margin-top: 20px;
            font-size: 20px;
            color: blue;
        }
    }
.comment { //
    height: 50px;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px;
}
.form-comment { //
    height: 60px;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px;
    input { //
        height: 30px;
        width: 300px;
        border: 1px solid silver;
        border-radius: 20px;
    }
    button { //
        height: 40px;
        width: 100px;
        border-radius: 20px;
        border: none;
        background-color: green;
        color: white;
        cursor: pointer;

    }
}
.command-cont-all { //
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
}
.date_comment { //
    height: 80%;
    width: 16%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-right: 1px solid silver;
}
.name_comment { //
    height: 80%;
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-right: 1px solid silver;
}
.content_comment { //
    height: 80%;
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.trash_comment {
    height: 80%;
    width: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-left: 1px solid silver;
    color: red;
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