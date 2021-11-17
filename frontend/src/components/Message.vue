<template>
  <div id="wrapper"> <!-- LA PAGE EST CLEAN -->
            <form>
                <h2>Poster quelque chose {{ user.username }} ?</h2>
                <label for="title">Titre :</label>
                <input v-model="title" id="title" type="text" name="title">
                <label for="content">Exprimez vous :</label>
                <input v-model="content" id="content" type="text" name="content">
                <label for="attachment">Ajouter une image</label>
                <input id="attachment" type="file" ref="file" name="attachment" accept="image/*" @change="processFile()">
                <button @click.prevent="postMessage()" type="submit">Poster</button>
            </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Message',
    data() {
        return {
            title: '',
            content: '',
            attachment: '',
            user: {
                username: '',
                email: '',
                isAdmin: '',
                id: ''
            },
            messages: []
        }
    },

    methods: {
//::::::::::::::::::::::::::::::::::::::::: Conversion de file en attachment ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        processFile() {
            const file = this.$refs.file.files[0];
            this.attachment = file;
        },
        
//::::::::::::::::::::::::::::::::::::::::: Poster un message ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        postMessage: function() {
            var formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.content);
            formData.append("attachment", this.attachment);
            console.log(this.title);
            console.log(this.content);
            console.log(this.attachment);
            console.log(this.user.id);
            const token = {headers: {authorization: localStorage.token}};
            axios.post('http://localhost:3000/api/message/add', formData, token)
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
//::::::::::::::::::::::::::::::::::::::::: Recupération des infos du profile quand la page est chargé :::::::::::::::::::::::::::::::::::::::::::::::::::
    mounted: function() {
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
  
}
</script>

<style scoped lang="scss">
#wrapper{ // div princiaple
    height: 100vh;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
h2 { // titre de la page
    font-size: 26px;
}

form { // formulaire de publication
    height: fit-content;
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 10px 10px 30px black;
    border-radius: 2rem;
    background-color: whitesmoke;
    input { // les inputs du formulaire
        border-radius: 2rem;
        margin-bottom: 10px;
        padding: 5px;
        font-size: 16px;
        border: none;
        outline: none;
    }
    label { // les labels du formulaire
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }
    #content { // description de la publication
        width: 90%;
        height: 5rem;
        resize: none;
    }
    button { // le bouton de publication
        height: 34px;
        width: 24%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 50px;
        background-color: #e25435;
        color: white;
        &:hover{ // survolment du btn
            cursor: pointer;
        }
    }
}
/* responsive */
@media screen and (max-width: 800px) {
    form {
        width: 80%;
    }
        
    }

</style>