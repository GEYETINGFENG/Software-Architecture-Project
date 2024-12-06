<template>
  <div class="table-container">
    <!--suppress JSValidateTypes -->
    <el-table
        ref="tableRef"
        :data="paginatedResponse"
        style="width: 100%"
        stripe
        border
        class="custom-table"
        height="750"
        weight="80%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        @sort-change="SortChange"
    >
      <el-table-column
          prop="This_Year_Rank"
          label="This Year Rank"
          width="80"
          fixed="left"
          sortable="custom"
      >
      </el-table-column>

      <el-table-column prop="Institution_Name" label="Institution Name" width="200" fixed="left"></el-table-column>
      <el-table-column prop="Location" label="Location" width="140"></el-table-column>
      <el-table-column prop="Last_Year_Rank" label="Last Year Rank" width="80" sortable="custom"></el-table-column>
      <el-table-column prop="SIZE" label="Size" width="50"></el-table-column>
      <el-table-column prop="FOCUS" label="Focus" width="50"></el-table-column>
      <el-table-column prop="RES." label="Res." width="50"></el-table-column>
      <el-table-column prop="STATUS" label="Status" width="50"></el-table-column>
      <el-table-column prop="Academic_Reputation_SCORE" label="Academic Reputation" width="100" sortable="custom"></el-table-column>
      <el-table-column prop="Employer_Reputation_SCORE" label="Employer Reputation" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Faculty_Student_SCORE" label="Faculty Student" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Citations_per_Faculty_SCORE" label="Citations per Faculty" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="International_Faculty_SCORE" label="International Faculty" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="International_Students_SCORE" label="International Students" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="International_Research_Network_SCORE" label="International Research Network" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Employment_Outcomes_SCORE" label="Employment Outcomes" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Sustainability_Score" label="Sustainability" width="150" sortable="custom"></el-table-column>
      <el-table-column prop="Overall_SCORE" label="Overall" width="150" sortable="custom"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          @size-change="updateItemsPerPage"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="itemsPerPage"
          :total="response.length"
          layout="total, ->, prev, pager, next, sizes">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { ref } from 'vue';

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
  setup() {
    const tableRef = ref(null);
    return { tableRef };
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 50,
      pageSizes: [20, 50, 100],
      sort_by: "This_Year_Rank",
      order_by: "ASC",
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
      window.scrollTo({ top: 600, behavior: 'smooth' });
      this.tableRef.setScrollTop(0);
    },
    updateItemsPerPage(size) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      window.scrollTo({ top: 600, behavior: 'smooth' });
      this.tableRef.setScrollTop(0);
    },
    SortChange({ prop, order }) {
      this.sort_by = prop;
      this.order_by = order === 'ascending' ? 'ASC' : 'DESC';
      this.$emit('orderBy', this.order_by);
      this.$emit('sortBy', this.sort_by);
      this.$emit('queryQS');
    },
  },
}
</script>

<style scoped>
.table-container {
  width: 80%;
  margin: 0 auto;
  max-height: 800px;
}

.custom-table {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f9f9f9;
  overflow-x: auto;
}

.el-table th, .el-table td {
  vertical-align: middle;
  padding: 12px;
}

.el-table th {
  background-color: #151414;
  font-weight: bold;
}


.pagination {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap as needed */
}
</style>