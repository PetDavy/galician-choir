<template>
  <div class="AdminGallery">
    <div class="AdminGalleryList">
      <div class="AdminGalleryList__photos-list">
        <div
          class="AdminGalleryList__photos-item"
          v-for="photo in photos"
          :key="photo.name"
        >
          <img
            :src="photo.url"
            alt=""
            class="AdminGalleryList__photo"
          >
          <span class="AdminGalleryList__photo-name">{{photo.name}}</span>
          <span class="AdminGalleryList__photo-remove-btn" @click="removePhoto(photo)"></span>
        </div>
      </div>
    </div>
    <div class="AdminGallery__form-wrapper">
      <form class="AdminGallery__form">
        <label
          for="addPhotoInput"
          class="AdminGallery__label"
          title="Ckick area for uploading one file"
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
      <div
        class="AdminGallery__store-btn btn"
        v-if="storedPhotos.length"
        @click="uploadPhotos"
      >
        Upload Photos
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
  deleteObject,
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
    uploadPhoto() {
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
      const promiseFiles = [];

      if (this.photos.length) {
        const photosNames = this.photos.map((photo) => parseInt(photo.name.split('-')[0], 10));
        freeMaxId = Math.max(...photosNames) + 1;
      }

      this.storedPhotos.forEach((photo, i) => {
        const storageRef = firebaseRef(this.storage, `photos/${freeMaxId + i}-${photo.name}`);

        const promiseFile = uploadBytes(storageRef, photo).then((snapshot) => { // fix to Promise.all then clear this.photos
          this.addUploadedPhoto({ uploadedPhoto: photo.name });
          this.uploadProgress += 100 / this.storedPhotos.length;

          return i;
        });

        promiseFiles.push(promiseFile);
      });

      Promise.all(promiseFiles).then(() => {
        this.photos = [];
        this.setPhotos();
        this.clearProgressBar();
      });
    },
    clearProgressBar() {
      setTimeout(() => {
        this.uploadProgress = 0;
      }, 2400);
    },
    removePhoto(photo) {
      const desertRef = firebaseRef(this.storage, `photos/${photo.name}`);

      deleteObject(desertRef)
        .then(() => {
          this.photos = this.photos.filter((photoItem) => photoItem.name !== photo.name);
        }).catch((error) => {
          console.warn(error);
        });
    },
    setPhotos() {
      const photosRef = firebaseRef(this.storage, '/photos/');

      listAll(photosRef)
        .then((res) => {
          res.items.forEach((itemRef, index) => {
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
    padding: 20px;
    flex: 1;
    display: flex;

    @media (max-width: 1100px) {
      flex-direction: column;
    }

    &__form-wrapper {
      display: flex;
      flex-direction: column;
      margin: 15px 0 20px;
      padding: 0 20px 20px;
      border-radius: 4px;
      width: 50%;
      align-self: flex-start;

      @media (max-width: 1100px) {
        width: 100%;
        order: -1;
      }
    }

    &__form {
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
    }

    &__store-list-container {
      position: relative;
      max-height: 250px;
      flex-grow: 1;
      overflow-y: auto;
      margin-bottom: 30px;
    }

    &__store-list {
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:empty {
        padding: 0;
      }
    }

    &__store-list-item {
      width: 100%;
      margin-bottom: 8px;
      font-size: 16px;
      padding: 5px 15px;
      background-color: #fff;
      border-radius: 2px;
      color: #0d1b3eb3;
      font-weight: 500;

      &--uploaded {
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
      border-radius: 4px;
      border: 2px dashed #ccc;
      background-color: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: background-color .3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }

      &::before {
        content: 'Drag Your Files Here';
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        border-radius: 2px;
        color: #ccc;
        font-size: 20px;
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
    margin-bottom: 20px;
    padding: 15px;
    width: 50%;

    @media (max-width: 1100px) {
      width: 100%;
    }

    &__photos-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding: 12px;
      height: 90px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }

    &__photo {
      margin-right: 20px;
      height: 100%;
      width: 80px;
      border-radius: 4px;
      object-fit: cover;
      object-position: center;
    }

    &__photo-name {
      font-size: 18px;
      color: #0d1b3eb3;
      font-weight: 400;
      align-self: flex-start;
      padding-right: 25px;
      word-break: break-all;
    }

    &__photo-remove-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: transform .3s;

      &:hover {
        transform: scale(1.1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #c93c3c;
        border-radius: 1px;
        transform: translateY(-50%) rotate(-45deg);
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: #c93c3c;
        border-radius: 1px;
        transform: translateX(-50%) rotate(-45deg);
      }
    }
  }
</style>
