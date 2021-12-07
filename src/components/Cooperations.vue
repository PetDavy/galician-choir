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
        </div>
        <div class="Cooperation__text">
          {{cooperation.text}}
        </div>
        <Tools @delete="openQuestionPopup(cooperation)" :editType="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import QuestionPopup from '@/components/QuestionPopup.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'Cooperations',
  components: {
    QuestionPopup,
    Tools,
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
  .Cooperations {
    width: 50%;
    padding: 0 20px 20px;
  }
  .Cooperation {
      position: relative;
      display: flex;
      margin-bottom: 30px;
      padding: 20px;
      width: 100%;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &__add-cooperation {
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

    &__image-wrapper {
      position: relative;
      width: 220px;
      padding-top: 170px;
      margin-right: 20px;
      flex-shrink: 0;
      overflow: hidden;

      &--svg {
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    &__image {
      position: absolute;
      top: 0;
      height: auto;
      max-width: 100%;
      object-fit: contain;
      object-position: center;
    }

    &__info {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: #0d1b3eb3;
    }

    &__info-top {
      display: flex;
    }

    &__info-top-left {
      width: 50%;
    }

    &__title,
    &__text {
      position: relative;
      padding-right: 20px;
      margin-bottom: 15px;
    }

    &__title {
      font-size: 20px;
      font-weight: 700;
    }

    &__text {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
</style>
