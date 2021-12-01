<template>
  <Header :headerClass="headerClass" />
  <Menu />
  <router-view/>
  <Footer />

</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useCookies } from 'vue3-cookies';
import { getStorage } from 'firebase/storage';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'App',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    Header,
    Footer,
    Menu,
  },
  computed: {
    ...mapGetters(['db', 'locale']),
    headerClass() {
      if (!this.$route.meta.header) {
        return '';
      }

      return this.$route.meta.header.map(type => `Header--${type}`).join(' ');
    },
  },
  methods: {
    ...mapMutations(['setEvents', 'setAboutBlocks', 'setLocale', 'updateStorage']),
    setSiteLocale() {
      const locale = this.cookies.get('locale');

      if (locale) {
        this.setLocale({ locale });
      } else {
        this.cookies.set('locale', this.locale);
      }
    },
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
    setAboutBlocksData() {
      const q = query(collection(this.db, 'about-blocks'));

      onSnapshot(q, (querySnapshot) => {
        const aboutBlocks = [];

        querySnapshot.forEach((doc) => {
          aboutBlocks.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.setAboutBlocks({ aboutBlocks });
      });
    },
    setStorage() {
      const storage = getStorage();

      this.updateStorage({ storage });
    },
  },
  mounted() {
    this.setSiteLocale();
    this.setEventsData();
    this.setAboutBlocksData();
    this.setStorage();
  },
};
</script>

<style lang="scss">
@import './assets/styles/normalize.scss';
@import './assets/styles/common.scss';

</style>
