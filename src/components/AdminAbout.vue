<template>
  <QuestionPopup
    :questionData="questionPopupData"
    questionText="Are you sure you want to delete this block?"
    @handlYes="removeBlock"
    @handlNo="questionPopupData = null"
    v-if="questionPopupData"
  />
  <UpdateAboutForm
    :aboutData="updateBlockData"
    @closeUpdateForm="updateBlockData = null"
    v-if="updateBlockData"
  />
  <div class="AboutBlocks">
    <div class="AboutBlocks__header">
      <button
        type="button"
        class="AboutBlocks__btn btn"
        @click="openEventModal"
      >
        add block
      </button>
    </div>
    <div
      class="AboutBlocks__block AdminAboutBlock"
      v-for="block in blocksList"
      :key="block.id"
    >
      <div class="AdminAboutBlock__image-wrapper">
        <img class="AdminAboutBlock__image" :src="block.img" :alt="block.title">
      </div>
      <div class="AdminAboutBlock__info">
        <div class="AdminAboutBlock__info-top">
          <div class="AdminAboutBlock__info-top-left">
            <div class="AdminAboutBlock__grand-title">
              {{block['grand-title']}}
            </div>
            <div class="AdminAboutBlock__title">
              {{block.title}}
            </div>
            <div class="AdminAboutBlock__sub-title">
              {{block['sub-title']}}
            </div>
          </div>
          <Tools
            @edit="updateBlockData = aboutBlocks.find((currBlock) => currBlock.id === block.id)"
            @delete="openQuestionPopup(block)"
          />
        </div>
        <div class="AdminAboutBlock__text">
          {{block.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import formatters from '../utils/formatters';
import QuestionPopup from '@/components/QuestionPopup.vue';
import UpdateAboutForm from '@/components/UpdateAboutForm.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'AdminAbout',
  data() {
    return {
      questionPopupData: null,
      updateBlockData: null,
    };
  },
  components: {
    QuestionPopup,
    UpdateAboutForm,
    Tools,
  },
  computed: {
    ...mapGetters(['db', 'aboutBlocks', 'locale', 'storage']),
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
    ...mapMutations(['updateIsModalFormOpen']),
    openQuestionPopup(block) {
      this.questionPopupData = block;
    },
    async removeBlock(data) {
      this.questionPopupData = null;

      try {
        await deleteDoc(doc(this.db, 'about-blocks', data.id));
        if (data.imgName) {
          const desertRef = ref(this.storage, `about-previews/${data.imgName}`);
          deleteObject(desertRef);
        }
      } catch (error) {
        console.error('Coudn`t remove about block or block preview');
        console.log(error);
      }
    },
    openEventModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: true });
    },
    formatDate: formatters.formatDate,
  },
};
</script>

<style lang="scss" scoped>
  .AboutBlocks {
    padding: 20px;

    &__block {
      position: relative;
      display: flex;
      margin-bottom: 30px;
      padding: 30px;
      width: 100%;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 950px) {
        flex-direction: column;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__btn {
      background-color: #15aaff;
      box-shadow: 0 2px 5px rgba(21, 170, 255, 0.4);
      height: 40px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px 22px;
      border-radius: 5px;
      margin-bottom: 20px;
      border: none;
      color: #fff;
      font-size: 15px;
      text-transform: capitalize;
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: 0 2px 5px rgba(21, 170, 255, 0.8);
      }
    }
  }

  .AdminAboutBlock {
    &__image-wrapper {
      position: relative;
      width: 250px;
      padding-top: 200px;
      margin-right: 30px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 4px;

      @media (max-width: 950px) {
        margin-right: 0;
        margin-bottom: 20px;
      }

      @media (max-width: 550px) {
        width: 160px;
        padding-top: 160px;
      }
    }

    &__image {
      position: absolute;
      top: 0;
      width: 100%;
      object-fit: contain;
      object-position: center;
      border-radius: 4px;
    }

    &__info {
      width: calc(100% - 330px);
      display: flex;
      flex-direction: column;
      color: #0d1b3eb3;

      @media (max-width: 950px) {
        width: 100%;
      }
    }

    &__info-top {
      display: flex;
    }

    &__info-top-left {
      width: 50%;
    }

    &__grand-title,
    &__title,
    &__sub-title {
      position: relative;
      padding-right: 20px;
      margin-bottom: 15px;
    }

    &__grand-title,
    &__title {
      font-size: 20px;
      font-weight: 700;
    }

    &__grand-title {
      text-transform: uppercase;
    }

    &__sub-title {
      font-weight: 500;
    }

    &__text {
      width: 100%;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
</style>
