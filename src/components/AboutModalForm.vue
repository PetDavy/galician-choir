<template>
  <div class="AboutModal">
    <div class="AboutModal__overlay" @click="closeModal"></div>
    <div class="AboutModal__modal">
      <div class="AboutModal__modal-close-btn" @click="closeModal"></div>
      <form class="AboutModal__form" @submit.prevent="addBlock">
        <div class="AboutModal__header">
          <h3 class="AboutModal__form-title">New Block</h3>
          <div class="AboutModal__locales">
            <div
              class="AboutModal__locales-btn"
              :class="{'AboutModal__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <label for="aboutGrandTitle" class="AboutModal__label">
          <div class="AboutModal__input-caption">Grand TItle</div>
          <input
            type="text"
            class="AboutModal__input"
            id="aboutGrandTitle"
            v-model="fields[activeLocale]['grand-title']"
          >
        </label>
        <label for="aboutTitle" class="AboutModal__label">
          <div class="AboutModal__input-caption">Title</div>
          <input
            type="text"
            class="AboutModal__input"
            id="aboutTitle"
            v-model="fields[activeLocale].title"
          >
        </label>
        <label for="aboutSubTitle" class="AboutModal__label">
          <div class="AboutModal__input-caption">Sub Title</div>
          <input
            type="text"
            class="AboutModal__input"
            id="aboutSubTitle"
            v-model="fields[activeLocale]['sub-title']"
          >
        </label>
        <label for="aboutImage" class="AboutModal__label">
          <div class="AboutModal__input-caption">Image url</div>
          <input
            type="url"
            class="AboutModal__input"
            id="aboutImage"
            v-model="imageUrl"
            :disabled="!!image"
          >
          <label for="aboutUploadImage" class="AboutModal__add-photo-btn">
            <input
              type="file"
              id="aboutUploadImage"
              class="AboutModal__input--hidden"
              ref="photoFile"
              @change="addPhoto"
            >
            Add Photo
          </label>
        </label>
        <label for="aboutText" class="AboutModal__label">
          <div class="AboutModal__input-caption">Description</div>
          <textarea
            name="aboutText"
            id="aboutText"
            cols="30"
            rows="10"
            class="AboutModal__input AboutModal__input--textarea"
            v-model="fields[activeLocale].text"
          ></textarea>
        </label>
        <button type="submit" class="AboutModal__form-btn btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { mapMutations, mapGetters } from 'vuex';

const defaultFields = {
  'grand-title': '',
  title: '',
  'sub-title': '',
  text: '',
};

export default {
  name: 'AboutModal',
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
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['db', 'locale', 'storage']),
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    async addBlock() {
      if (this.image) {
        const url = await this.uploadPhoto();
        this.imageUrl = url;
      }

      const aboutData = {
        ua: {
          'grand-title': this.fields.ua['grand-title'],
          title: this.fields.ua.title,
          'sub-title': this.fields.ua['sub-title'],
          img: this.imageUrl,
          imgName: this.imageName,
          text: this.fields.ua.text,
        },
        en: {
          'grand-title': this.fields.en['grand-title'],
          title: this.fields.en.title,
          'sub-title': this.fields.en['sub-title'],
          img: this.imageUrl,
          imgName: this.imageName,
          text: this.fields.en.text,
        },
        orderId: Number(new Date().getTime()),
      };

      try {
        const docRef = await addDoc(collection(this.db, 'about-blocks'), aboutData);
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
      const aboutPhoto = this.photoFile.files[0];

      if (aboutPhoto.type.startsWith('image')) {
        this.imageUrl = aboutPhoto.name;
        this.image = aboutPhoto;
      } else {
        alert(`файл ${aboutPhoto.name} не є зображенням або файлом потрібного формату`);
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
      this.updateIsModalFormOpen({ isModalFormOpen: false });
    },
  },
  mounted() {
    this.activeLocale = this.locale;
  },
};
</script>
