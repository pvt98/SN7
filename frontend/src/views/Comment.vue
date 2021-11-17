<template>
  <div class="comment">
    <Comment/>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Comment.vue'

export default {
  name: 'CommentPage',
  components: {
    Home
  }
}
</script>