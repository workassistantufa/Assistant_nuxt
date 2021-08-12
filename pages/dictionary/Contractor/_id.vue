<template>
  <div>
    <h1>Контрагент</h1>
    <div>
        <label>----------</label>
    </div>
    <nuxt-link to="/dictionary/Contractor">
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
      <label>Адрес</label>
      <input type="text" v-model="formData.Adress" placeholder="Введите адрес"  />
      <label>Телефон</label>
      <input type="text" v-model="formData.Telefon" placeholder="Введите телефон"  />
     </div>    
  </div>
</template>

<script>
export default {
  async middleware(app) {
    const UsertAuthID = localStorage.getItem("UsertAuthID");
    //console.log("UsertAuthID=", UsertAuthID);
    if (!UsertAuthID) return app.redirect("/auth");
    
    const config = {
      params: { module: "session", UsertAuthID },
    };
    const token = await app.$axios.$get("api", config);
    if (token.Error == "Token is expired") {
      localStorage.removeItem("UsertAuthID");
      return app.redirect("/auth");
    }
  },
  data() {
    return {
      formData: {},
    };
  },
  async asyncData({ app, params }) {
    //console.log('params=',params);
    const config = {
      params: { module: "dictionary", form: "Contractor", id: params.id },
    };
    const data = await app.$axios.$get("api", config);
    console.log("data=", data);
    const formData = {
      id: data._id._Value,
      Name: data._Name._Value,
      Description: data._Description._Value,
      Adress: data._Adress._Value,
      Telefon: data._Telefon._Value,
    };
    //console.log("formData=", formData);
    return { formData };
  },
  methods: {
    saveFormData() {
      console.log("this.data.formData.Name=", this.$data.formData);
      const formData = {
        module: "dictionary",
        form: "Contractor",
        data: {
          id: this.$data.formData.id,
          Name: this.$data.formData.Name,
          Description: this.$data.formData.Description,
          Adress: this.$data.formData.Adress,
          Telefon: this.$data.formData.Telefon,
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