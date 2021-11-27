<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="About">
    <div class="About__content side-indent side-indent--full-width">
      <div class="About__block">
        <GrandTitle titleText="about choir" align="left:0" v-if="isLoaderRemoved" />
        <div class="About__info">
          <div class="About__info-top">
            <h3 class="About__info-title">Galytskii Lviv Choir</h3>
            <p class="About__info-sub-title">Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
          </div>
          <p class="About__info-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestias neque suscipit quae ratione eaque tenetur repudiandae, possimus modi est.
          </p>
          <p class="About__info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sit quaerat doloremque incidunt nostrum obcaecati autem voluptates neque! Cupiditate ex quia corrupti incidunt tempora ut, autem in qui quaerat?</p>
        </div>
        <div class="About__image-wrapper">
          <img
            src="https://stpetersgeneva.org/wp-content/uploads/sites/4/2017/11/spcaa-choir-performing-705x337.jpg"
            alt="choir"
            class="About__image"
          >
        </div>
      </div>
      <div class="About__block">
        <GrandTitle titleText="conductor" align="right:40" />
        <div class="About__image-wrapper">
          <img
            src="https://www.morristonorpheus.com/resource/AlwynCarnegie1.jpg"
            alt="conductor"
            class="About__image"
          >
        </div>
        <div class="About__info">
          <div class="About__info-top">
            <h3 class="About__info-title">Roman Bagriy</h3>
            <p class="About__info-sub-title">Lorem ipsum dolor sit, amet consectetur.</p>
          </div>
          <p class="About__info-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestias neque suscipit quae ratione eaque tenetur repudiandae, possimus modi est.
          </p>
          <p class="About__info-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sit quaerat doloremque incidunt nostrum obcaecati autem voluptates neque! Cupiditate ex quia corrupti incidunt tempora ut, autem in qui quaerat?</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'About',
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
  .About {
    background-color: #132b34;
    padding-bottom: 200px;
    padding-top: 250px;

    .Grand-title {
      top: -140px;
    }

    &__content {
      position: relative;
    }

    &__block {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 60px 200px 0;
      color: #fff;
      border-radius: 4px;

      @media (max-width: 1400px) {
        flex-direction: column;
        margin: 0 60px 100px 60px;
      }

      &:nth-child(odd) {
        .About__info {
          min-width: 50%;
          flex: 1;
          margin-right: 20px;
          padding-left: 60px;
        }
      }

      &:nth-child(even) {
        .About__info {
          min-width: 56%;
          margin-left: 20px;
          padding-right: 60px;

          &__info-top {
            max-width: 900px;
          }

          &__info-description {
            max-width: 800px;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__info {
      padding: 60px 0;
    }

    &__info-top {
      max-width: 800px;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #ccc;
    }

    &__info-title {
      font-size: 35px;
      line-height: 42px;
      margin-bottom: 15px;
      text-transform: uppercase;
      font-weight: 700;
    }

    &__info-sub-title {
      font-size: 16px;
      line-height: 19px;
      color: #f4f4f4;
      font-weight: 600;
      letter-spacing: 0.8px;
    }

    &__info-description {
      max-width: 700px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 30px;
      color: #f4f4f4;
      letter-spacing: 0.8px;
    }

    &__image-wrapper {
      position: relative;
      width: 600px;
      padding-top: 32%;
      align-self: stretch;

      @media (max-width: 1400px) {
        display: none;
      }
    }

    &__image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      display: block;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
