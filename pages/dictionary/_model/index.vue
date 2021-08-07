<template>
  <main>
    <h1>Справочник №1</h1>
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
  //this.$route.params.{parameterName}
  async asyncData({ params, $http }) {
    const dictionaryList = [
      { id: 1, Name: "Пользователь 1", model: "User" },
    ]; //await $http.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
    const rows = dictionaryList.map((row) => {
      return {
        id: row.id,
        Name: '<a href="/dictionary/'+row.model+'/'+row.id+'">'+row.Name+'</a>'
      };
    });
    const columns = [
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
    ];
    return { rows, columns };
  }
};
</script>