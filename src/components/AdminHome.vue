<template>
  <div class="AdminHome">
    <div class="AdminHome__header">
      <h2 class="AdminHome__title">Home Page</h2>
      <div class="AdminHome__locales">
        <div
          class="AdminHome__locales-btn"
          :class="{'AdminHome__locales-btn--active': localeItem === activeLocale}"
          v-for="localeItem in localesList"
          :key="localeItem"
          @click="activeLocale = localeItem"
        >
          {{localeItem}}
        </div>
      </div>
    </div>
    <!-- SHOWCASE -->
    <div class="AdminHome__showcase" v-if="homeFields[activeLocale]">
      <div class="AdminHome__inputs-row" v-if="showcaseImageRef">
        <img
          v-if="!showcaseImage"
          :src="showcaseImageUrl"
          alt="showcase"
          class="AdminHome__image-preview AdminHome__inputs-row-item"
        >
        <div class="AdminHome__inputs-row-item">
          <label for="showcaseUploadImage" class="AdminHome__add-photo-btn">
            <input
              type="file"
              id="showcaseUploadImage"
              class="AdminHome__input--hidden"
              ref="showcasePhotoFile"
              @change="uploadShowcasePhoto"
              v-if="!showcaseImage"
            >
            <input
              type="button"
              id="showcaseUploadImage"
              class="AdminHome__input--hidden"
              ref="showcasePhotoFile"
              @click="updateHomeData"
              v-if="showcaseImage"
            >
            {{showcaseImage ? 'Save Image' : 'Change Image'}}
          </label>
          <input
            type="url"
            class="AdminHome__input"
            id="aboutImage"
            v-model="showcaseImageUrl"
          >
        </div>
      </div>
      <label for="home-title" class="AdminHome__label">
        <span class="AdminHome__input-name">Main Title</span>
        <input
          type="text"
          id="home-title"
          class="AdminHome__input"
          v-model="homeFields[activeLocale].title"
          :disabled="!onTitleEdit"
        >
        <button
          class="AdminHome__save-btn"
          @click="handleClick"
        >
          {{onTitleEdit ? 'save' : 'edit'}}
        </button>
      </label>
    </div>
    <Cooperations :locale="activeLocale" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ref } from 'vue';
import {
  ref as firebaseRef,
  listAll,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Cooperations from '@/components/Cooperations.vue';

export default {
  name: 'AdminHome',
  setup() {
    const showcasePhotoFile = ref(null);

    return { showcasePhotoFile };
  },
  components: {
    Cooperations,
  },
  data() {
    return {
      homeFields: {
        ua: { title: '' },
        en: { title: '' },
      },
      showcaseImageUrl: null,
      showcaseImage: null,
      showcaseImageRef: null,
      onTitleEdit: false,

      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['db', 'homeData', 'locale', 'storage']),
  },
  methods: {
    handleClick() {
      if (this.onTitleEdit) {
        this.updateHomeData();
      } else {
        this.onTitleEdit = true;
      }
    },
    setHomeData() {
      this.homeFields = {
        ua: this.homeData.ua,
        en: this.homeData.en,
      };
      this.showcaseImageUrl = this.homeData.img;
    },
    setShowcaseImageRef() {
      const photosRef = firebaseRef(this.storage, '/showcase/');

      listAll(photosRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            this.showcaseImageRef = itemRef;
            getDownloadURL(itemRef)
              .then((url) => {
                console.log(url);
              });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    uploadShowcasePhoto() {
      const newShowcasePhoto = this.showcasePhotoFile.files[0];

      if (newShowcasePhoto.type.startsWith('image')) {
        this.showcaseImage = newShowcasePhoto;
        this.showcaseImageUrl = newShowcasePhoto.name;
      } else {
        alert(`файл ${newShowcasePhoto.name} не є зображенням або файлом потрібного формату`);
      }
    },
    async updateHomeData() {
      if (this.showcaseImage) {
        const url = await this.saveShowcaseImage();
        this.showcaseImageUrl = url;
      }

      const newHomeData = {
        ua: {
          ...this.homeFields.ua,
        },
        en: {
          ...this.homeFields.en,
        },
        img: this.showcaseImageUrl,
      };
      try {
        const homeDataRef = doc(this.db, 'home', this.homeData.id);

        const docRef = await setDoc(homeDataRef, newHomeData);

        console.log('home data updated ID: ', docRef);
        this.showcaseImage = null;
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    },
    async saveShowcaseImage() {
      const photoName = `showcase${new Date().getTime()}-${this.showcaseImageUrl}`;
      const storageRef = firebaseRef(this.storage, `showcase/${photoName}`);

      try {
        const snapshot = await uploadBytes(storageRef, this.showcaseImage);
        const url = await getDownloadURL(snapshot.ref);

        const desertRef = firebaseRef(this.storage, `showcase/${this.showcaseImageRef.name}`);
        await deleteObject(desertRef);

        return url;
      } catch (error) {
        console.warn(error);
        console.log('couldn\'t update image');
        return this.showcaseImageUrl;
      }
    },
  },
  mounted() {
    this.activeLocale = this.locale;
    this.setHomeData();
    this.setShowcaseImageRef();
  },
};
</script>

<style lang="scss" scoped>
  .AdminHome {
    &__title {
      font-size: 30px;
      margin-bottom: 25px;
      margin-right: 25px;
      color: #fff;
    }

    &__header {
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    &__showcase {
      margin-bottom: 40px;
    }

    &__label {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    &__input-name {
      display: block;
      width: 100%;
      font-size: 15px;
      color: #ccc;
      margin-bottom: 5px;
    }

    &__input {
      border: none;
      border-bottom: 1px solid #ccc;
      height: 50px;
      padding: 0 20px 0 10px;
      background-color: transparent;
      margin-right: 10px;
      width: 50%;
      font-size: 28px;
      line-height: 22px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #000;

      &:focus {
        outline: none;
      }

      &--textarea {
        min-height: 80px;
        height: initial;
        resize: vertical;
        line-height: 28px;
      }

      &--hidden {
        position: absolute;
        width: 0;
        visibility: hidden;
      }
    }

    &__save-btn {
      height: 50px;
      border: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
      min-width: 120px;
      border-radius: 3px;
      cursor: pointer;
    }
  }
</style>
