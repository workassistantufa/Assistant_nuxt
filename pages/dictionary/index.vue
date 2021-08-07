<template>
  <main>
    <h1>Справочники</h1> 
    <div>
    <label>----------</label>
    </div>
    <nuxt-link to="/">
      <button>Выход</button>
    </nuxt-link>
    <div>
      <label>----------</label>
    </div>
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
export default {middleware({ store, redirect }) {
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
        tooltip: "Порядковый номер справочника",
      },
      {
        label: "Наименование справочника",
        field: "Name",
        filterOptions: {
          enabled: true,
        },
        html: true,
      },
    ]
    };
  },
  //this.$route.params.{parameterName}
  async asyncData({ app}) {
    const config = { params: { module: 'dictionary' } }
    const dictionaryList = await app.$axios.$get("http://localhost:3001/api", config);
    console.log('dictionaryList=',dictionaryList);
    const rows = dictionaryList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/dictionary/' + row.form + '">' + row.Name + '</a>'
      };
    });
    return { rows };
  }
};
</script>
