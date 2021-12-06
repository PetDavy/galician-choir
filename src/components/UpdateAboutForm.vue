<template>
  <div class="AboutUpdate">
    <div class="AboutUpdate__overlay" @click="closeModal"></div>
    <div class="AboutUpdate__modal">
      <div class="AboutUpdate__modal-close-btn" @click="closeModal"></div>
      <form class="AboutUpdate__form" @submit.prevent="updateEvent">
        <div class="AboutUpdate__header">
          <h3 class="AboutUpdate__form-title">Update Event</h3>
          <div class="AboutUpdate__locales">
            <div
              class="AboutUpdate__locales-btn"
              :class="{'AboutUpdate__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <div class="AboutUpdate__inputs-row">
          <img
            :src="imageUrl"
            :alt="imageName"
            class="AboutUpdate__image-preview AboutUpdate__inputs-row-item"
            v-if="!image"
          >
          <div class="AboutUpdate__inputs-row-item">
            <label for="aboutUploadImage" class="AboutUpdate__add-photo-btn">
              <input
                type="file"
                id="aboutUploadImage"
                class="AboutUpdate__input--hidden"
                ref="photoFile"
                @change="addPhoto"
              >
              Change Image
            </label>
            <input
              type="url"
              class="AboutUpdate__input"
              id="aboutImage"
              v-model="imageUrl"
              :disabled="!!image"
            >
          </div>
        </div>
        <label for="aboutGrandTitle" class="AboutUpdate__label">
          <div class="AboutUpdate__input-caption">Grand Title</div>
          <input
            type="text"
            class="AboutUpdate__input"
            id="aboutGrandTitle"
            v-model="fields[activeLocale]['grand-title']"
          >
        </label>
        <label for="aboutTitle" class="AboutUpdate__label">
          <div class="AboutUpdate__input-caption">Title</div>
          <input
            type="text"
            class="AboutUpdate__input"
            id="aboutTitle"
            v-model="fields[activeLocale].title"
          >
        </label>
        <label for="aboutSubTitle" class="AboutUpdate__label">
          <div class="AboutUpdate__input-caption">Sub Title</div>
          <input
            type="text"
            class="AboutUpdate__input"
            id="aboutSubTitle"
            v-model="fields[activeLocale]['sub-title']"
          >
        </label>
        <label for="aboutText" class="AboutUpdate__label">
          <div class="AboutUpdate__input-caption">Description</div>
          <textarea
            name="eventText"
            id="aboutText"
            cols="30"
            rows="10"
            class="AboutUpdate__input AboutUpdate__input--textarea"
            v-model="fields[activeLocale].text"
          ></textarea>
        </label>
        <button type="submit" class="AboutUpdate__form-btn btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {
  setDoc,
  doc,
} from 'firebase/firestore';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'AboutUpdate',
  setup() {
    const photoFile = ref(null);

    return { photoFile };
  },
  data() {
    return {
      fields: {
        ua: { ...this.aboutData.ua },
        en: { ...this.aboutData.en },
      },
      imageUrl: this.aboutData.ua.img,
      image: null,
      imageName: this.aboutData.ua.imgName,
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  props: {
    aboutData: Object,
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

      const blockData = {
        ua: {
          'grand-title': this.fields.ua['grand-title'],
          title: this.fields.ua.title,
          'sub-title': this.fields.ua['sub-title'],
          img: this.imageUrl,
          imgName: this.imageName ?? '',
          text: this.fields.ua.text,
        },
        en: {
          'grand-title': this.fields.en['grand-title'],
          title: this.fields.en.title,
          'sub-title': this.fields.en['sub-title'],
          img: this.imageUrl,
          imgName: this.imageName ?? '',
          text: this.fields.en.text,
        },
        orderId: this.aboutData.orderId,
      };

      try {
        const cityRef = doc(this.db, 'about-blocks', this.aboutData.id);

        const docRef = await setDoc(cityRef, blockData);

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
      const photoName = `about-preview-${new Date().getTime()}-${this.imageUrl}`;
      this.imageName = photoName;
      const storageRef = firebaseRef(this.storage, `about-previews/${photoName}`);

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
