<template>
  <main>
    <h1>Ассистент</h1>
    <p />  
    <div>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :fixed-header="true" 
        compactMode/>
    </div>
  </main>
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
      columns: [
        {
          label: "id",
          field: "id",
          type: "number",
          width: "50px",
          tooltip: "Порядковый номер модуля",
        },
        {
          label: "Наименование модуля",
          field: "Name",
          filterOptions: {
            enabled: true,
          },
          html: true,
        },
      ],
    };
  },
  //this.$route.params.{parameterName}
  async asyncData({ app }) {
    const moduleList = await app.$axios.$get("http://localhost:3001/api");
    //console.log('moduleList=',moduleList);
    const rows = moduleList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/' + row.module + '">' + row.Name + "</a>",
      };
    });
    return { rows };

    /* [
      { id: 1, Name: "Справочник пользователей", model: "User" },
    ]; //await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
    const rows = dictionaryList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/' + row.model + '">' + row.Name + '</a>'
      };
    });
    const ;
    */
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
