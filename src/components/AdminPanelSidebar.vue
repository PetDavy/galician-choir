<template>
  <div class="Admin__panel-sidebar">
    <div class="Admin__panel-tabs">
      <div
        class="Admin__panel-tab"
        v-for="tab in tabs"
        :key="tab"
        :class="{'Admin__panel-tab--active': activeTab === tab}"
        @click="changeActiveTab(tab)"
      >
        {{tab}}
      </div>
      <button
        type="btn"
        class="Admin__logout-btn"
        @click="logout"
      >
        log out
      </button>
    </div>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminPanelsidebar',
  data() {
    return {
      tabs: ['events', 'about', 'home', 'gallery', 'contact'],
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
    &__panel-sidebar {
      display: flex;
      flex-shrink: 0;
      width: 20%;
      padding-top: 40px;
      background-color: #fff;

      @media (max-width: 830px) {
        width: 100%;
      }
    }

    &__panel-tabs {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;

      @media (max-width: 830px) {
        padding: 0 20px;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
      }
    }

    &__panel-tab {
      width: 100%;
      padding: 20px 0 20px 50px;
      font-size: 20px;
      text-transform: uppercase;
      color: #666;
      cursor: pointer;

      @media (max-width: 830px) {
        padding: 20px;
        width: auto;
        margin-bottom: 15px;
      }

      &:hover {
        background-color: #f4f4f4;
      }

      &--active {
        position: relative;
        padding-left: 46px;
        font-weight: 500;
        background-color: #e0f3ff;
        color: #3f6ad8;
        border-left: 4px solid #3379c4;

      @media (max-width: 830px) {
        padding-left: 20px;
        border-left: 0;
        border-bottom: 4px solid #3379c4;
      }

        &:hover {
          background-color: #e0f3ff;
        }
      }

      &:last-of-type {
        position: relative;
        margin-bottom: 50px;

        &::before {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50px;
          right: 50px;
          height: 1px;
          background-color: #ccc;
          margin-bottom: 0;

          @media (max-width: 830px) {
            display: none;
          }
        }

        @media (max-width: 830px) {
          margin-bottom: 15px;
        }
      }
    }

    &__logout-btn {
      margin: 0 auto;
      text-transform: uppercase;
      font-size: 15px;
      padding: 15px 35px;
      display: inline-flex;
      background-color: #f2f2f2;
      border: none;
      cursor: pointer;

      @media (max-width: 830px) {
        padding: 20px 35px;
        margin-bottom: 15px;
      }
    }
  }
</style>
