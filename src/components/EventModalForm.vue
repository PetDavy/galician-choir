<template>
  <div class="EventModal">
    <div class="EventModal__overlay" @click="closeModal"></div>
    <div class="EventModal__modal">
      <div class="EventModal__modal-close-btn" @click="closeModal"></div>
      <form class="EventModal__form" @submit.prevent="addEvent">
        <div class="EventModal__header">
          <h3 class="EventModal__form-title">New Event</h3>
          <div class="EventModal__locales">
            <div
              class="EventModal__locales-btn"
              :class="{'EventModal__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <label for="eventTitle" class="EventModal__label">
          <div class="EventModal__input-caption">Title</div>
          <input
            type="text"
            class="EventModal__input"
            id="eventTitle"
            v-model="fields[activeLocale].title"
          >
        </label>
        <label for="eventLink" class="EventModal__label">
          <div class="EventModal__input-caption">Link url</div>
          <input
            type="url"
            class="EventModal__input"
            id="eventLink"
            v-model="fields[activeLocale].linkUrl"
          >
        </label>
        <div class="EventModal__inputs-row">
          <label for="eventImage" class="EventModal__label EventModal__inputs-row-item">
            <div class="EventModal__input-caption">Image url</div>
            <input
              type="url"
              class="EventModal__input"
              id="eventImage"
              v-model="imageUrl"
              :disabled="!!image"
            >
            <label for="eventUploadImage" class="EventModal__add-photo-btn">
              <input
                type="file"
                id="eventUploadImage"
                class="EventModal__input--hidden"
                ref="photoFile"
                @change="addPhoto"
              >
              Add Photo
            </label>
          </label>
          <label for="eventDate" class="EventModal__label EventModal__inputs-row-item">
            <div class="EventModal__input-caption">Date and Time</div>
            <input
              type="datetime-local"
              class="EventModal__input"
              id="eventDate"
              v-model="date"
            >
          </label>
        </div>
        <label for="eventText" class="EventModal__label">
          <div class="EventModal__input-caption">Description</div>
          <textarea
            name="eventText"
            id="eventText"
            cols="30"
            rows="10"
            class="EventModal__input EventModal__input--textarea"
            v-model="fields[activeLocale].text"
          ></textarea>
        </label>
        <button type="submit" class="EventModal__form-btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { mapMutations, mapGetters } from 'vuex';

const defaultFields = {
  title: '',
  linkUrl: '',
  text: '',
};

export default {
  name: 'EventModal',
  setup() {
    const photoFile = ref(null);

    return { photoFile };
  },
  data() {
    return {
      fields: {
        ua: { ...defaultFields },
        en: { ...defaultFields },
      },
      imageUrl: '',
      image: null,
      imageName: '',
      date: '',
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['db', 'locale', 'storage']),
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    async addEvent() {
      if (this.image) {
        const url = await this.uploadPhoto();
        this.imageUrl = url;
      }

      const eventData = {
        ua: {
          title: this.fields.ua.title,
          time: new Timestamp((new Date(this.date).getTime() / 1000), 0),
          img: this.imageUrl,
          imgName: this.imageName,
          link: this.fields.ua.linkUrl,
          text: this.fields.ua.text,
        },
        en: {
          title: this.fields.en.title,
          time: new Timestamp((new Date(this.date).getTime() / 1000), 0),
          img: this.imageUrl,
          imgName: this.imageName,
          link: this.fields.en.linkUrl,
          text: this.fields.en.text,
        },
      };

      try {
        const docRef = await addDoc(collection(this.db, 'events'), eventData);
        console.log('Document written with ID: ', docRef.id);
        this.closeModal();

        this.fields = {
          ua: { ...defaultFields },
          en: { ...defaultFields },
        };
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    addPhoto() {
      const eventPhoto = this.photoFile.files[0];

      if (eventPhoto.type.startsWith('image')) {
        this.imageUrl = eventPhoto.name;
        this.image = eventPhoto;
      } else {
        alert(`файл ${eventPhoto.name} не є зображенням або файлом потрібного формату`);
      }
    },
    async uploadPhoto() {
      const photoName = `event-preview-${new Date().getTime()}-${this.imageUrl}`;
      this.imageName = photoName;
      const storageRef = firebaseRef(this.storage, `events-previews/${photoName}`);

      const snapshot = await uploadBytes(storageRef, this.image);
      const url = await getDownloadURL(snapshot.ref);

      return url;
    },
    closeModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: false });
    },
  },
  mounted() {
    this.activeLocale = this.locale;
  },
};
</script>
