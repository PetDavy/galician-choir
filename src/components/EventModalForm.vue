<template>
  <div class="EventModal">
    <div class="EventModal__overlay" @click="closeModal"></div>
    <div class="EventModal__modal">
      <div class="EventModal__modal-close-btn" @click="closeModal"></div>
      <form class="EventModal__form" @submit.prevent="addEvent">
        <h3 class="EventModal__form-title">New Event</h3>
        <label for="eventTitle" class="EventModal__label">
          <div class="EventModal__input-caption">Title</div>
          <input
            type="text"
            class="EventModal__input"
            id="eventTitle"
            v-model="title"
          >
        </label>
        <label for="eventImage" class="EventModal__label">
          <div class="EventModal__input-caption">Image url</div>
          <input
            type="url"
            class="EventModal__input"
            id="eventImage"
            v-model="imageUrl"
          >
        </label>
        <label for="eventLink" class="EventModal__label">
          <div class="EventModal__input-caption">Link url</div>
          <input
            type="url"
            class="EventModal__input"
            id="eventLink"
            v-model="linkUrl"
          >
        </label>
        <label for="eventDate" class="EventModal__label EventModal__inpust-row-item">
          <div class="EventModal__input-caption">Date and Time</div>
          <input
            type="datetime-local"
            class="EventModal__input"
            id="eventDate"
            v-model="date"
          >
        </label>
        <label for="eventText" class="EventModal__label EventModal__inpust-row-item">
          <div class="EventModal__input-caption">Description</div>
          <textarea
            name="eventText"
            id="eventText"
            cols="30"
            rows="10"
            class="EventModal__input EventModal__input--textarea"
            v-model="text"
          ></textarea>
        </label>
        <button type="submit" class="EventModal__form-btn btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'EventModal',
  data() {
    return {
      title: '',
      date: '',
      imageUrl: '',
      linkUrl: '',
      text: '',
    };
  },
  computed: {
    ...mapGetters(['db']),
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    async addEvent() {
      const eventData = {
        title: this.title,
        time: new Timestamp((new Date(this.date).getTime() / 1000), 0),
        img: this.imageUrl,
        link: this.linkUrl,
        text: this.text,
      };

      try {
        const docRef = await addDoc(collection(this.db, 'events'), eventData);
        console.log('Document written with ID: ', docRef.id);
        this.closeModal();

        this.title = '';
        this.date = '';
        this.imageUrl = '';
        this.linkUrl = '';
        this.text = '';
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    closeModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: false });
    },
  },
};
</script>

<style lang="scss" scoped>
  .EventModal {
    &__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 9;
    }

    &__modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1000px;
      padding: 40px;
      box-shadow: 0 25px 45px 0 rgba(0, 0, 0, 0.1);
      background-color: #345b68;
      z-index: 10;
      border-radius: 4px;
    }

    &__modal-close-btn {
      position: absolute;
      width: 30px;
      height: 30px;
      top: -40px;
      right: 5px;
      transition: transform .3s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%) rotate(45deg);
        height: 3px;
        border-radius: 2px;
        background-color: #f4f4f4;
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        transform: translateX(-50%) rotate(45deg);
        width: 3px;
        border-radius: 2px;
        background-color: #f4f4f4;
      }
    }

    &__form-title {
      font-size: 22px;
      margin-bottom: 22px;
      color: #ccc;
    }

    &__inpust-row {
      display: flex;
      align-items: center;
    }

    &__inpust-row-item {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__label {
      display: block;
      margin-bottom: 20px;
      width: 100%;
    }

    &__input-caption {
      font-size: 15px;
      color: #ccc;
      margin-bottom: 5px;
    }

    &__input {
      width: 100%;
      border: none;
      height: 40px;
      font-size: 17px;
      padding: 5px 10px;
      border-radius: 2px;

      &--textarea {
        min-height: 200px;
        height: initial;
        resize: vertical;
      }
    }
  }
</style>
