<template>
  <QuestionPopup
    :questionData="questionPopupData"
    questionText="Are you sure you want to delete this event?"
    @handlYes="removeEvent"
    @handlNo="questionPopupData = null"
    v-if="questionPopupData"
  />
  <UpdateEventForm
    :eventData="updateEventData"
    @closeUpdateForm="updateEventData = null"
    v-if="updateEventData"
  />
  <div class="AdminEvents Admin">
    <div class="AdminEvents__header">
      <button
        type="button"
        class="AdminEvents__btn"
        @click="openEventModal"
      >
        add event
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
        </div>
        <div class="AdminEvent__text">
          {{event.text}}
        </div>
      </div>
      <Tools
        @edit="updateEventData = events.find((currEven) => currEven.id === event.id)"
        @delete="openQuestionPopup(event)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import formatters from '../utils/formatters';
import QuestionPopup from '@/components/QuestionPopup.vue';
import UpdateEventForm from '@/components/UpdateEventForm.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'AdminEvents',
  data() {
    return {
      questionPopupData: null,
      updateEventData: null,
    };
  },
  components: {
    QuestionPopup,
    UpdateEventForm,
    Tools,
  },
  computed: {
    ...mapGetters(['db', 'events', 'locale', 'storage']),
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
        if (data.imgName) {
          const desertRef = ref(this.storage, `events-previews/${data.imgName}`);
          deleteObject(desertRef);
        }
      } catch (error) {
        console.error('Coudn`t remove event or event preview');
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
  .AdminEvents {
    padding: 20px;

    &__event {
      display: flex;
      margin-bottom: 30px;
      padding: 30px;
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

  .AdminEvent {
    position: relative;

    &__image-wrapper {
      position: relative;
      width: 240px;
      padding-top: 240px;
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
      left: 0;
      width: 100%;
      object-fit: cover;
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

    &__title,
    &__time,
    &__link {
      position: relative;
      padding-right: 20px;
      margin-bottom: 15px;
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
      letter-spacing: 1px;
      font-size: 16px;
    }
  }
</style>
