<template>
  <div>
    <h1>Номенклатура</h1>
    <div>
        <label>----------</label>
    </div>
    <nuxt-link to="/dictionary/Material">
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
      <label>Клиент</label>
      <select v-model="formData.selectedClient">
        <option v-for="Client in formData.Clients" v-bind:value="Client.id">{{Client.Name}}</option>
      </select>
      <label>Контрагент</label>
      <select v-model="formData.selectedContractor">
        <option v-for="Contractor in formData.Contractors" v-bind:value="Contractor.id">{{Contractor.Name}}</option>
      </select>
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
      formData: {
        Clients: [],
        Contractors: [],
        selectedClient: "",
        selectedContractor: "",
      },
    };
  },
  async asyncData({ app, params }) {
    //console.log('params=',params);
    let config = {
      params: { module: "dictionary", form: "Material", id: params.id },
    };
    let data = await app.$axios.$get("api", config);

    const formData = {
      id: data._id._Value,
      Name: data._Name._Value,
      Description: data._Description._Value,
      selectedClient: data._Client_id._Value,
      selectedContractor: data._Contractor_id._Value,
    };
    config = {
      params: { module: "dictionary", form: "Client", id: 0 },
    };
    data = await app.$axios.$get("api", config);
    //console.log("data=", data);
    formData.Clients = data;

    config = {
      params: { module: "dictionary", form: "Contractor", id: 0 },
    };
    data = await app.$axios.$get("api", config);
    formData.Contractors = data;
    //console.log("formData=", formData);
    return { formData };
  },
  methods: {
    saveFormData() {
      //console.log("this.data.formData.Name=", this.$data.formData);
      const formData = {
        module: "dictionary",
        form: "Material",
        data: {
          id: this.$data.formData.id,
          Name: this.$data.formData.Name,
          Description: this.$data.formData.Description,
          Client_id: this.$data.formData.selectedClient,
          Contractor_id: this.$data.formData.selectedContractor,
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