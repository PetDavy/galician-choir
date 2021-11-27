<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <div class="Events">
    <div class="Events__content side-indent side-indent--full-width">
      <GrandTitle titleText="events" align="left:35" v-if="isLoaderRemoved" />
      <h1 class="Events__title">
        Future events
      </h1>
      <div
        class="Events__event event"
        v-for="event in eventsList"
        :key="event.id"
      >
        <div class="event__content">
          <div class="event__header">
            <div class="event__date">
              {{(formatDate(event.time.toDate())).date}}
              <span class="event__date--time">
                {{(formatDate(event.time.toDate())).time}}
              </span>
            </div>
          </div>
          <h2 class="event__title">{{event.title}}</h2>
          <div class="event__description">
            {{event.text}}
          </div>
          <a :href="event.link" target="_blank" class="event__btn btn">view more</a>
        </div>
        <div class="event__preview-wrapper">
          <img :src="event.img" :alt="event.title" class="event__preview">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import formatters from '../utils/formatters';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Events',
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
    };
  },
  components: {
    GrandTitle,
    Loader,
  },
  computed: {
    ...mapGetters(['db', 'events', 'locale']),

    eventsList() {
      const formatedEvents = this.events.map((event) => ({
        id: event.id,
        ...event[this.locale],
      }));

      return formatedEvents.sort((eventA, eventB) => (
        eventB.time - eventA.time // newest first
      ));
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
      this.isLoaderVisible = false;
      this.removeLoader();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.Events {
  position: relative;
  padding: 210px 0 60px;
  background: #132b34;

  &__content {
    position: relative;

    @media (max-width: 700px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .Grand-title {
    top: -90px;
  }

  &__title {
    position: relative;
    width: fit-content;
    padding-bottom: 8px;
    margin-bottom: 40px;
    margin-left: auto;
    color: #fff;
    font-size: 28px;
    font-weight: 500;

    &::before {
      position: absolute;
      content: '';
      bottom: 0;
      right: 0;
      min-width: 150px;
      width: 100%;
      height: 2px;
      background-color: #ccc;
    }
  }
}

.event {
  position: relative;
  margin-bottom: 60px;
  padding: 55px 70px;
  box-shadow: 0 25px 45px 0 rgba(0, 0, 0, 0.1);
  background-color: #17313a;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
    max-width: 950px;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
  }

  &__content {
    width: 60%;
    padding-right: 50px;

    @media (max-width: 1400px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 40px;
    }

    @media (max-width: 700px) {
      padding: 30px 20px 20px;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 55px;
  }

  &__date {
    font-size: 18px;
    color: #ccc;

    &--time {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 500;
    }
  }

  &__title {
    margin-bottom: 40px;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: 1.5px;
    color: #ccc;

    @media (max-width: 1400px) {
      text-align: center;
    }
  }

  &__description {
      max-width: 80%;
      margin-bottom: 80px;
      font-size: 17px;
      line-height: 30px;
      color: #ccc;
      letter-spacing: 0.8px;

      @media (max-width: 1400px) {
        max-width: 100%;
      }
  }

  &__btn {
    background-color: #f8f1e7;
    position: relative;

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

  &__preview-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    padding-top: 46%;
    overflow: hidden;

    @media (max-width: 1400px) {
      position: relative;
      top: initial;
      right: initial;
      bottom: initial;
      width: 100%;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      padding-top: 0;
      order: -1;
    }
  }

  &__preview {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    @media (max-width: 1400px) {
      position: relative;
      top: initial;
      bottom: initial;
      width: 100%;
      height: auto;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
