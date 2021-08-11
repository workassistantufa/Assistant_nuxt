<template>
  <div>
    <h1>Пользователи</h1>
    <div>
        <label>----------</label>
    </div>
    <nuxt-link to="/dictionary/User">
      <button>Выход</button>
    </nuxt-link>    
    <button v-on:click="saveFormData">Сохранить</button>
    <div>
      <label>----------</label>
    </div>
    <div class="grid-container">
      <label>Наименование</label>
      <input type="text" v-model="formData.Name" placeholder="Введите наименование"  />
      <label>Описание</label>
      <textarea v-model="formData.Description" ></textarea>
      <label>Логин</label>
      <input type="text" v-model="formData.Login" placeholder="Введите логин"  />
      <label>Пароль</label>
      <input type="text" v-model="formData.Password" placeholder="Введите пароль"  />
     </div>    
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    // retrieving keys via object destructuring
    const UsertAuthID = localStorage.getItem("UsertAuthID");
    console.log("UsertAuthID=", UsertAuthID);
    if (!UsertAuthID) return redirect("/auth");
  },
  data() {
    return {
      formData: {},
    };
  },
  async asyncData({ app, params }) {
    //console.log('params=',params);
    const config = {
      params: { module: "dictionary", form: "User", id: params.id },
    };
    const data = await app.$axios.$get("api", config);
    console.log("data=", data);
    const formData = {
      id: data._id._Value,
      Name: data._Name._Value,
      Description: data._Description._Value,
      Login: data._Login._Value,
      Password: data._Password._Value,
    };
    //console.log("formData=", formData);
    return { formData };
  },
  methods: {
    saveFormData() {
      console.log("this.data.formData.Name=", this.$data.formData);
      const formData = {
        module: "dictionary",
        form: "User",
        data: {
          id: this.$data.formData.id,
          Name: this.$data.formData.Name,
          Description: this.$data.formData.Description,
          Login: this.$data.formData.Login,
          Password: this.$data.formData.Password,
        },
      };
      console.log("formData=", formData);
      this.$axios.$post("api", formData);
    },
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 5fr;
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