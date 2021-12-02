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
      <h2 class="AboutBlocks__title">About Blocks</h2>
      <button
        type="button"
        class="AboutBlocks__btn btn"
        @click="openEventModal"
      >
        add new block
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
          <div class="AdminAboutBlock__tools">
            <div class="AdminAboutBlock__tools-btn" @click="updateBlockData = aboutBlocks.find((currBlock) => currBlock.id === block.id)">
              <svg class="AdminAboutBlock__update" width="28" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.9 5.46 7 7.5-15.2 16.3-6.24.73c-.84.1-1.55-.66-1.45-1.55l.7-6.7L15.9 5.47Zm11.33-1.11L23.94.82a2.5 2.5 0 0 0-3.71 0l-3.1 3.32 7 7.5 3.1-3.31a2.96 2.96 0 0 0 0-3.98Z" fill="#AE1414"/></svg>
            </div>
            <div class="AdminAboutBlock__tools-btn" @click="openQuestionPopup(block)">
              <svg class="AdminAboutBlock__remove" width="23" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.64 27.19c0 .74.26 1.46.72 1.99.47.52 1.1.82 1.75.82h14.78c.66 0 1.28-.3 1.75-.82.46-.53.72-1.25.72-2V7.5H1.64v19.69Zm13.97-15a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2ZM22.18 1.87h-6.16l-.48-1.1c-.1-.23-.26-.42-.46-.56-.2-.14-.42-.21-.65-.21H8.56c-.23 0-.45.07-.64.2-.2.15-.35.34-.46.58l-.48 1.1H.82c-.22 0-.43.1-.58.27A1 1 0 0 0 0 2.8V4.7a1 1 0 0 0 .24.66c.15.18.36.27.58.27h21.36c.22 0 .43-.1.58-.27a1 1 0 0 0 .24-.66V2.8a1 1 0 0 0-.24-.66.77.77 0 0 0-.58-.28Z" fill="#AE1414"/></svg>
            </div>
          </div>
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
    &__block {
      display: flex;
      margin-bottom: 30px;
      padding: 20px;
      width: 100%;
      background-color: #d2dfe0;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__title {
      font-size: 30px;
      margin-bottom: 25px;
      margin-right: 25px;
      color: #fff;
    }
  }

  .AdminAboutBlock {
    &__image-wrapper {
      position: relative;
      width: 300px;
      padding-top: 250px;
      margin-right: 30px;
      flex-shrink: 0;
      overflow: hidden;
    }

    &__image {
      position: absolute;
      top: 0;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }

    &__info {
      width: calc(100% - 330px);
      display: flex;
      flex-direction: column;
    }

    &__info-top {
      display: flex;
    }

    &__info-top-left {
      width: 50%;
    }

    &__tools {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      width: 50%;
      padding-left: 40px;

    }

    &__tools-btn {
      margin-left: 15px;
      cursor: pointer;
    }

    &__grand-title,
    &__title,
    &__sub-title {
      position: relative;
      padding-right: 20px;
      margin-bottom: 20px;
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
    }
  }
</style>
