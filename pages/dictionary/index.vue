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
      ],
    };
  },
  //this.$route.params.{parameterName}
  async asyncData({ app }) {
    const config = { params: { module: "dictionary" } };
    const dictionaryList = await app.$axios.$get("api", config);
    console.log("dictionaryList=", dictionaryList);
    const rows = dictionaryList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/dictionary/' + row.form + '">' + row.Name + "</a>",
      };
    });
    return { rows };
  },
};
</script>
