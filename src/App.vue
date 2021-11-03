<template>
  <Header :headerClass="headerClass" />
  <router-view/>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    headerClass() {
      if (!this.$route.meta.header) {
        return '';
      }

      return this.$route.meta.header.map(type => `Header--${type}`).join(' ');
    },
  },
};
</script>

<style lang="scss">
@import './assets/styles/normalize.scss';
@import './assets/styles/common.scss';

</style>
