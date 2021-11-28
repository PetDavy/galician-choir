<template>
  <QuestionPopup
    :questionData="questionPopupData"
    @handlYes="removeEvent"
    @handlNo="questionPopupData = null"
    v-if="questionPopupData"
  />
  <div class="AdminEvents">
    <div class="AdminEvents__header">
      <h2 class="AdminEvents__title">Events</h2>
      <button
        type="button"
        class="AdminEvents__btn btn"
        @click="openEventModal"
      >
        add new event
      </button>
    </div>
    <div
      class="AdminEvents__event AdminEvent"
      v-for="event in eventsList"
      :key="event.id"
    >
      <div class="AdminEvent__image-wrapper">
        <img class="AdminEvent__image" :src="event.img" :alt="event.title">
      </div>
      <div class="AdminEvent__info">
        <div class="AdminEvent__info-top">
          <div class="AdminEvent__info-top-left">
            <div class="AdminEvent__title">
              {{event.title}}
            </div>
            <div class="AdminEvent__time">
              {{(formatDate(event.time.toDate())).date}} <strong>{{(formatDate(event.time.toDate())).time}}</strong>
            </div>
            <a :href="event.link" target="_blank" class="AdminEvent__link">
              {{event.link}}
            </a>
          </div>
          <div class="AdminEvent__tools">
            <div class="AdminEvent__tools-btn" @click="openQuestionPopup(event)">
              <svg class="AdminEvent__remove" width="23" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.64 27.19c0 .74.26 1.46.72 1.99.47.52 1.1.82 1.75.82h14.78c.66 0 1.28-.3 1.75-.82.46-.53.72-1.25.72-2V7.5H1.64v19.69Zm13.97-15a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2Zm-4.93 0a1 1 0 0 1 .24-.67.77.77 0 0 1 .58-.27c.22 0 .43.1.58.27a1 1 0 0 1 .24.67V25.3a1 1 0 0 1-.24.67.77.77 0 0 1-.58.27.77.77 0 0 1-.58-.27 1 1 0 0 1-.24-.67V12.2ZM22.18 1.87h-6.16l-.48-1.1c-.1-.23-.26-.42-.46-.56-.2-.14-.42-.21-.65-.21H8.56c-.23 0-.45.07-.64.2-.2.15-.35.34-.46.58l-.48 1.1H.82c-.22 0-.43.1-.58.27A1 1 0 0 0 0 2.8V4.7a1 1 0 0 0 .24.66c.15.18.36.27.58.27h21.36c.22 0 .43-.1.58-.27a1 1 0 0 0 .24-.66V2.8a1 1 0 0 0-.24-.66.77.77 0 0 0-.58-.28Z" fill="#AE1414"/></svg>
            </div>
          </div>
        </div>
        <div class="AdminEvent__text">
          {{event.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import formatters from '../utils/formatters';
import QuestionPopup from '@/components/QuestionPopup.vue';

export default {
  name: 'AdminEvents',
  data() {
    return {
      questionPopupData: null,
    };
  },
  components: {
    QuestionPopup,
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
    ...mapMutations(['updateIsModalFormOpen']),
    openQuestionPopup(event) {
      this.questionPopupData = event;
    },
    async removeEvent(data) {
      this.questionPopupData = null;

      try {
        await deleteDoc(doc(this.db, 'events', data.id));
      } catch (error) {
        console.error('Coudn`t remove event');
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
  .AdminEvents {
    &__event {
      display: flex;
      align-items: center;
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

  .AdminEvent {
    &__image-wrapper {
      position: relative;
      width: 300px;
      padding-top: 300px;
      margin-right: 30px;
      flex-shrink: 0;
      overflow: hidden;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
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
    &__time,
    &__link {
      position: relative;
      padding-right: 20px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 20px;
      font-weight: 500;
    }

    &__link {
      position: relative;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 240px;
    }

    &__text {
      width: 100%;
    }
  }
</style>
