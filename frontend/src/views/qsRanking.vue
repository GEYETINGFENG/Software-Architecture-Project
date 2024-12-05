<template>
  <Topbar/>
  <SearchCollege @collegeName="get_collegeName" @queryQS="queryQS"/>
  <h3 id="test_prop">测试子元素数据传递：{{ sql_name }} - {{sql_year}} - {{sql_region}}</h3>
  <qs_Intro />
  <Qs_Param_Select @yearPicked="get_year" @regionPicked="get_region" @queryQS="queryQS" />
</template>

<script>
import axios from 'axios';

import Topbar from "@/components/Topbar.vue";
import SearchCollege from "@/components/Qs_Ranking/Search_Bar.vue";
import qs_Intro from "@/components/Qs_Ranking/Qs_Intro.vue";
import Qs_Param_Select from "@/components/Qs_Ranking/Qs_Param_Select.vue";


export default {
  name: "qsRanking",
  components: {
    Topbar,
    SearchCollege,
    qs_Intro,
    Qs_Param_Select,
  },
  data() {
    return {
      sqlQuery: "",
      sql_name: "",
      sql_year: "2025",
      sql_region: "All",
      sql_sort_by: "This_Year_Rank",
      sql_order_by: "ASC",
    };
  },
  mounted() {
    this.queryQS();
  },
  methods: {
    async queryQS() {
      try {
        const response = await axios.get("http://localhost:3000/qsRanking", {
          params: {
            collegeName: this.sql_name,
            year: this.sql_year,
            region: this.sql_region,
            sortBy: this.sql_sort_by,
            orderBy: this.sql_order_by,
          },
        });
        console.log(response.data);
      }catch (error) {
        console.log(error);
      }
      console.log("Query QS ranking");
    },
    get_collegeName(collegeName) {
      // 获取子组件传递的高校名称
      this.sql_name = collegeName;
    },
    get_year(year) {
      // 获取子组件传递的年份
      this.sql_year = year;
    },
    get_region(region) {
      // 获取子组件传递的地区
      this.sql_region = region;
    }
  }
}
</script>

<style scoped>

#test_prop {
  margin: 0 0 0 0;
}
</style>