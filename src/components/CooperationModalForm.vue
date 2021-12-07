<template>
  <div class="CooperationModal">
    <div class="CooperationModal__overlay" @click="closeModal"></div>
    <div class="CooperationModal__modal">
      <div class="CooperationModal__modal-close-btn" @click="closeModal"></div>
      <form class="CooperationModal__form" @submit.prevent="addCooperation">
        <div class="CooperationModal__header">
          <h3 class="CooperationModal__form-title">New Block</h3>
          <div class="CooperationModal__locales">
            <div
              class="CooperationModal__locales-btn"
              :class="{'CooperationModal__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <label for="cooperationTitle" class="CooperationModal__label">
          <div class="CooperationModal__input-caption">Title</div>
          <input
            type="text"
            class="CooperationModal__input"
            id="cooperationTitle"
            v-model="fields[activeLocale].title"
          >
        </label>
        <label for="cooperationText" class="CooperationModal__label">
          <div class="CooperationModal__input-caption">Text</div>
          <input
            type="text"
            class="CooperationModal__input"
            id="cooperationText"
            v-model="fields[activeLocale].text"
          >
        </label>
        <label for="aboutImage" class="CooperationModal__label">
          <div class="CooperationModal__input-caption">Image url</div>
          <input
            type="url"
            class="CooperationModal__input"
            id="aboutImage"
            v-model="imageUrl"
            :disabled="!!image"
          >
          <label for="aboutUploadImage" class="CooperationModal__add-photo-btn">
            <input
              type="file"
              id="aboutUploadImage"
              class="CooperationModal__input--hidden"
              ref="cooperationPhotoFile"
              @change="addPhoto"
            >
            Add Photo
          </label>
        </label>
        <label for="cooperationSVG" class="CooperationModal__label">
          <div class="CooperationModal__input-caption">SVG icon code</div>
          <input
            type="text"
            class="CooperationModal__input"
            id="cooperationSVG"
            v-model="svg"
          >
        </label>
        <button type="submit" class="CooperationModal__form-btn btn">save</button>
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
  title: '',
  text: '',
};

export default {
  name: 'CooperationModal',
  setup() {
    const cooperationPhotoFile = ref(null);

    return { cooperationPhotoFile };
  },
  data() {
    return {
      fields: {
        ua: { ...defaultFields },
        en: { ...defaultFields },
      },
      imageUrl: '',
      imageName: '',
      image: null,
      svg: '',
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['db', 'cooperations', 'locale', 'storage']),
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    async addCooperation() {
      if (this.image) {
        const url = await this.uploadPhoto();
        this.imageUrl = url;
      }

      const cooperationData = {
        ua: {
          title: this.fields.ua.title,
          text: this.fields.ua.text,
        },
        en: {
          title: this.fields.en.title,
          text: this.fields.en.text,
        },
        orderId: Number(new Date().getTime()),
        img: this.imageUrl,
        imgName: this.imageName,
        svg: this.svg,
      };

      console.log('cooperationData: ', cooperationData);

      try {
        const docRef = await addDoc(collection(this.db, 'cooperations'), cooperationData);
        console.log('Document written with ID: ', docRef.id);
        this.closeModal();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    addPhoto() {
      const cooperationPhoto = this.cooperationPhotoFile.files[0];

      if (cooperationPhoto.type.startsWith('image')) {
        this.imageUrl = cooperationPhoto.name;
        this.image = cooperationPhoto;
      } else {
        alert(`файл ${cooperationPhoto.name} не є зображенням або файлом потрібного формату`);
      }
    },
    async uploadPhoto() {
      const photoName = `cooperation-logo-${new Date().getTime()}-${this.imageUrl}`;
      this.imageName = photoName;
      const storageRef = firebaseRef(this.storage, `cooperations/${photoName}`);

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
