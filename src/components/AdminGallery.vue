<template>
  <div class="AdminGallery">
    <div class="AdminGallery__title">Gallery</div>
    <div class="AdminGallery__form-wrapper">
      <form class="AdminGallery__form">
        <label
          for="addPhotoInput"
          class="AdminGallery__label"
          @drop.prevent="dropHandler"
          @dragover.prevent
        >
          <input
            type="file"
            id="addPhotoInput"
            class="AdminGallery__input"
            name="photoFile"
            ref="photoFile"
            @change="uploadPhoto"
          >
          <div
            class="AdminGallery__progress-bar"
            :class="{'AdminGallery__progress-bar--completed': uploadProgress === 100}"
            :style="{width: `${uploadProgress}%`}"
          ></div>
        </label>
      </form>
      <div class="AdminGallery__store-list-container">
        <div class="AdminGallery__store-list">
          <div
            class="AdminGallery__store-list-item"
            v-for="photo in storedPhotos"
            :key="photo.name"
            :class="{'AdminGallery__store-list-item--uploaded': uploadedPhotos.includes(photo.name)}"
          >
            {{photo.name}}
          </div>
        </div>
      </div>
    </div>
    <div
      class="AdminGallery__store-btn btn"
      v-if="storedPhotos.length"
      @click="uploadPhotos"
    >
      Upload Photos
    </div>
  </div>
  <div class="AdminGalleryList">
    <div class="AdminGalleryList__photos-list">
      <div
        class="AdminGalleryList__photos-item"
        v-for="photo in photos"
        :key="photo"
      >
        <img
          :src="photo.url"
          alt=""
          class="AdminGalleryList__photo"
        >
        <span class="AdminGalleryList__photo-name">{{photo.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import {
  ref as firebaseRef,
  listAll,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

export default {
  name: 'AdminGallery',
  setup() {
    const photoFile = ref(null);

    return { photoFile };
  },
  data() {
    return {
      photos: [],
      uploadProgress: 0,
    };
  },
  computed: {
    ...mapGetters(['storage', 'storedPhotos', 'uploadedPhotos']),
  },
  methods: {
    ...mapMutations(['addStoredPhoto', 'addUploadedPhoto']),
    async uploadPhoto() {
      const newPhoto = this.photoFile.files[0];

      if (newPhoto.type.startsWith('image')) {
        this.addStoredPhoto({ newPhoto });
      } else {
        alert(`файл ${newPhoto.name} не є зображенням або файлом потрібного формату`);
      }
    },
    dropHandler(event) {
      const { items } = event.dataTransfer;
      const { files } = event.dataTransfer;
      let itemsList = items;

      if (!itemsList) {
        itemsList = files;
      }

      [...itemsList].forEach((item) => {
        if (item.kind === 'file' && item.type.startsWith('image')) {
          const newPhoto = item.getAsFile();
          this.addStoredPhoto({ newPhoto });
        } else {
          alert(`файл ${item.getAsFile().name} не є зображенням або файлом потрібного формату`);
        }
      });
    },
    uploadPhotos() {
      let freeMaxId = 1;

      if (this.photos.length) {
        const photosNames = this.photos.map((photo) => parseInt(photo.name.split('-')[0], 10));
        freeMaxId = Math.max(...photosNames) + 1;
      }

      this.storedPhotos.forEach((photo, i) => {
        const storageRef = firebaseRef(this.storage, `photos/${freeMaxId + i}-${photo.name}`);

        uploadBytes(storageRef, photo).then((snapshot) => { // fix to Promise.all then clear this.photos
          this.addUploadedPhoto({ uploadedPhoto: photo.name });
          this.uploadProgress += 100 / this.storedPhotos.length;

          if (i === this.storedPhotos.length - 1) {
            this.photos = [];
            this.setPhotos();
            this.clearProgressBar();
          }
        });
      });
    },
    clearProgressBar() {
      setTimeout(() => {
        this.uploadProgress = 0;
      }, 2400);
    },
    setPhotos() {
      const photosRef = firebaseRef(this.storage, '/photos/');

      listAll(photosRef)
        .then((res) => {
          res.items.forEach((itemRef, index) => {
            console.log(itemRef);
            getDownloadURL(itemRef)
              .then((url) => {
                this.photos.push({ id: index, url, name: itemRef.name });
              });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.setPhotos();
  },
};
</script>

<style lang="scss" scoped>
  .AdminGallery {
    background-color: #6e8087;
    box-shadow: 0 25px 45px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 15px;

    &__form-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &__form {
      margin-right: 40px;
      width: 50%;
    }

    &__store-list-container {
      position: relative;
      height: 250px;
      flex-grow: 1;
      overflow-y: auto;
    }

    &__store-list {

    }

    &__store-list-item {
      width: 100%;
      margin-bottom: 8px;
      font-size: 16px;
      padding: 4px 15px;
      background-color: rgba(255, 255, 255, 0.1);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      color: #ccc;

      &--uploaded {
        text-shadow: none;
        background-color: rgba(81, 216, 28, 0.1);
      }
    }

    &__title {
      margin-bottom: 30px;
      font-size: 30px;
      margin-bottom: 25px;
      margin-right: 25px;
      color: #fff;
    }

    &__label {
      position: relative;
      display: block;
      height: 250px;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: background-color .3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 20px;
        width: 4px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, 0.8);
        transform: translate(-50%, -50%);
        z-index: 2;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 4px;
        border-radius: 3px;
        background-color: rgba(255, 255, 255, 0.7);
        transform: translate(-50%, -50%);
        z-index: 2;
      }
    }

    &__input {
      position: absolute;
      visibility: hidden;
    }

    &__progress-bar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(48, 209, 96, 0.3);
      transition: width 1s, opacity .4s ease-in 2s;
      z-index: 1;

      &--completed {
        opacity: 0;
      }
    }
  }

  .AdminGalleryList {
    background-color: #6e8087;
    box-shadow: 0 25px 45px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 15px;

    &__photos-list {

    }

    &__photos-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 5px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.1);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    &__photo {
      margin-right: 20px;
      height: 100%;
      width: 40px;
    }

    &__photo-name {
      font-size: 20px;
      color: #ccc;
      font-weight: 500;
    }
  }
</style>
