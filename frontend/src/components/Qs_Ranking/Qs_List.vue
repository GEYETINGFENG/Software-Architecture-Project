<template>
  <div class="table-container">
    <el-table :data="paginatedResponse" style="width: 100%" stripe border class="custom-table">
      <el-table-column prop="This_Year_Rank" label="This Year Rank" width="80"></el-table-column>
      <el-table-column prop="Last_Year_Rank" label="Last Year Rank" width="80"></el-table-column>
      <el-table-column prop="Institution_Name" label="Institution Name" width="200"></el-table-column>
      <el-table-column prop="Location" label="Location" width="140"></el-table-column>
      <el-table-column prop="SIZE" label="Size" width="50"></el-table-column>
      <el-table-column prop="FOCUS" label="Focus" width="50"></el-table-column>
      <el-table-column prop="RES." label="Res." width="50"></el-table-column>
      <el-table-column prop="STATUS" label="Status" width="50"></el-table-column>
      <el-table-column prop="Academic_Reputation_SCORE" label="Academic Reputation" width="100"></el-table-column>
      <el-table-column prop="Employer_Reputation_SCORE" label="Employer Reputation" width="150"></el-table-column>
      <el-table-column prop="Faculty_Student_SCORE" label="Faculty Student" width="150"></el-table-column>
      <el-table-column prop="Citations_per_Faculty_SCORE" label="Citations per Faculty" width="150"></el-table-column>
      <el-table-column prop="International_Faculty_SCORE" label="International Faculty" width="150"></el-table-column>
      <el-table-column prop="International_Students_SCORE" label="International Students" width="150"></el-table-column>
      <el-table-column prop="International_Research_Network_SCORE" label="International Research Network" width="150"></el-table-column>
      <el-table-column prop="Employment_Outcomes_SCORE" label="Employment Outcomes" width="150"></el-table-column>
      <el-table-column prop="Sustainability_Score" label="Sustainability" width="150"></el-table-column>
      <el-table-column prop="Overall_SCORE" label="Overall" width="150"></el-table-column>
    </el-table>
  <el-pagination class="pagination_s"
      @size-change="updateItemsPerPage"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="itemsPerPage"
      :total="response.length">
  </el-pagination>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';

export default {
  name: "Qs_List",
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
  },
  props: {
    response: Array,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  computed: {
    paginatedResponse() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.response.slice(start, end);
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
}
</script>

<style scoped>
.table-container {
  height: 400px; /* Set the desired height */
}


.custom-table {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f9f9f9;
  overflow-x: auto;
}

.el-table th, .el-table td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
}

.el-table th {
  background-color: #151414;
  font-weight: bold;
}

</style>