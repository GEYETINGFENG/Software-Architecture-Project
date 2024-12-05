<template>
  <Topbar/>
  <SearchCollege @collegeName="get_collegeName" @queryQS="queryQS"/>
  <qs_Intro />
  <Qs_Param_Select @yearPicked="get_year" @locationPicked="get_location" @queryQS="queryQS" />
  <Qs_List :response="response" @orderBy="get_orderBy" @sortBy="get_sortBy" />
</template>

<script>
import axios from 'axios';

import Topbar from "@/components/Topbar.vue";
import SearchCollege from "@/components/Qs_Ranking/Search_Bar.vue";
import Qs_Intro from "@/components/Qs_Ranking/Qs_Intro.vue";
import Qs_Param_Select from "@/components/Qs_Ranking/Qs_Param_Select.vue";
import Qs_List from "@/components/Qs_Ranking/Qs_List.vue";


export default {
  name: "qsRanking",
  components: {
    Topbar,
    SearchCollege,
    qs_Intro: Qs_Intro,
    Qs_Param_Select,
    Qs_List,
  },
  data() {
    return {
      sql_name: "",
      sql_year: "2025",
      sql_location: "",
      sql_sort_by: "This_Year_Rank",
      sql_order_by: "ASC",
      response:[],
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
            name: this.sql_name,
            year: this.sql_year,
            location: this.sql_location,
            sortBy: this.sql_sort_by,
            orderBy: this.sql_order_by,
          },
        });
        this.response = response.data.data;
        this.process_qsData();
      }catch (error) {
        console.log(error);
      }
    },
    get_collegeName(collegeName) {
      // 获取子组件传递的高校名称
      this.sql_name = collegeName;
      console.log(this.sql_name);
    },
    get_year(year) {
      // 获取子组件传递的年份
      this.sql_year = year;
    },
    get_location(location) {
      // 获取子组件传递的地区
      this.sql_location = location === "All" ? "" : location;
    },
    get_orderBy(orderBy) {
      // 获取子组件传递的排序方式
      this.sql_order_by = orderBy;
    },
    get_sortBy(sortBy) {
      // 获取子组件传递的排序依据
      this.sql_sort_by = sortBy;
    },
    process_qsData(){

    }
  }
}
</script>

<style scoped>

#test_prop {
  margin: 0 0 0 0;
}
</style>