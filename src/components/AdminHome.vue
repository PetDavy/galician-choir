<template>
  <div class="AdminHome">
    <div class="AdminHome__header">
      <h2 class="AdminHome__title">Home Page</h2>
      <div class="AdminHome__locales">
        <div
          class="AdminHome__locales-btn"
          :class="{'AdminHome__locales-btn--active': localeItem === activeLocale}"
          v-for="localeItem in localesList"
          :key="localeItem"
          @click="activeLocale = localeItem"
        >
          {{localeItem}}
        </div>
      </div>
    </div>
    <!-- SHOWCASE -->
    <div class="AdminHome__showcase" v-if="homeFields[activeLocale]">
      <label for="home-title" class="AdminHome__label">
        <span class="AdminHome__input-name">Main Title</span>
        <input
          type="text"
          id="home-title"
          class="AdminHome__input"
          v-model="homeFields[activeLocale].title"
        >
        <button class="AdminHome__save-btn">save</button>
      </label>
      <label for="home-sub-title" class="AdminHome__label">
        <span class="AdminHome__input-name">Sub Title</span>
        <textarea
          type="text"
          id="home-sub-title"
          cols="30"
          rows="5"
          class="AdminHome__input AdminHome__input--textarea"
          v-model="homeFields[activeLocale]['sub-title']"
        ></textarea>
        <button class="AdminHome__save-btn">save</button>
      </label>
    </div>
    <!-- COOPERATIONS -->
    <div class="AdminHome__cooperations">
      <div
        class="AdminHome__cooperation Cooperation"
        v-for="cooperation in cooperationsList"
        :key="cooperation.id"
      >
        <div class="Cooperation__image-wrapper" :class="{'Cooperation__image-wrapper--svg': cooperation.svg}">
          <img
            class="Cooperation__image"
            :src="block.img"
            :alt="block.title"
            v-if="cooperation.img"
          >
          <svg
            class="Cooperation__image-svg"
            v-html="cooperation.svg"
            v-if="true"
          ></svg>
        </div>
        <div class="Cooperation__info">
          <div class="Cooperation__info-top">
            <div class="Cooperation__info-top-left">
              <div class="Cooperation__title">
                {{cooperation.title}}
              </div>
            </div>
            <div class="Cooperation__tools">
              <div class="Cooperation__tools-btn" @click="updateBlockData = aboutBlocks.find((currBlock) => currBlock.id === block.id)">
                <svg class="Cooperation__update" width="28" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.9 5.46 7 7.5-15.2 16.3-6.24.73c-.84.1-1.55-.66-1.45-1.55l.7-6.7L15.9 5.47Zm11.33-1.11L23.94.82a2.5 2.5 0 0 0-3.71 0l-3.1 3.32 7 7.5 3.1-3.31a2.96 2.96 0 0 0 0-3.98Z" fill="#AE1414"/></svg>
              </div>
              <div class="Cooperation__tools-btn" @click="openQuestionPopup(block)">
                <svg class="Cooperation__remove" width="23" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.64 27.19c0 .74.26 1.46.72 1.99.47.52 1.1.82 1.75.82h14.78c.66 0 1.28-.3 1.75-.82.46-.53.72-1.25.72-2V7.5H1.64v19.69Zm13.97-15a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2ZM22.18 1.87h-6.16l-.48-1.1c-.1-.23-.26-.42-.46-.56-.2-.14-.42-.21-.65-.21H8.56c-.23 0-.45.07-.64.2-.2.15-.35.34-.46.58l-.48 1.1H.82c-.22 0-.43.1-.58.27A1 1 0 0 0 0 2.8V4.7a1 1 0 0 0 .24.66c.15.18.36.27.58.27h21.36c.22 0 .43-.1.58-.27a1 1 0 0 0 .24-.66V2.8a1 1 0 0 0-.24-.66.77.77 0 0 0-.58-.28Z" fill="#AE1414"/></svg>
              </div>
            </div>
          </div>
          <div class="Cooperation__text">
            {{cooperation.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const defaultFields = {
  title: '',
  'sub-title': '',
};

export default {
  name: 'AdminHome',
  data() {
    return {
      homeFields: {
        ua: { ...defaultFields },
        en: { ...defaultFields },
      },
      cooperationsData: [],
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['homeData', 'cooperations', 'locale']),
    cooperationsList() {
      const formatedCooperations = this.cooperationsData.map((cooperation) => ({
        id: cooperation.id,
        img: cooperation.img,
        svg: cooperation.svg,
        orderId: cooperation.orderId,
        ...cooperation[this.locale],
      }));

      return formatedCooperations.sort((coopA, coopB) => coopA.orderId - coopB.orderId);
    },
  },
  methods: {
    setHomeData() {
      this.homeFields = {
        ua: this.homeData.ua,
        en: this.homeData.en,
      };
    },
    setCooperationsData() {
      this.cooperationsData = this.cooperations;
    },
  },
  mounted() {
    this.setHomeData();
    console.log(this.cooperations[0].ua);
    this.setCooperationsData();
  },
};
</script>

<style lang="scss" scoped>
  .AdminHome {
    &__title {
      font-size: 30px;
      margin-bottom: 25px;
      margin-right: 25px;
      color: #fff;
    }

    &__header {
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__locales {
      display: flex;
      align-items: center;
    }

    &__locales-btn {
      margin: 0 5px;
      padding: 5px 8px;
      border: 1px solid #ccc;
      color: #fff;
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;

      &--active {
        background-color: #fff;
        color: #000;
      }
    }

    &__showcase {
      margin-bottom: 40px;
    }

    &__label {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    &__input-name {
      display: block;
      width: 100%;
      font-size: 15px;
      color: #ccc;
      margin-bottom: 5px;
    }

    &__input {
      border: none;
      border-bottom: 1px solid #ccc;
      height: 50px;
      padding: 0 20px 0 10px;
      background-color: transparent;
      margin-right: 10px;
      width: 50%;
      font-size: 28px;
      line-height: 22px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #000;

      &:focus {
        outline: none;
      }

      &--textarea {
        min-height: 80px;
        height: initial;
        resize: vertical;
        line-height: 28px;
      }
    }

    &__save-btn {
      height: 50px;
      border: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
      min-width: 120px;
      border-radius: 3px;
      cursor: pointer;
    }

    &__cooperation {
      display: flex;
      margin-bottom: 30px;
      padding: 20px;
      width: 100%;
      background-color: #d2dfe0;
    }
  }

  .Cooperation {
    &__image-wrapper {
      position: relative;
      width: 300px;
      padding-top: 250px;
      margin-right: 30px;
      flex-shrink: 0;
      overflow: hidden;

      &--svg {
        padding-top: 0;
      }
    }

    &__image {
      position: absolute;
      top: 0;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }

    &__info {
      width: calc(100% - 330px);
      display: flex;
      flex-direction: column;
    }

    &__info-top {
      display: flex;
    }

    &__info-top-left {
      width: 50%;
    }

    &__tools {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      width: 50%;
      padding-left: 40px;

    }

    &__tools-btn {
      margin-left: 15px;
      cursor: pointer;
    }

    &__title,
    &__text {
      position: relative;
      padding-right: 20px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
    }

    &__text {
      font-weight: 500;
    }
  }
</style>
