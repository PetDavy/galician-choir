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

<style lang="scss" scoped>
  .CooperationModal {
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

    &__header {
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__form-title {
      font-size: 22px;
      color: #ccc;
      flex: 1;
    }

    &__locales {
      display: flex;
      align-items: center;
    }

    &__locales-btn {
      margin: 0 5px;
      padding: 5px 8px;
      border: 1px solid #ccc;
      color: #fff;
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;

      &--active {
        background-color: #fff;
        color: #000;
      }
    }

    &__inputs-row {
      display: flex;
      align-items: center;
    }

    &__inputs-row-item {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__label {
      position: relative;
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

      &--hidden {
        position: absolute;
        width: 0;
        visibility: hidden;
      }

      &#aboutImage {
        padding-left: 145px;
      }
    }

    &__add-photo-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 40px;
      padding: 10px 25px;
      background-color: #ccc;
      color: #000;
      font-size: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
  }
</style>
