<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="About">
    <div class="About__content side-indent side-indent--full-width">
      <div
        class="About__block"
        v-for="(block, index) in blocksList"
        :key="block.id"
      >
        <GrandTitle :titleText="block['grand-title']" :align="index % 2 ? 'right:40' : 'left:0'" v-if="isLoaderRemoved" />
        <div class="About__info">
          <div class="About__info-top">
            <h3 class="About__info-title">{{block.title}}</h3>
            <p class="About__info-sub-title">{{block['sub-title']}}</p>
          </div>
          <p class="About__info-description">
            {{block.text}}
          </p>
        </div>
        <div class="About__image-wrapper">
          <img
            :src="block.img"
            :alt="block.title"
            class="About__image"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['aboutBlocks', 'locale']),
    blocksList() {
      const formatedBlocks = this.aboutBlocks.map((block) => ({
        id: block.id,
        orderId: block.orderId,
        ...block[this.locale],
      }));

      return formatedBlocks.sort((blockA, blockB) => blockA.orderId - blockB.orderId);
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
    console.log(this.aboutBlocks);
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

    @media (max-width: 550px) {
      padding-bottom: 150px;
    }

    .Grand-title {
      top: -140px;

      @media (max-width: 550px) {
        top: -120px;
      }

    }

    &__content {
      position: relative;

      @media (max-width: 700px) {
        padding-left: 20px;
        padding-right: 20px;
      }
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
        margin: 0 auto 170px auto;
        width: fit-content;
        padding: 60px 40px 20px;
        box-shadow: 0 25px 45px 0 rgba(0, 0, 0, 0.1);
        background-color: #17313a;
        border-radius: 6px;
      }

      @media (max-width: 700px) {
        padding: 20px 15px 10px;
      }

      &:nth-child(odd) {
        .About__info {
          min-width: 50%;
          flex: 1;
          margin-right: 20px;
          padding-left: 60px;

          @media (max-width: 1400px) {
            margin-right: 0;
            margin-left: 0;
            padding-left: 0;
          }
        }
      }

      &:nth-child(even) {
        .About__info {
          min-width: 56%;
          margin-left: 20px;
          padding-right: 60px;

          @media (max-width: 1400px) {
            margin-right: 0;
            margin-left: 0;
            min-width: 50%;
            padding-right: 0;
          }

          &__info-top {
            max-width: 900px;
          }

          &__info-description {
            max-width: 800px;
          }
        }

        .About__image-wrapper {
          order: -1;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__info {
      padding: 60px 0;

      @media (max-width: 1400px) {
        padding: 40px 0 20px;
      }
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
      padding-top: 35%;
      align-self: stretch;

      @media (max-width: 1400px) {
        order: -1;
        margin: 0 auto;
        padding-top: 600px;
      }

      @media (max-width: 750px) {
        width: 100%;
        padding-top: 80%;
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
