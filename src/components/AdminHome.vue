<template>
  <div class="AdminHome">
    <div class="AdminHome__header">
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
    <div class="AdminHome__showcase" v-if="homeFields[activeLocale]">
      <div class="AdminHome__showcase-header">Showcase Main Image</div>
      <div class="AdminHome__showcase-preview" v-if="showcaseImageRef">
        <img
          v-if="!showcaseImage"
          :src="showcaseImageUrl"
          alt="showcase"
          class="AdminHome__image-preview"
        >
        <div class="AdminHome__showcase-preview-tools">
          <label for="showcaseUploadImage" class="AdminHome__add-photo-btn">
            <input
              type="file"
              id="showcaseUploadImage"
              class="AdminHome__input--hidden"
              ref="showcasePhotoFile"
              @change="uploadShowcasePhoto"
              v-if="!showcaseImage && !isOnSaveImage"
            >
            <input
              type="button"
              id="showcaseUploadImage"
              class="AdminHome__input--hidden"
              ref="showcasePhotoFile"
              @click="updateHomeData"
              v-if="showcaseImage || isOnSaveImage"
            >
            {{showcaseImage || isOnSaveImage ? 'Save Image' : 'Change Image'}}
          </label>
          <input
            type="url"
            class="AdminHome__input"
            id="aboutImage"
            v-model="showcaseImageUrl"
          >
        </div>
      </div>
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
    isOnSaveImage() {
      console.log('on save mode: ', this.showcaseImageUrl !== this.homeData.img);
      return this.showcaseImageUrl !== this.homeData.img;
    },
  },
  methods: {
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
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 1300px) {
      flex-direction: column;
    }

    &__header {
      width: 100%;
      padding-bottom: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }

    &__locales {
      display: flex;
      align-items: center;
    }

    &__locales-btn {
      margin: 0 5px;
      padding: 5px 8px;
      border: 1px solid #ccc;
      color: #000;
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;

      &--active {
        background-color: #000;
        color: #fff;
      }
    }

    &__showcase-header {
      font-size: 20px;
      margin-bottom: 15px;
      padding: 0 20px 20px;
      border-bottom: 1px solid #ccc;
      color: #0d1b3eb3;
      font-weight: 500;
      text-transform: capitalize;
    }

    &__showcase-preview {
      display: flex;
      padding: 0 20px;
      gap: 20px;

      @media (max-width: 550px) {
        flex-direction: column;
      }
    }

    &__image-preview {
      max-height: 180px;
      width: auto;
      object-fit: contain;
      object-position: center;
      border-radius: 4px;
    }

    &__showcase-preview-tools {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
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
      width: 50%;
      padding: 20px 0 40px;
      background-color: #fff;
      border-radius: 4px;
      align-self: flex-start;

      @media (max-width: 1300px) {
        width: 100%;
      }
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
      width: 100%;
      font-size: 23px;
      line-height: 22px;
      font-weight: 500;
      letter-spacing: 1px;
      color: #666;

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
        width: 0 !important;
        border-bottom: none;
        visibility: hidden;
        border-bottom: none;
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
