<template>
  <div id="app">
    <div id="nav">
            <router-link v-if="isLoggedIn" to="/homepage" class="nav-prt1">
            <img src="./Images/icon-left-font-monochrome-black.png" alt="logoGroupomania">
            </router-link> 
            <router-link v-if="isLoggedOut" to="/" class="nav-prt1">
            <img src="./Images/icon-left-font-monochrome-black.png" alt="logoGroupomania">
            </router-link>
            <div class="nav-part2"> 
                <router-link v-if="isLoggedIn" to="/myprofile" class="nav-prt2">
                <div>Profile</div>
                </router-link> 
                <span v-if="isLoggedIn" class="nav-prt3"> 
                <a id="logout" @click="logout()">Logout</a>
                </span>
            </div>
    </div>
    <router-view/>
  </div>
</template>


<script>
export default {
  computed: {
    isLoggedIn: function(){
      return this.$store.getters.isLoggedIn
    },
    isLoggedOut: function(){
      return this.$store.getters.isLoggedOut
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/')
      })
    },
    checkToken: function() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$router.push('/homepage')
      }
      else {
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.checkToken();
  }
}
</script>


<style lang="scss">
body {
  margin: 0px;
  padding: 0px;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-image: url('Images/login.jpg');
  height: auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
#nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f7c665;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    box-shadow: 10px 10px 50px black;
    .nav-prt1 {
        margin-left: 20px;
        height: 80%;
        width: 24%;
        display: flex;
        justify-content: space-around;
        align-items: center;
            &:hover {
                background-color: #fff080;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border-radius: 10px;
            }
    }
    img {
      width: 300px;
      height: 100px;
      object-fit: cover;
    }
    .nav-part2 {
        width: 20%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .nav-prt2 {
        width: 40%;
        height: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 24px;
            &:hover {
                background-color: #fff080;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border-radius: 10px;
            }
    }
    .nav-prt3 {
        width: 40%;
        height: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 24px;
        cursor: pointer;
            &:hover {
                background-color: #e25435;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border-radius: 10px;
            }
    }
    a {
      font-weight: 800;
      color: black;
      text-decoration: none;
      font-size: 20px;

      &.router-link-exact-active {
        color: black;
      }
    }
}
@media screen and (max-width: 800px) {
    #nav {
        width: 100%;
        height: 100px;
    }
    .nav-part2 {
        display: flex;
        flex-direction: column;
    }
    .nav-prt2 {
        padding-right: 10px;
        padding-left: 10px;
    }
    .nav-prt3 {
        padding-right: 10px;
        padding-left: 10px;
    }
}
@media screen and (max-width: 400px) {
    .nav-prt1 {
        padding-left: 20px;
        padding-right: 20px;
    }
    .nav-part2 {
        display: flex;
        flex-direction: column;
    }
    .nav-prt2 {
        padding-right: 24px;
        padding-left: 24px;
        margin-right: 10px;
    }
    .nav-prt3 {
        padding-right: 24px;
        padding-left: 24px;
        margin-right: 10px;
    }
}
</style>
