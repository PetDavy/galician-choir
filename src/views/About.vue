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
          <input type="checkbox" :id="`description-check-${index}`" class="About__checkbox">
          <div class="About__info-description">
            <p>
              {{block.text}}
            </p>
          </div>
          <label :for="`description-check-${index}`" class="btn About__info-btn">
            {{buttons[locale]['more']}}
          </label>
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
import buttons from '@/assets/texts/buttons.json';

export default {
  name: 'About',
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
      buttons,
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
    setTimeout(() => {
      this.isLoaderVisible = false;
      this.removeLoader();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
  .About {
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
      height: 580px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 60px 200px 0;
      background-color: #e6e6e6;
      border-radius: 4px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 1400px) {
        height: 480px;
      }

      @media (max-width: 1200px) {
        flex-direction: column;
        margin: 0 auto 170px auto;
        width: fit-content;
        padding: 60px 40px 20px;
        border-radius: 6px;
        height: auto;
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

          @media (max-width: 1200px) {
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

          @media (max-width: 1200px) {
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
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .About__image {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__info {
      padding: 60px 0;

      @media (max-width: 1200px) {
        padding: 40px 0 20px;
      }
    }

    &__info-top {
      max-width: 800px;
      margin-bottom: 30px;
      padding-bottom: 25px;
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
      font-weight: 600;
      letter-spacing: 0.8px;
    }

    &__checkbox {
      position: absolute;
      z-index: -1;
      visibility: hidden;

      &:not(:checked) ~ .About__info-description {
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        position: relative;
        text-overflow: clip;
        white-space: normal;
        word-break: break-word;

        @media (max-width: 1400px) {
          -webkit-line-clamp: 6;
        }
      }

      &:checked ~ .About__info-btn {
        display: none;
      }
    }

    &__info-description {
      max-width: 816px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 0.8px;
      max-height: 358px;
      position: relative;
      overflow-y: auto;

      @media (max-width: 1400px) {
        max-height: 235px;
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

    &__info-btn {
      background-color: #fff;
      position: relative;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

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

    &__image-wrapper {
      position: relative;
      width: 600px;
      align-self: stretch;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      @media (max-width: 1200px) {
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
      max-height: 580px;
      left: 0;
      display: block;
      object-fit: cover;
      object-position: center;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      @media (max-width: 1400px) {

      }
    }
  }
</style>
