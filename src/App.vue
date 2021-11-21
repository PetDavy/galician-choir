<template>
  <Header :headerClass="headerClass" />
  <Menu />
  <router-view/>
  <Footer />

</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { collection, query, onSnapshot } from 'firebase/firestore';

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
    ...mapGetters(['db']),
    headerClass() {
      if (!this.$route.meta.header) {
        return '';
      }

      return this.$route.meta.header.map(type => `Header--${type}`).join(' ');
    },
  },
  methods: {
    ...mapMutations(['setEvents']),
    setEventsData() {
      const q = query(collection(this.db, 'events'));

      onSnapshot(q, (querySnapshot) => {
        const events = [];

        querySnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.setEvents({ events });
      });
    },
  },
  mounted() {
    this.setEventsData();
  },
};
</script>

<style lang="scss">
@import './assets/styles/normalize.scss';
@import './assets/styles/common.scss';

</style>
