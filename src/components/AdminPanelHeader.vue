<template>
  <div class="Admin__panel-header">
    <div class="Admin__panel-tabs">
      <div
        class="Admin__panel-tab btn"
        v-for="tab in tabs"
        :key="tab"
        :class="{'Admin__panel-tab--active': activeTab === tab}"
        @click="changeActiveTab(tab)"
      >
        {{tab}}
      </div>
    </div>
  <button
    type="btn"
    class="btn Admin__logout-btn"
    @click="logout"
  >
    logout
  </button>
</div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminPanelHeader',
  data() {
    return {
      tabs: ['events', 'about', 'home', 'gallery'],
    };
  },
  props: {
    activeTab: String,
  },
  computed: {
    ...mapGetters(['auth']),
  },
  methods: {
    logout() {
      signOut(this.auth)
        .then(() => {
          this.$router.push('/login');
        });
    },
    changeActiveTab(tab) {
      this.$emit('change-tab', tab);
    },
  },
};
</script>

<style lang="scss" scoped>
  .Admin {
    &__panel-header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }

    &__panel-tabs {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
    }

    &__panel-tab {
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: 1px solid #fff;
      font-weight: 500;

      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }

      &--active {
        background-color: #fff;
        color: #000;

        &:hover {
          background-color: #fff;
        }
      }
    }
  }
</style>
