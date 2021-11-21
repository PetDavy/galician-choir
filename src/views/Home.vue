<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
    <ScrollParallax>
      <section class="Home__showcase showcase">
        <div class="showcase__bg" :class="{'showcase__bg--zoomed': isShowcaseSet}"></div>
        <div class="showcase__overlay"></div>
        <div class="showcase__container side-indent">
          <div class="showcase__left" :class="{'showcase__left--shown': isShowcaseSet}">
            <h1 class="showcase__title">
              A Case for Becoming More Gentle in Your Life
            </h1>
            <p class="showcase__text">
              Lorem ipsum dolor sit amet,consectetur adipisicing elit. Aperiam doloremque quibusdam officiis sunt quasi. Voluptatibus inventore magnam atque.
            </p>
            <router-link to="/about" class="showcase__btn btn">view more</router-link>
          </div>
        </div>
      </section>
    </ScrollParallax>
    <section class="Home__events events">
      <div class="events__container side-indent">
        <div class="events__block events__block-left">
          <div class="events__preview-wrapper">
            <div class="events__preview" :style="{backgroundImage: `url(${latestEvent.img ?? ''})`}"></div>
          </div>
          <div class="events__title-text">
            <p class="events__up-title">OUR LATEST EVENT</p>
            <h3 class="events__title">{{latestEvent.title ?? ''}}</h3>
            <p class="events__sub-title">Get started on latest episodes</p>
          </div>
        </div>
        <div class="events__block events__block-right">
          <ArrowRight />
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
    ...mapGetters(['db', 'events']),
    latestEvent() {
      let currLatest = null;

      this.events.forEach((event) => {
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

  .Home {
    &__showcase {
      color: #fff;
      height: 100vh;
      background-color: #000;
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
    }

    &__left {
      margin-right: 20px;

      &--shown {
        .showcase__title,
        .showcase__text,
        .showcase__btn {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }

    &__title {
      max-width: 680px;
      margin-bottom: 40px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;
      font-size: 70px;
      line-height: 70px;
      letter-spacing: 1.5px;
      font-style: italic;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.1s;
    }

    &__text {
      color: #ccc;
      max-width: 680px;
      margin-bottom: 40px;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.3s;
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

    &__container {
      width: 100%;
      display: flex;
    }

    &__block {
      padding: 60px 0;
    }

    &__block-left {
      position: relative;
      display: flex;
      align-items: center;
      flex: 4 0;
      background-color: #f8f1e7;
      color: #000;

      &::before {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        right: 100%;
        width: 5000px;
        background-color: #f8f1e7;
      }
    }

    &__block-right {
      flex: 1 0;
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 100px;
      padding-right: 40px;
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
    }

    &__preview {
      width: 260px;
      padding-top: 260px;
      background-color: #ccc;
      background-repeat: none;
      background-size: cover;
      background-position: center;
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
      font-style: italic;
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
    }

    &__list-item {
      width: 25%;
      flex-basis: 25%;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      color: #2f2f2f;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
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
