<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
    <ScrollParallax>
      <section class="Home__showcase showcase">
        <div class="showcase__bg" :class="{'showcase__bg--zoomed': isShowcaseSet}"></div>
        <div class="showcase__overlay"></div>
        <div class="showcase__container side-indent">
          <div class="showcase__left" :class="{'showcase__left--shown': isShowcaseSet}" v-if="homeData[locale]">
            <h1 class="showcase__title" :class="{'showcase__title--ua': locale === 'ua'}">
              {{homeData[locale].title}}
            </h1>
            <p class="showcase__text" :class="{'showcase__text--ua': locale === 'ua'}">
              {{homeData[locale]['sub-title']}}
            </p>
            <router-link to="/about" class="showcase__btn btn">view more</router-link>
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
            <p class="events__up-title">OUR LATEST EVENT</p>
            <h3
              class="events__title"
              :class="{'events__title--ua': locale === 'ua'}"
            >
              {{latestEvent.title ?? ''}}
            </h3>
            <p class="events__sub-title">Get started on latest episodes</p>
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
            <router-link to="/events" class="events__block-right-link btn">All Events</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="Home__badges badges">
      <GrandTitle titleText="badges" align="left:35"/>
      <div class="badges__container side-indent">
        <h2 class="badges__title">
          our awards and badges
        </h2>
        <p class="badges__sub-title">
          Proin gravida nibh vel velitt. Aenean sollicitudtin lorem quis
        </p>
        <ul class="badges__list">
          <li class="badges__list-item">
            <div class="badges__icon-wrapper">
              <BadgeIcon1 class="badges__icon" />
            </div>
            <p class="badges__list-item-title">
              some award
            </p>
            <p class="badges__list-item-sub-title">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </li>
          <li class="badges__list-item">
            <div class="badges__icon-wrapper">
              <BadgeIcon2 class="badges__icon" />
            </div>
            <p class="badges__list-item-title">
              some award
            </p>
            <p class="badges__list-item-sub-title">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </li>
          <li class="badges__list-item">
            <div class="badges__icon-wrapper">
              <BadgeIcon3 class="badges__icon" />
            </div>
            <p class="badges__list-item-title">
              some award
            </p>
            <p class="badges__list-item-sub-title">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </li>
          <li class="badges__list-item">
            <div class="badges__icon-wrapper">
              <BadgeIcon4 class="badges__icon" />
            </div>
            <p class="badges__list-item-title">
              some award
            </p>
            <p class="badges__list-item-sub-title">
              Lorem ipsum dolor sit amet consectetur.
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
import GrandTitle from '@/components/GrandTitle.vue';
import ArrowRight from '@/components/ArrowRight.vue';
import BadgeIcon1 from '@/assets/icons/badge-icon-1.svg?inline';
import BadgeIcon2 from '@/assets/icons/badge-icon-2.svg?inline';
import BadgeIcon3 from '@/assets/icons/badge-icon-3.svg?inline';
import BadgeIcon4 from '@/assets/icons/badge-icon-4.svg?inline';

export default {
  name: 'Home',
  data() {
    return {
      isShowcaseSet: false,
      isLoaderVisible: true,
      isLoaderRemoved: false,
      isInfoOpen: false,
    };
  },
  components: {
    Loader,
    ArrowRight,
    GrandTitle,
    // icons
    BadgeIcon1,
    BadgeIcon2,
    BadgeIcon3,
    BadgeIcon4,
    ScrollParallax,
  },
  computed: {
    ...mapGetters(['db', 'events', 'homeData', 'locale']),
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
  },
  methods: {
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
  },
  watch: {
    homeData(data) {
      console.log(data);
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
      background-image: url(https://uh.edu/kgmca/music/ensembles/choirs/auditionfooter.jpeg);
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
      align-items: center;
      z-index: 3;

      @media (max-width: 700px) {
        margin-bottom: 50px;
      }
    }

    &__left {
      margin-right: 20px;
      max-width: 50%;

      &--shown {
        .showcase__title,
        .showcase__text,
        .showcase__btn {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @media (max-width: 960px) {
        max-width: 100%;
        width: 100%;
        text-align: center;
      }
    }

    &__title {
      max-width: 680px;
      margin-bottom: 40px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;
      font-size: 74px;
      line-height: 70px;
      letter-spacing: 1.5px;
      // font-style: italic;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.1s;

      &--ua {
        font-family: 'Spectral', serif;
        font-size: 64px;
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
      width: 70%;
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
      width: 30%;
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
        width: calc(100% - 350px);

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
      width: 270px;
      height: 270px;
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
    }

    &__preview {
      width: 260px;
      padding-top: 260px;
      background-color: #ccc;
      background-repeat: none;
      background-size: cover;
      background-position: center;

      @media (max-width: 1200px) {
        margin-bottom: 1px;
        width: 340px;
        height: 340px;
      }
    }

    &__title-text {
      padding-right: 45px;
      transition: opacity .3s, transform .5s;
    }

    &__up-title {
      margin-bottom: 10px;
    }

    &__title {
      font-size: 56px;
      line-height: 50px;
      max-width: 450px;
      margin-bottom: 15px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;
      // font-style: italic;

      @media (max-width: 550px) {
        font-size: 38px;
        line-height: 35px;
      }

      &--right {
        color: #fff;
        font-size: 40px;

        @media (max-width: 1200px) and (min-width: 949px) {
          display: none;
        }

        @media (max-width: 950px) {
          padding-top: 25px;
        }

        @media (max-width: 780px) {
          text-align: center;
        }
      }
    }

    &__description-wrapper {
      max-height: 200px;
      position: relative;
      overflow-y: auto;

      @media (max-width: 1200px) {
        max-height: 415px;
      }

      @media (max-width: 950px) {
        max-height: 220px;
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
      font-size: 20px;
    }
  }

  .badges {
    position: relative;
    padding: 180px 0 150px;

    .Grand-title {
      top: 40px;
    }

    &__title {
      margin-bottom: 20px;
      font-size: 45px;
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 1px;

      &--ua {
        font-family: 'IBM Plex Serif', serif;
      }
    }

    &__sub-title {
      margin-bottom: 55px;
      font-size: 19px;
      color: #7e7f7f;
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
      flex-direction: column;
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
      min-height: 150px;
      display: inline-flex;
      align-items: center;
      margin-bottom: 40px;
    }

    &__icon {
      // margin: auto;
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
