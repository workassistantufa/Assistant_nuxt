<template>
  <div>
    <h1>Авторизация</h1>
    <div class="grid-container">
      <label>Логин</label>
      <input type="text" v-model="formData.Login" placeholder="Введите логин"  />
      <div></div>
      <label>Пароль</label>
      <input type="text" v-model="formData.Password" placeholder="Введите пароль"  />
     </div>    
     <button v-on:click="enterForm">Войти</button>
  </div>
</template>

<script>
export default {
    middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const UsertAuthID = localStorage.getItem('UsertAuthID');
    console.log('UsertAuthID=',UsertAuthID);
    //localStorage.removeItem('cats');
    //const isAuthenticated = store.state.authenticated
    //if (!isAuthenticated) {
    //  return redirect('/login')
    //}
    if(UsertAuthID) return redirect('/');
  },
  data() {
    return {
      formData: {} 
    };
  },
  methods: {
    async enterForm() {
      console.log("this.data.formData.=", this.$data.formData);
      const formData = {
        module: "session",
        data: {
          Login: this.$data.formData.Login,
          Password: this.$data.formData.Password,
        },
      };
      console.log("formData=", formData);
      const token = await this.$axios.$post('api',formData);
      console.log('token=', token.Token);
      if(token.Token)localStorage.setItem('UsertAuthID', token.Token);
    },
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 6fr;
  grid-row-gap: 10px;
}
.grid-item {
  box-sizing: border-box;
  text-align: center;
  font-size: 1.1em;
  padding: 1.5em;
  color: white;
}
</style>