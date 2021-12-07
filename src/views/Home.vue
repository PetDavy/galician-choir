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
              <!-- <LogoOuter /> -->
              <svg width="460" height="373" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80.2838 57.184c-1.3086-.1339-3.3618 6.5728-4.1212 9.1592-5.4845 18.698-11.3397 37.3108-16.2038 56.1558-5.9759 23.143-11.1063 46.484-16.5909 69.742-.1588.679-.4549 2.032.0149 2.155 1.7852.463 17.84-29.707 23.4007-46.037 10.0673-29.568 15.7736-90.9419 13.5003-91.175ZM25.7248 222.02c-10.797-.337-15.7355-6.967-19.0312-15.208-1.3633-3.405-2.3345-6.985-3.1203-10.559C1.0386 184.701.3669 172.962.1105 161.201c-.5162-23.665.8653-47.277 2.298-70.8832 1.4113-23.258 2.935-46.5096 4.472-69.7597.2598-3.9283 2.1475-15.5006 2.6488-18.1484.5096-1.657 1.6396-2.673 3.5306-2.35 1.7935.307 2.3758 1.5924 2.399 3.2258.1224 8.8489-.0265 20.8733-.2283 29.7143-.5592 24.4677-1.3219 48.929-2.1144 73.3902-.7148 22.047-1.6776 44.09-.3011 66.14.5708 9.117 1.4195 18.22 4.1973 27.02.7876 2.495 1.8977 6.91 5.7129 10.02 2.0581 1.678 5.0328.456 5.4316-1.921 5.4746-32.526 13.3365-64.564 22.1399-96.39 4.7847-17.3011 10.0227-34.4981 15.5006-51.6132 1.7124-5.3538 4.7235-16.8237 12.5358-19.6856 5.2711-1.9327 10.16.4111 12.2463 6.2138 2.1756 6.0484 2.4619 12.3535 2.4883 18.6413.0943 22.6563-3.0607 44.9487-8.6892 66.9337-4.4836 17.514-10.6017 34.484-19.1669 50.599-5.4547 10.265-11.649 20.086-19.9428 28.561-1.3352 1.363-2.6968 2.741-4.2486 3.858-1.4593 1.05-2.1277 2.282-2.3229 3.967-2.1806 18.894-4.6937 37.754-6.5268 56.677-1.5982 16.523-1.5238 33.122-.8587 49.711.0099 3.899-.0993 6.911-.4186 10.348-.4185 4.516-3.4479 7.622-7.5824 8.126-2.6206.32-4.5663-.584-5.1188-3.024-.5444-2.402-.5956-4.864-.5543-7.324.3739-21.497.6585-43.004 2.7679-64.424 1.4179-14.38 3.2676-28.72 4.9204-43.077.1323-1.158.2481-2.314.3987-3.727M26.6529 373c-7.2912-.054-11.2602-5.277-9.3013-11.194.3904-1.178.5228-2.434.9132-3.614 1.4344-4.325 4.9717-6.398 9.6852-5.782 1.858.243 3.7838.214 5.5772.668 3.3486.847 5.7492 2.894 6.9057 6.05 1.2607 3.439-.364 6.89-3.7887 8.496-.7429.35-1.4658.87-1.9969 1.471-2.2981 2.604-5.2347 3.826-7.9944 3.905ZM125.353 106.93v42.163h-5.42V102.17h19.643v4.76h-14.223M154.713 135.15h10.984l-5.562-27.081-5.422 27.081Zm-.703 4.492-1.901 9.451h-5.071l9.435-46.923h7.958l9.434 46.923h-5.493l-1.901-9.451H154.01M192.17 106.93l-1.127 30.499c-.281 7.441-2.392 11.664-9.927 11.732h-.916v-4.76c4.578 0 5.352-2.212 5.493-6.704l1.338-35.527h20.067v46.923h-5.493V106.93h-9.435M229.486 127.308l-7.323 21.785h-5.702V102.17h4.857v34.991l5.069-14.813 7.182-20.178h6.127v46.923h-4.929v-37.336l-5.281 15.551ZM270.745 155.395v-6.302H249.27V102.17h5.422v42.164h12.11V102.17h5.563v42.298h3.731v10.927h-5.351M295.105 144.334c4.014 0 5.634-2.145 5.634-6.435v-6.233c0-4.56-1.972-6.302-6.056-6.302h-4.859v18.97h5.281Zm-.422-23.662c7.814 0 11.477 3.887 11.477 11.328v5.631c0 7.105-3.38 11.462-11.055 11.462h-10.772V102.17h5.491v18.502h4.859M323.057 128.716l-2.887 4.624v15.753h-5.491V102.17h5.491v22.657l13.097-22.657h5.562l-12.463 21.384 12.885 25.539h-5.632l-10.562-20.377ZM360.021 127.308l-7.322 21.785h-5.703V102.17h4.857v34.991l5.071-14.813 7.182-20.178h6.125v46.923h-4.929v-37.336l-5.281 15.551ZM398.816 92.5182c0 4.089-2.887 6.5698-7.605 6.5698-4.717 0-7.462-2.4808-7.602-6.5698h3.449c.21 2.547 1.83 3.418 4.153 3.418 2.324 0 4.014-.871 4.225-3.418h3.38Zm-6.338 34.3878-7.463 22.187h-5.701V102.17h4.856v34.991l4.649-13.741 7.603-21.25h6.127v46.923h-4.93v-37.336l-5.141 15.149M126.129 209.629h10.984l-5.562-27.081-5.422 27.081Zm-.705 4.492-1.901 9.452h-5.069l9.435-46.924h7.956l9.434 46.924h-5.491l-1.901-9.452h-12.463M161.473 203.194l-2.887 4.625v15.754h-5.491v-46.924h5.491v22.658l13.097-22.658h5.562l-12.463 21.384 12.887 25.54h-5.634l-10.562-20.379M191.678 209.629h10.983l-5.561-27.081-5.422 27.081Zm-.704 4.492-1.901 9.452h-5.07l9.434-46.924h7.958l9.434 46.924h-5.491l-1.901-9.452h-12.463M228.22 212.043c-.211 3.352-.704 5.364-2.253 6.904h13.026v-37.538h-9.153l-1.62 30.634Zm14.715 17.966v-6.436h-20.136v6.436h-5.281v-11.062h3.168c1.689-1.81 2.042-3.955 2.182-6.837l1.901-35.461h19.786v42.298h3.732v11.062h-5.352ZM274.127 197.43v4.692h-12.041v16.691h14.785v4.76h-20.277v-46.924h20.277v4.76h-14.785v16.021h12.041M303.626 223.505h-5.281l-8.167-37.336v37.404h-4.789v-46.924h7.676l8.097 37.472 7.814-37.472h7.675v46.924h-5.21v-37.739l-7.815 37.671M331.295 176.649v46.924h-5.491v-46.924h5.491ZM357.558 202.793c-1.761 2.413-4.719 3.686-7.675 3.686-6.618 0-9.786-4.827-9.786-11.127v-18.703h5.491v18.3c0 3.956 2.182 6.771 6.055 6.771 3.309 0 5.352-1.945 5.915-5.497v-19.574h5.421v46.924h-5.421v-20.78ZM377.692 202.456v21.117h-5.491v-46.924h5.491v21.116h12.113v-21.116h5.491v46.924h-5.491v-21.117h-12.113ZM417.474 201.788l-7.323 21.785h-5.704v-46.924h4.859v34.991l5.069-14.814 7.182-20.177h6.125v46.924h-4.927v-37.338l-5.281 15.553M456.269 166.997c0 4.089-2.888 6.57-7.604 6.57-4.718 0-7.463-2.481-7.605-6.57h3.451c.21 2.547 1.83 3.418 4.154 3.418 2.323 0 4.014-.871 4.224-3.418h3.38Zm-6.338 34.388-7.462 22.188h-5.704v-46.924h4.857v34.991l4.649-13.741 7.603-21.25H460v46.924h-4.929v-37.338l-5.14 15.15ZM128.242 277.673l-2.889 4.626v15.753h-5.491V251.13h5.491v22.657l13.097-22.657h5.562l-12.461 21.383 12.884 25.539h-5.633l-10.56-20.379M158.445 284.108h10.984l-5.562-27.081-5.422 27.081Zm-.703 4.492-1.901 9.452h-5.069l9.434-46.922h7.956l9.435 46.922h-5.491l-1.901-9.452h-12.463M203.577 297.986h-5.281l-8.166-37.338v37.404h-4.79V251.13h7.675l8.097 37.47 7.816-37.47h7.675v46.922h-5.21v-37.74l-7.816 37.674M243.288 271.908v4.694h-12.042v16.69h14.786v4.76h-20.277V251.13h20.277v4.758h-14.786v16.02h12.042M264.973 274.857c4.081 0 6.053-1.808 6.053-6.3v-6.233c0-4.289-1.619-6.436-5.633-6.436h-5.28v18.969h4.86Zm.42-23.727c7.746 0 11.055 4.355 11.055 11.462v5.629c0 7.442-3.661 11.33-11.475 11.33h-4.86v18.501h-5.491V251.13h10.771ZM289.755 276.936v21.116h-5.493V251.13h5.493v21.114h12.109V251.13h5.492v46.922h-5.492v-21.116h-12.109M329.534 276.267l-7.322 21.785h-5.703V251.13h4.857v34.99l5.07-14.815 7.182-20.175h6.126v46.922h-4.93v-37.336l-5.28 15.551M368.328 241.476c0 4.09-2.887 6.571-7.602 6.571-4.719 0-7.465-2.481-7.606-6.571h3.45c.212 2.548 1.831 3.419 4.156 3.419 2.321 0 4.01-.871 4.222-3.419h3.38Zm-6.336 34.389-7.465 22.187h-5.702V251.13h4.86v34.99l4.645-13.742 7.606-21.248h6.125v46.922h-4.927v-37.336l-5.142 15.149M132.113 352.287l-8.238 20.244h-5.209l9.926-24.199-9.293-22.724h5.703l7.604 18.769 7.675-18.769h5.139l-9.224 22.724 9.859 24.199h-5.774l-8.168-20.244ZM159.01 361.472c0 4.289 1.901 6.768 5.843 6.768 4.014 0 5.844-2.479 5.844-6.768v-24.803c0-4.223-1.83-6.77-5.844-6.77-3.942 0-5.843 2.547-5.843 6.77v24.803Zm-5.422-24.537c0-7.17 3.731-11.796 11.265-11.796 7.604 0 11.336 4.626 11.336 11.796v24.267c0 7.104-3.732 11.798-11.336 11.798-7.534 0-11.265-4.694-11.265-11.798v-24.267ZM195.269 349.337c4.083 0 6.055-1.81 6.055-6.302v-6.232c0-4.289-1.62-6.435-5.633-6.435h-5.281v18.969h4.859Zm.422-23.729c7.744 0 11.055 4.357 11.055 11.462v5.633c0 7.439-3.662 11.326-11.477 11.326h-4.859v18.502h-5.492v-46.923h10.773" fill="#fff"/></svg>
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
      <!-- <GrandTitle :titleText="titles[locale].cooperations" align="left:35"/> -->
      <div class="cooperations__container side-indent">
        <h2 class="cooperations__title">
          {{lines[locale]['coop-header']}}
        </h2>
        <p class="cooperations__sub-title">
          Proin gravida nibh vel velitt. Aenean sollicitudtin lorem quis
        </p>
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
// import LogoCenter from '@/assets/icons/logo-center.svg?inline';
// import LogoOuter from '@/assets/icons/logo-outer.svg?inline';
// import Logo from '@/assets/icons/logo.svg?inline';

// import GrandTitle from '@/components/GrandTitle.vue';
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
    // GrandTitle,

    ScrollParallax,
    // Logo,
    // LogoCenter,
    // LogoOuter,
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
      max-width: 50%;

      &--shown {
        .showcase__logo,
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

    &__logo {
      max-width: 680px;
      margin-bottom: 40px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;
      font-size: 78px;
      line-height: 70px;
      letter-spacing: 2px;
      transform: translateY(100px);
      opacity: 0;
      transition: transform .7s ease-out, opacity .7s ease-out;
      transition-delay: 1.1s;

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
      text-transform: uppercase;
    }

    &__title {
      font-size: 56px;
      line-height: 50px;
      max-width: 450px;
      margin-bottom: 15px;
      font-family: 'Neuton', 'Rubik', Arial, Helvetica, sans-serif;

      @media (max-width: 550px) {
        font-size: 38px;
        line-height: 35px;
      }

      &--ua {
        font-weight: 400;
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
      font-size: 19px;
      color: #666;
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
