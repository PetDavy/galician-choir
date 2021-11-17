<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <div class="Events">
    <div class="Events__content side-indent side-indent--full-width">
      <GrandTitle titleText="events" align="left:35" v-if="isLoaderRemoved" />
      <h1 class="Events__title">
        Our Latest Events
      </h1>
      <div class="Events__event event">
        <div class="event__content">
          <div class="event__header">
            <div class="event__date">
              2021/04/28
            </div>
          </div>
          <h2 class="event__title">Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
          <div class="event__description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur pariatur, atque iure recusandae doloremque molestiae labore repellat, voluptates impedit distinctio autem. Voluptate pariatur qui minima assumenda eveniet, voluptas cumque tempora!
          </div>
          <a href="www.facebook.com" target="_blank" class="event__btn btn">view more</a>
        </div>
        <div class="event__preview-wrapper">
          <img src="https://old.uinp.gov.ua/sites/default/files/userupload/1_188.jpg" alt="Leontovych" class="event__preview">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
.Events {
  position: relative;
  padding: 210px 0 60px;
  background: #132b34;

  &__content {
    position: relative;
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

  &__content {
    width: 60%;
    padding-right: 50px;
  }

  &__header {
    display: flex;
    margin-bottom: 55px;
  }

  &__date {
    font-size: 14px;
    color: #666;
  }

  &__title {
    margin-bottom: 40px;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: 1.5px;
    color: #ccc;
  }

  &__description {
      max-width: 80%;
      margin-bottom: 80px;
      font-size: 17px;
      line-height: 30px;
      color: #ccc;
      letter-spacing: 0.8px;
  }

  &__btn {
    background-color: #f8f1e7;
  }

  &__preview-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    padding-top: 46%;
    overflow: hidden;
  }

  &__preview {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
