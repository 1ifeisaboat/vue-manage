<template>
  <div class="hello">
    <router-link to="/home">
      <el-button>按钮</el-button>
    </router-link>
    <router-link to="/about">
      <el-button type="primary">主要按钮</el-button>
    </router-link>
    &nbsp;
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      radio:'1'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
