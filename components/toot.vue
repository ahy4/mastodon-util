<!-- created_at, account.username, account.display_name, account.avatar_static, (account.header_static),
url, reblogs_count, favourites_count, content -->

<template>
  <div class="toot">
    <div class="toot-account">
      <div class="icon">
        <img :src="data.account.avatar_static" alt="" height="60" width="60">
      </div>
      <div class="right">
        <div class="name">
          {{data.account.display_name}}
        </div>
        <div class="id">
          @{{data.account.username}}
        </div>
      </div>
    </div>
    <div class="toot-content" v-html="data.content">
    </div>
    <div class="toot-bottom">
      <div class="reblog icon-loop"> {{data.reblogs_count}}</div>
      <div class="favourite icon-star-full"> {{data.favourites_count}}</div>
      <div class="date">{{date}}</div>
    </div>
    <!-- data:{{JSON.stringify(data)}} -->
  </div>
</template>


<style scoped>
.toot-account {
  display: flex;
  flex-direction: row;
}
.toot {
  border-top: 1px solid #ddd;
  padding: 20px 0;
}
.icon img {
  border-radius: 4px;
}
.right {
  padding-left: 20px;
}
.right .name {
  font-size: 16px;
  padding-top: 10px;
  height: 20px;
  line-height: 20px;
}
.right .id {
  font-size: 12px;
  color: #aaa;
  height: 20px;
  line-height: 20px;
}
.toot-bottom {
  display: flex;
  flex-direction: row;
}
.reblog {
  color: #759d6f;
}
.favourite {
  color: #9d904f;
  margin-left: 10px;
}
.date {
  margin-left: 30px;
  color: #aaa;
}
</style>

<script>
import moment from 'moment'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    date () {
      return moment(this.data.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
