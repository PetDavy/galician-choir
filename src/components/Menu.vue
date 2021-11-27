<template>
  <div class="Menu" :class="{
    'Menu_open': isMenuOpen,
    'Menu_disappeared': isDisappearing
    }"
  >
    <nav class="Menu__navigation" @click="toggleMenu">
      <router-link to="/" class="Menu__link">home</router-link>
      <router-link to="/about" class="Menu__link">about</router-link>
      <router-link to="/events" class="Menu__link">events</router-link>
      <router-link to="/gallery" class="Menu__link">gallery</router-link>
      <router-link to="/contact" class="Menu__link">contact</router-link>
      <router-link to="/admin" class="Menu__link Menu__link--admin" v-if="logedIn">cabinet</router-link>
    </nav>
    <i class="Menu__close-btn" @click="toggleMenu" ></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Menu',
  data() {
    return {
      isDisappearing: false,
    };
  },
  computed: {
    ...mapGetters(['isMenuOpen', 'logedIn']),
  },
  methods: {
    ...mapMutations(['toggleMenu']),
  },
  watch: {
    isMenuOpen(status) {
      if (status) {
        return;
      }

      this.isDisappearing = true;

      setTimeout(() => {
        this.isDisappearing = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
  .Menu {
    position: fixed;
    left: 100%;
    top: 0;
    bottom: 0;
    width: 50%;
    display: flex;
    align-items: center;
    padding: 40px;
    background: #1d1d1d;
    transform: translateX(0);
    opacity: 1;
    transition: transform .4s cubic-bezier(.65,.05,.36,1), opacity .4s;
    z-index: 10;

    &__navigation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      @media (max-width: 960px) {
        width: 100%;
        text-align: center;
      }

      @media (max-height: 520px) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    &__link {
      margin-bottom: 20px;
      width: 100%;
      font-size: 67px;
      line-height: 70px;
      color: #fff;
      text-transform: uppercase;
      font-weight: 300;

      &--admin {
        color: #ffa182;
      }

      &:hover {
        color: #999;
      }

      @media (max-width: 700px) {
        font-size: 55px;
        line-height: 60px;
      }

      @media (max-height: 520px) {
        width: auto;
        margin-left: 20px;
        margin-right: 20px;
      }
    }

    &__close-btn {
      position: absolute;
      right: 60px;
      top: 35px;
      width: 23px;
      height: 23px;
      cursor: pointer;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background-color: #fff;
        border-radius: 2px;
      }

      &::before {
        top: 50%;
        left: 0;
        right: 0;
        height: 3px;
        transform: translateY(-50%) rotate(45deg);
      }

      &::after {
        left: 50%;
        top: 0;
        bottom: 0;
        width: 3px;
        transform: translateX(-50%) rotate(45deg);
      }

      &:hover {
        &::before,
        &::after {
          background-color: #999;
        }
      }
    }

    &_open {
      transform: translateX(-100%);
    }

    &_disappeared {
      opacity: 0;
    }

    @media (max-width: 960px) {
      width: 100%;
    }
  }
</style>
