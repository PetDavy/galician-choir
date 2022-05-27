<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="Contact">
    <div class="Contact__content side-indent">
      <GrandTitle :titleText="titles[locale].contact" align="left:40" color="light" v-if="isLoaderRemoved" />
      <div class="Contact__info">
        <div class="Contact__info-item">
          <p class="Contact__info-item-title">
            {{lines[locale].phone}}
          </p>
          <p
            class="Contact__info-item-line"
            v-for="phone in contact.phone"
            :key="phone"
          >
            <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="m14.6 10.6-3.3-1.4a.7.7 0 0 0-.8.2L9 11.2C6.7 10 5 8.2 3.8 6l1.8-1.5a.7.7 0 0 0 .2-.8L4.4.4a.7.7 0 0 0-.8-.4L.6.7a.7.7 0 0 0-.6.7C0 9 6 15 13.6 15a.7.7 0 0 0 .7-.5l.7-3a.7.7 0 0 0-.4-.9Z" fill="#A56F50"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h15v15H0z"/></clipPath></defs></svg>
            <a :href="`tel:${formatPhone(phone)}`">
              {{phone}}
            </a>
          </p>
        </div>
        <div class="Contact__info-item">
          <p class="Contact__info-item-title">
            {{lines[locale].email}}
          </p>
          <p
            class="Contact__info-item-line"
            v-for="email in contact.email"
            :key="email"
          >
            <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 3.7c.1 0 .3 0 .3.2v6c0 .7-.6 1.3-1.4 1.3H1.4c-.8 0-1.4-.6-1.4-1.4v-6s.2-.2.3 0L4.8 7c.6.5 1.7 1.4 2.7 1.4 1 0 2.1-1 2.7-1.4l4.5-3.3ZM7.5 7.5c.7 0 1.7-.9 2.2-1.2l5-3.8c.2-.1.3-.3.3-.5v-.6c0-.8-.6-1.4-1.4-1.4H1.4C.6 0 0 .6 0 1.4V2c0 .2.1.4.3.5l5 3.8c.5.3 1.5 1.2 2.2 1.2Z" fill="#A56F50"/></svg>
            <a :href="`mailto:${email}`">
              {{email}}
            </a>
          </p>
        </div>
      </div>
      <form
        action="https://formsubmit.co/galicianchoir@gmail.com"
        class="Contact__form"
        method="POST"
        @submit="handlSubmit"
      >
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="https://galician-choir.web.app/contact">
        <div class="Contact__form-content">
          <label for="Contact-name" class="Contact__input-label">
            <input
              id="Contact-name"
              type="text"
              :placeholder="lines[locale].name"
              class="Contact__input"
              name="name"
              v-model="name"
            >
          </label>
          <label for="Contact-email" class="Contact__input-label">
            <input
              id="Contact-email"
              type="email"
              :placeholder="lines[locale].email"
              class="Contact__input"
              name="email"
              v-model="email"
              required
            >
          </label>
          <label for="Contact-message" class="Contact__input-label">
            <textarea
              id="Contact-message"
              cols="30"
              rows="6"
              :placeholder="lines[locale].message"
              class="Contact__input Contact__input--textarea"
              name="message"
              v-model="message"
              required
            ></textarea>
          </label>
          <button type="submit" class="Contact__btn btn">{{buttons[locale].send}}</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';
import titles from '@/assets/texts/titles.json';
import buttons from '@/assets/texts/buttons.json';
import lines from '@/assets/texts/lines.json';

export default {
  name: 'Contact',
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
      name: '',
      email: '',
      message: '',
      titles,
      buttons,
      lines,
    };
  },
  components: {
    GrandTitle,
    Loader,
  },
  computed: {
    ...mapGetters(['locale', 'contact']),
    isValidForm() {
      return this.email && this.message;
    },
  },
  methods: {
    handlSubmit(event) {
      if (!this.isValidForm) {
        event.preventDefault();
      }
    },
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
    formatPhone(number) {
      return number.replaceAll(' ', '').replaceAll('-', '');
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
  .Contact {
    position: relative;
    padding-bottom: 200px;
    padding-top: 280px;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/galician-choir.appspot.com/o/photos%2F11-DSC_9706.jpg?alt=media&token=94124b3d-2999-4379-8e2e-3b14baea1997');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      opacity: 0.7;
      z-index: 1;
    }

    .Grand-title {
      @media (max-width: 950px) {
        left: initial !important;
      }
    }

    @media (max-width: 1000px) {
      padding-top: 260px;
      padding-bottom: 100px;
    }

    .side-indent {
      max-width: 1420px;
    }

    &__content {
      position: relative;
      padding-top: 60px;
      position: relative;
      display: flex;
      justify-content: space-between;
      z-index: 2;

      @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
      }

      @media (max-width: 1000px) {
        padding-top: 0
      }
    }

    &__info {
      padding-right: 50px;
      width: 38%;
      padding: 40px;
      background-color: #f4f4f4;
      align-self: flex-start;
      border-radius: 4px;

      @media (max-width: 1100px) {
        width: auto;
        max-width: 600px;
        text-align: center;
        align-self: center;
        margin-bottom: 60px;
      }
    }

    &__info-item {
      margin-bottom: 25px;
    }

    &__info-item-title {
      margin-bottom: 25px;
      font-size: 28px;
      line-height: 28px;
      color: #000;
      text-transform: capitalize;
    }

    &__info-item-line {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 30px;
      color: #ccc;

      @media (max-width: 950px) {
        justify-content: center;
      }

      a {
        margin-left: 10px;
        color: #32454e;

        &:hover {
          color: #32454e;
        }
      }

      svg {
        flex-shrink: 0;
      }
    }

    &__form {
      width: 600px;
      padding-bottoM: 40px;

      @media (max-width: 950px) {
        padding-top: 40px;
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
      padding: 30px;
      background-color: #fff;
      border-radius: 4px;
    }

    &__input-label {
      position: relative;
      z-index: 2;
    }

    &__input {
      height: 60px;
      background-color: #fff;
      width: 100%;
      padding: 10px 10px 10px 15px;
      margin-bottom: 25px;
      border: none;
      border-bottom: 2px solid #ccc;
      font-size: 20px;
      color: #000;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #555658;
        text-transform: capitalize;
      }

      &--textarea {
        height: initial;
        resize: vertical;
      }
    }

    &__input-icon {
      position: absolute;
      top: 17px;
      right: 15px;
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
