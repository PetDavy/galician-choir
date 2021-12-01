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

<style lang="scss" scoped>
  .AboutUpdate {
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
      margin-bottom: 20px;
    }

    &__inputs-row-item {
      margin-right: 20px;
      width: 100%;

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

      &#eventImage {
        width: 100%;
      }
    }

    &__image-preview {
      max-height: 100px;
      width: auto;
      object-fit: contain;
      object-position: center;
      margin-right: 20px;
    }

    &__add-photo-btn {
      height: 40px;
      margin-bottom: 10px;
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
