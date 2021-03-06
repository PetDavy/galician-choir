<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
    <ScrollParallax>
      <section class="Home__showcase showcase">
        <div
          class="showcase__bg"
          :class="{'showcase__bg--zoomed': isShowcaseSet}"
          :style="{backgroundImage: `url('${homeData.img ?? ''}')`}"
        />
        <div class="showcase__overlay"></div>
        <div class="showcase__container side-indent">
          <div class="showcase__center" :class="{'showcase__center--shown': isShowcaseSet}" v-if="homeData[locale]">
            <div class="showcase__logo" :class="{'showcase__logo--ua': locale === 'ua'}">
              <Logo class="showcase__logo--fullwidth" />
              <LogoMobile class="showcase__logo--mobile" />
              <div class="showcase__hidden-name">Галицький академічний камерний хор</div>
            </div>
          </div>
        </div>
      </section>
    </ScrollParallax>
    <section class="Home__events events">
      <div class="events__container side-indent">
        <div
          class="events__block events__block-left"
          :class="{'events__block-left--closed': isInfoOpen}"
        >
          <div class="events__preview-wrapper">
            <div class="events__preview" :style="{backgroundImage: `url(${latestEvent.img ?? ''})`}"></div>
          </div>
          <div class="events__title-text">
            <p class="events__up-title">
              {{isComingEvent ? lines[locale]['coming-event'] : lines[locale]['last-event']}}
              </p>
            <h3
              class="events__title"
              :class="{'events__title--ua': locale === 'ua'}"
            >
              {{latestEvent.title ?? ''}}
            </h3>
            <p class="events__sub-title" v-if="latestEvent.time">
              {{(formatDate(latestEvent.time.toDate())).date}}&nbsp;
              <strong>{{(formatDate(latestEvent.time.toDate())).time}}</strong>
            </p>
          </div>
        </div>
        <div
          class="events__block events__block-right"
          :class="{'events__block-right--open': isInfoOpen}"
        >
          <ArrowRight @click="isInfoOpen = !isInfoOpen" :isOpen="isInfoOpen" />
          <div
            class="events__block-right-description"
            :class="{'events__block-right-description--open': isInfoOpen}"
          >
            <h3 class="events__title events__title--right">{{latestEvent.title ?? ''}}</h3>
            <div class="events__description-wrapper">
              <p class="events__description">{{latestEvent.text ?? ''}}</p>
            </div>
            <router-link to="/events" class="events__block-right-link btn">{{buttons[locale]['all-events']}}</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="Home__cooperations cooperations">
      <div class="cooperations__container side-indent">
        <h2 class="cooperations__title">
          {{lines[locale]['coop-header']}}
        </h2>
        <ul class="cooperations__list">
          <li
            class="cooperations__list-item"
            v-for="cooperation in cooperationsList"
            :key="cooperation.id"
          >
            <div class="cooperations__icon-wrapper">
              <img
                class="cooperations__icon-img"
                :src="cooperation.img"
                :alt="cooperation.title"
                v-if="cooperation.img"
              >
              <svg
                class="cooperations__icon"
                v-html="cooperation.svg"
                v-if="cooperation.svg"
              />
            </div>
            <p class="cooperations__list-item-title">
              {{cooperation.title}}
            </p>
            <p class="cooperations__list-item-sub-title">
              {{cooperation.text}}
            </p>
          </li>
        </ul>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollParallax from 'vue3-parallax/src/components/ScrollParallax.vue';
import Loader from '@/components/Loader.vue';
import Logo from '@/assets/icons/logo.svg?inline';
import LogoMobile from '@/assets/icons/logoMobile.svg?inline';

import ArrowRight from '@/components/ArrowRight.vue';
import formatters from '../utils/formatters';
import titles from '@/assets/texts/titles.json';
import buttons from '@/assets/texts/buttons.json';
import lines from '@/assets/texts/lines.json';

export default {
  name: 'Home',
  data() {
    return {
      isShowcaseSet: false,
      isLoaderVisible: true,
      isLoaderRemoved: false,
      isInfoOpen: false,
      titles,
      buttons,
      lines,
      formatters,
    };
  },
  components: {
    Loader,
    ArrowRight,

    ScrollParallax,
    Logo,
    LogoMobile,
  },
  computed: {
    ...mapGetters(['db', 'events', 'homeData', 'cooperations', 'locale']),
    latestEvent() {
      const formatedEvents = this.events.map((event) => ({
        id: event.id,
        ...event[this.locale],
      }));
      let currLatest = null;

      formatedEvents.forEach((event) => {
        if (!currLatest) {
          currLatest = event;
        } else if (currLatest.time.toDate() < event.time.toDate()) {
          currLatest = event;
        }
      });

      return currLatest ?? {};
    },
    isComingEvent() {
      if (!this.latestEvent.time) {
        return false;
      }

      return this.latestEvent.time.toDate() > new Date().getTime();
    },
    cooperationsList() {
      const formatedCooperations = this.cooperations.map((cooperation) => ({
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
    formatDate: formatters.formatDate,
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
  },
  mounted() {
    setTimeout(() => {
      setTimeout(() => {
        this.isLoaderVisible = false;
        this.isShowcaseSet = true;
        this.removeLoader();
      });
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Neuton:wght@200&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,300&family=Spectral:wght@300&display=swap');

  .Home {
    &__showcase {
      color: #fff;
      height: 100vh;
      background-color: #000;

      @media (max-height: 500px) {
        height: auto;
        padding-top: 100px;
        padding-bottom: 100px;
      }
    }
  }

  .showcase {
    position: relative;
    overflow: hidden;

    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: transform 0.7s ease-out;
      transition-delay: 0.5s;

      &--zoomed {
        transform: scale(1.1);
      }
    }

    &__overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.6;
      z-index: 2;
    }

    &__container {
      position: relative;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      z-index: 3;

      @media (max-width: 700px) {
        margin-bottom: 50px;
      }
    }

    &__center {
      &--shown {
        .showcase__logo,
        .showcase__text,
        .showcase__btn {
          transform: translateY(0) scale(0.7);
          opacity: 1;
        }
      }

      @media (max-width: 960px) {
        width: fit-content;
        text-align: center;
      }

      @media (max-width: 850px) {
        transform: scale(0.7);
      }

      @media (max-width: 400px) {
        transform: translateX(-20px) scale(0.5);
      }

      @media (max-width: 500px) {
        transform: scale(0.5);
      }
    }

    &__hidden-name {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    &__logo {
      margin-bottom: 40px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;
      font-size: 78px;
      line-height: 70px;
      letter-spacing: 2px;
      transform: translateY(100px) scale(0.7);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.1s;

      &--fullwidth {
        @media (max-width: 700px) {
          display: none;
        }
      }

      &--mobile {
        display: none;

        @media (max-width: 700px) {
          display: block;
          transform: scale(1.5);
        }

        @media (max-width: 500px) {
          transform: scale(1);
        }
      }

      &--ua {
        font-family: 'Spectral', serif;
        font-size: 66px;
        line-height: 60px;
        letter-spacing: 1px;
      }

      @media (max-width: 960px) {
        margin-left: auto;
        margin-right: auto;
      }

      @media (max-width: 700px) {
        font-size: 40px;
        line-height: 38px;
      }
    }

    &__text {
      color: #ccc;
      max-width: 680px;
      margin-bottom: 40px;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.3s;

      &--ua {
        // font-family: 'IBM Plex Serif', serif;
      }

      @media (max-width: 960px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    &__btn {
      position: relative;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.5s;

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

  .events {
    position: relative;
    display: flex;
    background-color: #0b0e13;
    overflow: hidden;

    &__container {
      position: relative;
      width: 100%;
      display: flex;

      @media (max-width: 780px) {
        flex-direction: column;
      }
    }

    &__block {
      padding: 60px 0;
    }

    &__block-left {
      position: relative;
      display: flex;
      align-items: center;
      width: 80%;
      background-color: #f8f1e7;
      color: #000;
      transition: text-align 0.3s;

      @media (max-width: 1200px) {
        flex-direction: column;
        align-items: flex-start;
      }

      @media (max-width: 780px) {
        width: 110%;
        margin-right: 0;
        align-items: center;
        text-align: center;
      }

      &::before {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        right: 100%;
        width: 5000px;
        background-color: #f8f1e7;
      }

      &--closed {
        .events__title-text {
          @media (min-width: 1199px) {
            opacity: 0;
            transform: translateX(50%);
          }

          @media (max-width: 950px) {
            display: none;
          }
        }
      }
    }

    &__block-right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 20%;
      display: flex;
      align-items: flex-start;
      height: 100%;
      padding: 70px 40px 80px 100px;
      background-color: #0b0e13;
      transition: width 0.4s ease-in;

      @media (max-width: 1200px) {
        width: 45%;
      }

      @media (max-width: 780px) {
        position: relative;
        width: 100%;
        justify-content: center;
        padding: 40px;
      }

      &--open {
        width: calc(100% - 380px);

        @media (max-width: 1200px) {
          width: calc(100% - 450px);
        }

        @media (max-width: 950px) {
          width: 100%;
        }
      }
    }

    &__block-right-link {
      position: absolute;
      bottom: 30px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background-color: #f8f1e7;

      @media (max-width: 1200px) {
        bottom: 55px;
      }

      @media (max-width: 950px) {
        position: relative;
        margin-top: 20px;
        bottom: initial;
      }

      @media (max-width: 480px) {
        width: 100%;
      }

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

    &__block-right-description {
      opacity: 0;
      transition: opacity .3s, transform .3s;

      @media (max-width: 780px) {
        height: 0;
        text-align: center;
      }

      &--open {
        transition-delay: 0.3s;
        opacity: 1;

        @media (max-width: 780px) {
          height: auto;
        }
      }
    }

    &__preview-wrapper {
      width: 310px;
      height: 310px;
      margin-right: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;

      @media (max-width: 1200px) {
        margin-bottom: 10px;
        width: 350px;
        height: 350px;
      }

      @media (max-width: 450px) {
        width: 310px;
        height: 310px;
      }
    }

    &__preview {
      width: 300px;
      padding-top: 300px;
      background-color: #ccc;
      background-repeat: none;
      background-size: cover;
      background-position: center;

      @media (max-width: 1200px) {
        margin-bottom: 1px;
        width: 340px;
        height: 340px;
      }

      @media (max-width: 450px) {
        width: 300px;
        height: 300px;
      }
    }

    &__title-text {
      padding-right: 45px;
      transition: opacity .3s, transform .5s;
    }

    &__up-title {
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    &__title {
      font-size: 56px;
      line-height: 50px;
      margin-bottom: 20px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;

      @media (max-width: 1200px) {
        max-width: 395px;
      }

      @media (max-width: 550px) {
        font-size: 38px;
        line-height: 35px;
      }

      &--ua {
        margin-bottom: 16px;
        font-weight: 400;
        font-size: 44px;
        line-height: 44px;

        @media (max-width: 550px) {
          font-size: 40px;
          line-height: 40px;
        }
      }

      &--right {
        color: #fff;
        font-size: 40px;
        max-width: 100%;

        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        max-height: 100px;
        overflow: hidden;
        position: relative;
        text-overflow: clip;
        white-space: normal;
        word-break: break-word;

        @media (max-width: 1200px) and (min-width: 949px) {
          display: none;
        }

        @media (max-width: 950px) {
          padding-top: 25px;
          max-height: 130px;
        }

        @media (max-width: 780px) {
          text-align: center;
        }
      }
    }

    &__description-wrapper {
      max-height: 162px;
      position: relative;
      overflow-y: auto;

      @media (max-width: 1200px) {
        max-height: 415px;
      }

      @media (max-width: 950px) {
        max-height: 230px;
      }

      &::-webkit-scrollbar {
        width: 5px;
        background-color: hsl(0, 0%, 90%);
      }

      &::-webkit-scrollbar-thumb {
        height: 24px;
        background-color: hsl(0, 0%, 70%);
      }
    }

    &__description {
      color: #fff;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 1px;

        @media (max-width: 1200px) {
          font-size: 19px;
          line-height: 23px;
        }

        @media (max-width: 950px) {
          padding-top: 0;
        }
    }

    &__sub-title {
      font-size: 19px;
    }
  }

  .cooperations {
    position: relative;
    padding: 150px 0 150px;

    @media (max-width: 700px) {
      padding: 100px 0 100px;
    }

    .Grand-title {
      top: 80px;
    }

    &__title {
      margin-bottom: 20px;
      font-size: 45px;
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 1px;
      text-align: center;

      &--ua {
        font-family: 'IBM Plex Serif', serif;
      }

      @media (max-width: 700px) {
        font-size: 35px;
      }

      @media (max-width: 360px) {
        font-size: 30px;
      }
    }

    &__sub-title {
      margin-bottom: 70px;
      font-size: 19px;
      color: #7e7f7f;
      text-align: center;

      @media (max-width: 700px) {
        margin-bottom: 40px;
      }
    }

    &__list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      @media (max-width: 1080px) {
        flex-wrap: wrap;
      }
    }

    &__list-item {
      width: 25%;
      flex-basis: 25%;
      padding: 20px 30px;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: #2f2f2f;

      @media (max-width: 1080px) {
        width: 270px;
      }

      @media (max-width: 750px) {
        text-align: center;
      }

      &:first-child {
        padding-left: 0;

        @media (max-width: 1080px) {
          padding-left: 30px;
        }
      }

      &:last-child {
        padding-right: 0;

        @media (max-width: 1080px) {
          padding-right: 30px;
        }
      }

      @media (max-width: 1080px) {
        width: 300px;
      }

    }

    &__icon-wrapper {
      position: relative;
      max-height: 150px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      margin-bottom: 40px;
      max-width: 270px;
      overflow: hidden;
    }

    &__icon-img {
      object-fit: contain;
      object-position: center;
      height: 100%;
    }

    &__list-item-title {
      margin-bottom: 25px;
      font-size: 22px;
      text-transform: uppercase;
    }

    &__list-item-sub-title {
      color: #7e7e7e;
      font-size: 16px;
    }
  }
</style>
