<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <EventModalForm v-if="isModalFormOpen" />
  <section class="Admin">
    <div class="Admin__content side-indent">
      <GrandTitle titleText="my admin panel" align="left:40" v-if="isLoaderRemoved" />
      <div class="Admin__panel">
        <AdminPanelHeader :activeTab="activeTab" @changeTab="changeTab" />
        <AdminEvents
          @openModal="isModalOpen = true"
          v-if="activeTab === 'events'"
        />
        <AdminGallery
          v-if="activeTab === 'gallery'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';
import AdminPanelHeader from '@/components/AdminPanelHeader.vue';
import AdminEvents from '@/components/AdminEvents.vue';
import AdminGallery from '@/components/AdminGallery.vue';
import EventModalForm from '@/components/EventModalForm.vue';

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
    GrandTitle,
    Loader,
    AdminPanelHeader,
    AdminEvents,
    EventModalForm,
    AdminGallery,
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
    background-color: #4e6b75;
    padding-bottom: 200px;
    padding-top: 280px;

    &__content {
      position: relative;
    }

    &__panel {
      padding: 40px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      border: 1px solid #999;
    }

    &__panel-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 40px;
    }

    &__logout-btn {
      min-width: 250px;
      height: 60px;
      line-height: 60px;
    }

    .Grand-title {
      top: -140px;
    }
  }
</style>
