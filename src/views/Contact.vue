<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="Contact">
    <div class="Contact__content side-indent">
      <GrandTitle titleText="contact" align="left:40" v-if="isLoaderRemoved" />
      <div class="Contact__info">
        <div class="Contact__info-item">
          <p class="Contact__info-item-title">
            Phone
          </p>
          <p class="Contact__info-item-line">
            <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="m14.6 10.6-3.3-1.4a.7.7 0 0 0-.8.2L9 11.2C6.7 10 5 8.2 3.8 6l1.8-1.5a.7.7 0 0 0 .2-.8L4.4.4a.7.7 0 0 0-.8-.4L.6.7a.7.7 0 0 0-.6.7C0 9 6 15 13.6 15a.7.7 0 0 0 .7-.5l.7-3a.7.7 0 0 0-.4-.9Z" fill="#A56F50"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h15v15H0z"/></clipPath></defs></svg>
            <a href="tel:+38 097 471 1218">
              +38 097 471 1218
            </a>
          </p>
          <p class="Contact__info-item-line">
            <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="m14.6 10.6-3.3-1.4a.7.7 0 0 0-.8.2L9 11.2C6.7 10 5 8.2 3.8 6l1.8-1.5a.7.7 0 0 0 .2-.8L4.4.4a.7.7 0 0 0-.8-.4L.6.7a.7.7 0 0 0-.6.7C0 9 6 15 13.6 15a.7.7 0 0 0 .7-.5l.7-3a.7.7 0 0 0-.4-.9Z" fill="#A56F50"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h15v15H0z"/></clipPath></defs></svg>
            <a href="tel:+72 (555) 243 12">
              +72 (555) 243 12
            </a>
          </p>
        </div>
        <div class="Contact__info-item">
          <p class="Contact__info-item-title">
            Email
          </p>
          <p class="Contact__info-item-line">
            <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 3.7c.1 0 .3 0 .3.2v6c0 .7-.6 1.3-1.4 1.3H1.4c-.8 0-1.4-.6-1.4-1.4v-6s.2-.2.3 0L4.8 7c.6.5 1.7 1.4 2.7 1.4 1 0 2.1-1 2.7-1.4l4.5-3.3ZM7.5 7.5c.7 0 1.7-.9 2.2-1.2l5-3.8c.2-.1.3-.3.3-.5v-.6c0-.8-.6-1.4-1.4-1.4H1.4C.6 0 0 .6 0 1.4V2c0 .2.1.4.3.5l5 3.8c.5.3 1.5 1.2 2.2 1.2Z" fill="#A56F50"/></svg>
            <a href="mailto:sometestemail@gmail.com">
              sometestemail@gmail.com
            </a>
          </p>
          <p class="Contact__info-item-line">
            <svg width="15" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 3.7c.1 0 .3 0 .3.2v6c0 .7-.6 1.3-1.4 1.3H1.4c-.8 0-1.4-.6-1.4-1.4v-6s.2-.2.3 0L4.8 7c.6.5 1.7 1.4 2.7 1.4 1 0 2.1-1 2.7-1.4l4.5-3.3ZM7.5 7.5c.7 0 1.7-.9 2.2-1.2l5-3.8c.2-.1.3-.3.3-.5v-.6c0-.8-.6-1.4-1.4-1.4H1.4C.6 0 0 .6 0 1.4V2c0 .2.1.4.3.5l5 3.8c.5.3 1.5 1.2 2.2 1.2Z" fill="#A56F50"/></svg>
            <a href="mailto:fakeemail@gmail.com">
              fakeemail@gmail.com
            </a>
          </p>
        </div>
      </div>
      <form action="" class="Contact__form">
        <div class="Contact__form-content">
          <h3 class="Contact__form-title">Send a message</h3>
          <label for="Contact-name" class="Contact__input-label">
            <input
              id="Contact-name"
              type="text"
              placeholder="Name"
              class="Contact__input"
              v-model="name"
            >
          </label>
          <label for="Contact-email" class="Contact__input-label">
            <input
              id="Contact-email"
              type="email"
              placeholder="Email"
              class="Contact__input"
              v-model="email"
              required
            >
          </label>
          <label for="Contact-message" class="Contact__input-label">
            <textarea
              name="contact-text"
              id="Contact-message"
              cols="30"
              rows="6"
              placeholder="Your Message"
              class="Contact__input Contact__input--textarea"
              v-model="message"
              required
            ></textarea>
          </label>
          <button type="submit" class="Contact__btn btn">Contact</button>
          <div class="Contact__form-bg-spot"></div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Contact',
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
      name: '',
      email: '',
      message: '',
    };
  },
  components: {
    GrandTitle,
    Loader,
  },
  methods: {
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
  .Contact {
    background-color: #132b34;
    padding-bottom: 200px;
    padding-top: 280px;

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
      padding-top: 60px;
      position: relative;
      display: flex;
      justify-content: space-between;

      @media (max-width: 1000px) {
        padding-top: 0
      }

      @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
      }
    }

    &__info {
      padding-right: 50px;
      width: 50%;

      @media (max-width: 950px) {
        padding-right: 0;
        text-align: center;
      }
    }

    &__info-item {
      margin-bottom: 25px;
    }

    &__info-item-title {
      margin-bottom: 25px;
      font-size: 28px;
      line-height: 28px;
      color: #ccc;
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
        color: #9b9b9b;

        &:hover {
          color: #9b9b9b;
        }
      }

      svg {
        flex-shrink: 0;
      }
    }

    &__form {
      width: 550px;
      padding-bottoM: 40px;

      @media (max-width: 950px) {
        padding-top: 40px;
      }

      @media (max-width: 700px) {
        width: 100%;
      }
    }

    &__form-title {
      margin-bottom: 25px;
      font-size: 28px;
      color: #ccc;
      font-weight: 400;

      @media (max-width: 950px) {
        text-align: center;
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
      padding: 10px 50px 10px 25px;
      margin-bottom: 25px;
      border-right: none;
      font-size: 20px;
      color: #fff;

      &::placeholder {
        color: #555658;
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
