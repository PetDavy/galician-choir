<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <EventModalForm v-if="isModalFormOpen && activeTab === 'events'" />
  <AboutModalForm v-if="isModalFormOpen && activeTab === 'about'" />
  <CooperationModalForm v-if="isModalFormOpen && activeTab === 'home'" />
  <VideoModalForm v-if="isModalFormOpen && activeTab === 'video'" />
  <section class="Admin">
    <div class="Admin__content">
      <div class="Admin__panel">
        <AdminPanelSidebar :activeTab="activeTab" @changeTab="changeTab" />
        <AdminEvents
          @openModal="isModalOpen = true"
          v-if="activeTab === 'events'"
        />
        <AdminAbout
          v-if="activeTab === 'about'"
        />
        <AdminHome
          v-if="activeTab === 'home'"
        />
        <AdminGallery
          v-if="activeTab === 'gallery'"
        />
        <AdminVideo
          v-if="activeTab === 'video'"
        />
        <AdminContact
          v-if="activeTab === 'contact'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader.vue';
import AdminPanelSidebar from '@/components/AdminPanelSidebar.vue';
import AdminEvents from '@/components/AdminEvents.vue';
import AdminGallery from '@/components/AdminGallery.vue';
import AdminVideo from '@/components/AdminVideo.vue';
import AdminAbout from '@/components/AdminAbout.vue';
import AdminHome from '@/components/AdminHome.vue';
import AdminContact from '@/components/AdminContact.vue';
import CooperationModalForm from '@/components/CooperationModalForm.vue';
import VideoModalForm from '@/components/VideoModalForm.vue';
import EventModalForm from '@/components/EventModalForm.vue';
import AboutModalForm from '@/components/AboutModalForm.vue';

export default {

  name: 'Admin',
  data() {
    return {
      events: [],
      isLoaderVisible: true,
      isLoaderRemoved: false,
      activeTab: 'events',
    };
  },
  components: {
    Loader,
    AdminPanelSidebar,
    AdminEvents,
    AdminAbout,
    AdminHome,
    AdminContact,
    EventModalForm,
    CooperationModalForm,
    VideoModalForm,
    AboutModalForm,
    AdminGallery,
    AdminVideo,
  },
  computed: {
    ...mapGetters(['auth', 'db', 'isModalFormOpen']),
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoaderVisible = false;
      this.removeLoader();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
  .Admin {
    padding-top: 98px;
    background-color: #f1f4f6;

    &__content {
      position: relative;
    }

    &__panel {
      display: flex;

      @media (max-width: 830px) {
        flex-direction: column;
      }
    }
  }
</style>
