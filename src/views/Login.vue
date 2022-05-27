<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="Login">
    <div class="Login__content side-indent">
      <GrandTitle titleText="log in" align="left:40" v-if="isLoaderRemoved" />
      <form action="" class="Login__form" @submit.prevent="logIn">
        <div class="Login__form-content">
          <label for="login-email" class="Login__input-label">
            <svg class="Login__input-icon" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5.4a12.1 12.1 0 1 0 6.6 22.2c.6-.3.7-1.1.3-1.7l-.5-.6c-.4-.4-1-.6-1.5-.2a9 9 0 0 1-13.9-7.6c0-5 4-9 9-9 4.9 0 9 2.8 9 7.8 0 2-1 4-2.9 4.1-.8 0-.8-.6-.6-1.5L19 8c.2-.7-.4-1.4-1.1-1.4h-2.2a.7.7 0 0 0-.7.6c-.7-.8-2-1-2.9-1-3.6 0-6.7 3-6.7 7.4 0 3.2 1.8 5.1 4.7 5.1a5 5 0 0 0 3.6-1.8c.5 1.6 2 1.6 3.5 1.6 5.3 0 7.3-3.5 7.3-7.2 0-6.6-5.4-11-12.1-11Zm-1 14.9c-1.1 0-1.8-.8-1.8-2 0-2.2 1.5-3.6 2.8-3.6 1.1 0 1.8.8 1.8 2 0 2.2-1.7 3.6-2.9 3.6Z" fill="#515251"/></svg>
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              class="Login__input"
              v-model="email"
            >
          </label>
          <label for="login-password" class="Login__input-label">
            <svg class="Login__input-icon" width="24" height="26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.3 10.8h-2.6V5.4a5 5 0 0 0-2-3.8C15.5.6 13.7 0 12 0c-1.8 0-3.5.6-4.7 1.6a5 5 0 0 0-2 3.8v5.4H2.7a3 3 0 0 0-2 .7A2 2 0 0 0 0 13v10.8c0 .6.3 1.2.8 1.6a3 3 0 0 0 1.9.6h18.6a3 3 0 0 0 2-.6c.4-.4.7-1 .7-1.6V13a2 2 0 0 0-.8-1.5 3 3 0 0 0-1.9-.7ZM12 20.6c-.5 0-1-.1-1.5-.4-.4-.2-.8-.6-1-1-.2-.4-.2-.8-.1-1.2 0-.4.3-.8.7-1.1a3.2 3.2 0 0 1 3-.5l1.1.8c.3.4.5.8.5 1.2a2 2 0 0 1-.8 1.5 3 3 0 0 1-1.9.7Zm2.7-9.8H9.3V5.4c0-.6.3-1.1.8-1.5a3 3 0 0 1 1.9-.6 3 3 0 0 1 1.9.6c.5.4.8 1 .8 1.5v5.4Z" fill="#515251"/></svg>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              class="Login__input"
              v-model="password"
            >
          </label>
          <button type="submit" class="Login__btn btn">login</button>
          <div class="Login__form-bg-spot"></div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Login',
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
      email: '',
      password: '',
    };
  },
  components: {
    GrandTitle,
    Loader,
  },
  methods: {
    logIn() {
      signInWithEmailAndPassword(this.$store.state.auth, this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/admin' });
        })
        .catch((error) => {
          console.warn(error);
        });
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
  .Login {
    background-color: #132b34;
    padding-bottom: 200px;
    padding-top: 280px;

    .Grand-title {
      @media (max-width: 950px) {
        left: 50% !important;
        transform: translateX(-50%);
      }
    }

    &__content {
      position: relative;
    }

    &__form {
      width: 550px;
      padding: 40px 0;

      @media (max-width: 950px) {
        margin: 0 auto;
      }

      @media (max-width: 700px) {
        width: 100%;
      }
    }

    &__form-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__form-bg-spot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: #27718c;
      opacity: 0.3;
      filter: blur(60px);

      @media (max-width: 700px) {
        width: 80%;
      }
    }

    &__input-label {
      position: relative;
      z-index: 2;
    }

    &__input {
      height: 60px;
      background-color: #1c1f22;
      width: 100%;
      border-radius: 4px;
      padding: 10px 50px;
      margin-bottom: 25px;
      border-right: none;
      font-size: 20px;
      color: #fff;

      &::placeholder {
        color: #555658;
      }
    }

    &__input-icon {
      position: absolute;
      top: 17px;
      left: 15px;
    }

    .Grand-title {
      top: -140px;
    }

    &__btn {
      position: relative;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      z-index: 2;

      &::before {
        position: absolute;
        content: '';
        bottom: 4px;
        left: 4px;
        width: 0;
        height: 0;
        border-bottom: 1px solid #aaaaaa;
        border-left: 1px solid #aaaaaa;
        transition: width .5s, height .5s;
      }

      &::after {
        position: absolute;
        content: '';
        top: 4px;
        right: 4px;
        width: 0;
        height: 0;
        border-right: 1px solid #aaaaaa;
        border-top: 1px solid #aaaaaa;
        transition: width .5s, height .5s;
      }

      &:hover {
        &::before {
          width: calc(100% - 8px);
          height: calc(100% - 8px);
        }

        &::after {
          width: calc(100% - 8px);
          height: calc(100% - 8px);
        }
      }
    }
  }
</style>
