<template>
  <QuestionPopup
    :questionData="questionPopupData"
    questionText="Are you sure you want to delete this cooperation?"
    @handlYes="removeCooperation"
    @handlNo="questionPopupData = null"
    v-if="questionPopupData"
  />
  <div class="Cooperations">
    <button class="Cooperation__add-cooperation" @click="openEventModal">add cooperation</button>
    <div
      class="Cooperation"
      v-for="cooperation in cooperationsList"
      :key="cooperation.id"
    >
      <div class="Cooperation__image-wrapper" :class="{'Cooperation__image-wrapper--svg': cooperation.svg}">
        <img
          class="Cooperation__image"
          :src="cooperation.img"
          :alt="cooperation.title"
          v-if="cooperation.img"
        >
        <svg
          class="Cooperation__image-svg"
          v-html="cooperation.svg"
          v-if="cooperation.svg"
        />
      </div>
      <div class="Cooperation__info">
        <div class="Cooperation__info-top">
          <div class="Cooperation__info-top-left">
            <div class="Cooperation__title">
              {{cooperation.title}}
            </div>
          </div>
          <div class="Cooperation__tools">
            <div class="Cooperation__tools-btn" @click="updateBlockData = aboutBlocks.find((currBlock) => currBlock.id === block.id)">
              <svg class="Cooperation__update" width="28" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.9 5.46 7 7.5-15.2 16.3-6.24.73c-.84.1-1.55-.66-1.45-1.55l.7-6.7L15.9 5.47Zm11.33-1.11L23.94.82a2.5 2.5 0 0 0-3.71 0l-3.1 3.32 7 7.5 3.1-3.31a2.96 2.96 0 0 0 0-3.98Z" fill="#AE1414"/></svg>
            </div>
            <div class="Cooperation__tools-btn" @click="openQuestionPopup(cooperation)">
              <svg class="Cooperation__remove" width="23" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.64 27.19c0 .74.26 1.46.72 1.99.47.52 1.1.82 1.75.82h14.78c.66 0 1.28-.3 1.75-.82.46-.53.72-1.25.72-2V7.5H1.64v19.69Zm13.97-15a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2ZM22.18 1.87h-6.16l-.48-1.1c-.1-.23-.26-.42-.46-.56-.2-.14-.42-.21-.65-.21H8.56c-.23 0-.45.07-.64.2-.2.15-.35.34-.46.58l-.48 1.1H.82c-.22 0-.43.1-.58.27A1 1 0 0 0 0 2.8V4.7a1 1 0 0 0 .24.66c.15.18.36.27.58.27h21.36c.22 0 .43-.1.58-.27a1 1 0 0 0 .24-.66V2.8a1 1 0 0 0-.24-.66.77.77 0 0 0-.58-.28Z" fill="#AE1414"/></svg>
            </div>
          </div>
        </div>
        <div class="Cooperation__text">
          {{cooperation.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import QuestionPopup from '@/components/QuestionPopup.vue';

export default {
  name: 'Cooperations',
  components: {
    QuestionPopup,
  },
  props: {
    locale: String,
  },
  data() {
    return {
      questionPopupData: null,
      updateBlockData: null,
    };
  },
  computed: {
    ...mapGetters(['cooperations', 'db', 'storage']),
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
    ...mapMutations(['updateIsModalFormOpen']),
    openQuestionPopup(cooperation) {
      this.questionPopupData = cooperation;
    },
    async removeCooperation(data) {
      this.questionPopupData = null;

      try {
        await deleteDoc(doc(this.db, 'cooperations', data.id));
        if (data.imgName) {
          const desertRef = ref(this.storage, `cooperations/${data.imgName}`);
          deleteObject(desertRef);
        }
      } catch (error) {
        console.error('Coudn`t remove about block or cooperation logo');
        console.log(error);
      }
    },
    openEventModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: true });
    },
  },
};
</script>

<style lang="scss" scoped>
  .Cooperation {
      display: flex;
      margin-bottom: 30px;
      padding: 20px;
      width: 100%;
      background-color: #d2dfe0;

    &__add-cooperation {
      margin-bottom: 20px;
      padding: 0 40px;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      font-size: 18px;
      text-transform: uppercase;
      cursor: pointer;
    }

    &__image-wrapper {
      position: relative;
      width: 300px;
      padding-top: 250px;
      margin-right: 30px;
      flex-shrink: 0;
      overflow: hidden;

      &--svg {
        padding-top: 0;
      }
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

    &__title,
    &__text {
      position: relative;
      padding-right: 20px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
    }

    &__text {
      font-weight: 500;
    }
  }
</style>
