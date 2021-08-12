<template>
  <main>
    <h1>Справочник Контрагентов</h1> 
    <div>
        <label>----------</label>
    </div>
    <nuxt-link to="/dictionary">
      <button>Выход</button>
    </nuxt-link>    
    <button v-on:click="createRow"> (+) Создать</button>
    <div>
      <label>----------</label>
    </div>
    <div>      
      <vue-good-table
      @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="rows"
        :fixed-header="true" 
        :select-options="{ 
            enabled: true,
            selectOnCheckboxOnly: true, }"
        compactMode>
        <div slot="selected-row-actions">
          <button v-on:click="deleteRow"> (-) Удалить</button>
        </div>
      </vue-good-table>
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
          tooltip: "Порядковый номер позиции справочника",
        },
        {
          label: "Наименование позиции справочника",
          field: "Name",
          width: "500px",
          filterOptions: {
            enabled: true,
          },
          html: true,
        },
        {
          label: "Описание",
          field: "Description",
          filterOptions: {
            enabled: true,
          },
        },
      ],
      selectedRows: [],
    };
  },
  //this.$route.params.{parameterName}
  async asyncData({ app }) {
    const config = { params: { module: "dictionary", form: "Contractor", id: 0 } };
    const formList = await app.$axios.$get("api", config);
    console.log("formList=", formList);
    const rows = formList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/dictionary/Contractor/' + row.id + '">' + row.Name + "</a>",
        Description: row.Description,
      };
    });
    return { rows };
  },
  methods: {
    selectionChanged(rows) {
      this.$data.selectedRows = rows.selectedRows;
    },
    createRow() {
      const formData = {
        module: "dictionary",
        form: "Contractor",
      };
      //console.log("formData=", formData);
      this.$axios.$post("api", formData);

      this.$nuxt.refresh();
    },
    deleteRow() {
      //console.log("selectedRows=", this.$data.selectedRows);
      const formData = {
        data: {
          module: "dictionary",
          form: "Contractor",
          columnList: this.$data.selectedRows,
        },
      };
      this.$axios.$delete("api", formData);

      this.$nuxt.refresh();
    },
  },
};
</script>