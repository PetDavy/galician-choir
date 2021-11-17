<template>
  <Header :headerClass="headerClass" />
  <Menu />
  <router-view/>
  <Footer />

</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Menu,
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
