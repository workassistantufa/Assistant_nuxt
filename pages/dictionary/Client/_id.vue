<template>
  <div>
    <h1>Клиенты</h1>
    <div>
        <label>----------</label>
    </div>
    <nuxt-link to="/dictionary/Client">
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
      params: { module: "dictionary", form: "Client", id: params.id },
    };
    const data = await app.$axios.$get("api", config);
    console.log("data=", data);
    const formData = {
      id: data._id._Value,
      Name: data._Name._Value,
      Description: data._Description._Value,
    };
    //console.log("formData=", formData);
    return { formData };
  },
  methods: {
    saveFormData() {
      console.log("this.data.formData.Name=", this.$data.formData);
      const formData = {
        module: "dictionary",
        form: "Client",
        data: {
          id: this.$data.formData.id,
          Name: this.$data.formData.Name,
          Description: this.$data.formData.Description,
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