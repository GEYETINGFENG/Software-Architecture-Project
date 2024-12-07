<template>
  <Topbar/>
  <SearchCollege @collegeName="get_collegeName" @queryQS="queryQS"/>
  <qs_Intro />
  <Qs_Param_Select @yearPicked="get_year" @locationPicked="get_location" @queryQS="queryQS" />
  <Qs_List
      :response="response"
      @orderBy="get_orderBy"
      @sortBy="get_sortBy"
      @queryQS="queryQS"
  />
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
    Qs_Intro,
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
    console.log(this.response);
  },
  methods: {
    async queryQS() {
      try {
        const token = localStorage.getItem("jwt-token");
        const response = await axios.get("http://localhost:3000/qsRanking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: this.sql_name,
            year: this.sql_year,
            location: this.sql_location,
            sort_by: this.sql_sort_by,
            order_by: this.sql_order_by,
          },
        });
        this.response = response.data.data;
      }catch (error) {
        console.log(error);
      }
    },
    get_collegeName(collegeName) {
      this.sql_name = collegeName;
    },
    get_year(year) {
      this.sql_year = year;
    },
    get_location(location) {
      this.sql_location = location === "All" ? "" : location;
    },
    get_orderBy(orderBy) {
      this.sql_order_by = orderBy;
      console.log(this.sql_order_by);
    },
    get_sortBy(sortBy) {
      this.sql_sort_by = sortBy;
    },
  }
}
</script>

<style scoped>
</style>