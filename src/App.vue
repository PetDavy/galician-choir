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
    ...mapMutations([
      'setEvents',
      'setAboutBlocks',
      'setHomeData',
      'setCooperations',
      'setContact',
      'setSocials',
      'setVideos',
      'setLocale',
      'updateStorage',
    ]),
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
    setHomeDataLocal() {
      const q = query(collection(this.db, 'home'));

      onSnapshot(q, (querySnapshot) => {
        let homeData = {};

        querySnapshot.forEach((doc) => {
          homeData = {
            id: doc.id,
            ...doc.data(),
          };
        });
        this.setHomeData({ homeData });
      });
    },
    setCooperationsData() {
      const q = query(collection(this.db, 'cooperations'));

      onSnapshot(q, (querySnapshot) => {
        const cooperations = [];

        querySnapshot.forEach((doc) => {
          cooperations.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.setCooperations({ cooperations });
      });
    },
    setContactData() {
      const q = query(collection(this.db, 'contact'));

      onSnapshot(q, (querySnapshot) => {
        let contact = {};

        querySnapshot.forEach((doc) => {
          contact = {
            id: doc.id,
            ...doc.data(),
          };
        });
        this.setContact({ contact });
      });
    },
    setSocialsData() {
      const q = query(collection(this.db, 'socials'));

      onSnapshot(q, (querySnapshot) => {
        let socials = {};

        querySnapshot.forEach((doc) => {
          socials = {
            id: doc.id,
            ...doc.data(),
          };
        });
        this.setSocials({ socials });
      });
    },
    setVideosData() {
      const q = query(collection(this.db, 'videos'));

      onSnapshot(q, (querySnapshot) => {
        const videos = [];

        querySnapshot.forEach((doc) => {
          videos.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.setVideos({ videos });
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
    this.setHomeDataLocal();
    this.setStorage();
    this.setCooperationsData();
    this.setContactData();
    this.setSocialsData();
    this.setVideosData();
  },
};
</script>

<style lang="scss">
@import './assets/styles/normalize.scss';
@import './assets/styles/common.scss';
@import './assets/styles/modalsUpdate.scss';
@import './assets/styles/modalsCreate.scss';
</style>
