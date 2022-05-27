<template>
  <div class="EventUpdate">
    <div class="EventUpdate__overlay" @click="closeModal"></div>
    <div class="EventUpdate__modal">
      <div class="EventUpdate__modal-close-btn" @click="closeModal"></div>
      <form class="EventUpdate__form" @submit.prevent="updateEvent">
        <div class="EventUpdate__header">
          <h3 class="EventUpdate__form-title">Update Event</h3>
          <div class="EventUpdate__locales">
            <div
              class="EventUpdate__locales-btn"
              :class="{'EventUpdate__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <div class="EventUpdate__inputs-row">
          <img
            :src="imageUrl"
            :alt="imageName"
            class="EventUpdate__image-preview EventUpdate__inputs-row-item"
            v-if="!image"
          >
          <div class="EventUpdate__inputs-row-item">
            <label for="eventUploadImage" class="EventUpdate__add-photo-btn">
              <input
                type="file"
                id="eventUploadImage"
                class="EventUpdate__input--hidden"
                ref="photoFile"
                @change="addPhoto"
              >
              Change Image
            </label>
            <input
              type="url"
              class="EventUpdate__input"
              id="eventImage"
              v-model="imageUrl"
              :disabled="!!image"
            >
          </div>
        </div>
        <label for="eventTitle" class="EventUpdate__label">
          <div class="EventUpdate__input-caption">Title</div>
          <input
            type="text"
            class="EventUpdate__input"
            id="eventTitle"
            v-model="fields[activeLocale].title"
          >
        </label>
        <label for="eventDate" class="EventUpdate__label EventUpdate__inputs-row-item">
          <div class="EventUpdate__input-caption">Date and Time</div>
          <input
              type="datetime-local"
              class="EventUpdate__input"
              id="eventDate"
              v-model="date"
              @change="isDateUpdated = true"
          >
        </label>
        <label for="eventLink" class="EventUpdate__label">
          <div class="EventUpdate__input-caption">Link url</div>
          <input
            type="url"
            class="EventUpdate__input"
            id="eventLink"
            v-model="fields[activeLocale].link"
          >
        </label>
        <label for="eventText" class="EventUpdate__label">
          <div class="EventUpdate__input-caption">Description</div>
          <textarea
            name="eventText"
            id="eventText"
            cols="30"
            rows="10"
            class="EventUpdate__input EventUpdate__input--textarea"
            v-model="fields[activeLocale].text"
          ></textarea>
        </label>
        <button type="submit" class="EventUpdate__form-btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  setDoc,
  Timestamp,
  doc,
} from 'firebase/firestore';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'EventUpdate',
  setup() {
    const photoFile = ref(null);

    return { photoFile };
  },
  data() {
    return {
      fields: {
        ua: { ...this.eventData.ua },
        en: { ...this.eventData.en },
      },
      imageUrl: this.eventData.ua.img,
      image: null,
      imageName: this.eventData.ua.imgName,
      date: this.eventData.ua.time,
      isDateUpdated: false,
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  props: {
    eventData: Object,
  },
  computed: {
    ...mapGetters(['db', 'locale', 'storage']),
  },
  methods: {
    ...mapMutations(['']),
    async updateEvent() {
      if (this.image) {
        const url = await this.uploadPhoto();
        this.imageUrl = url;
      }

      const eventData = {
        ua: {
          title: this.fields.ua.title,
          time: this.isDateUpdated ? new Timestamp((new Date(this.date).getTime() / 1000), 0) : this.date,
          img: this.imageUrl,
          imgName: this.imageName ?? '',
          link: this.fields.ua.link,
          text: this.fields.ua.text,
        },
        en: {
          title: this.fields.en.title,
          time: this.isDateUpdated ? new Timestamp((new Date(this.date).getTime() / 1000), 0) : this.date,
          img: this.imageUrl,
          imgName: this.imageName ?? '',
          link: this.fields.en.link,
          text: this.fields.en.text,
        },
      };

      try {
        const cityRef = doc(this.db, 'events', this.eventData.id);

        const docRef = await setDoc(cityRef, eventData);

        console.log('Document updated ID: ', docRef);
        this.closeModal();
      } catch (e) {
        console.error('Error updating document: ', e);
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
      this.$emit('closeUpdateForm');
    },
  },
  mounted() {
    this.activeLocale = this.locale;
  },
};
</script>
