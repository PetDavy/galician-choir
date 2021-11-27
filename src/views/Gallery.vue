<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="Gallery">
    <div class="Gallery__content">
      <GrandTitle titleText="our photos" align="left:40" v-if="isLoaderRemoved" />
      <div
        class="Gallery__row-wrapper"
        v-for="row in rows"
        :key="row.id"
      >
        <div class="Gallery__row">
          <div
            class="Gallery__photo-wrapper"
            v-for="photo in row.columns"
            :key="photo.id"
            :class="{[`Gallery__row--${row.columns.length}-col`]: true}"
            @click="openPhotoModal(photo.id)"
          >
            <img :src="photo.url" alt="" class="Gallery__photo">
          </div>
        </div>
      </div>
    </div>
    <div
      class="Gallery__overlay"
      v-if="activePhoto"
      @click="triggerOverlay"
    >
      <div class="Gallery__modal-count">
        {{activePhotoIndex + 1}}/{{photos.length}}
      </div>
      <div class="Gallery__modal-arrow Gallery__modal-arrow--left" @click.stop="switchPhoto('previous')">
        <svg width="22" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6.7 11.33.35-.3a.47.47 0 0 0 0-.74l-4.1-3.6 18.46.1c.32 0 .59-.23.59-.52v-.43c0-.28-.26-.51-.59-.51l-18.45-.1L7.1 1.66a.47.47 0 0 0 0-.73l-.34-.3a.65.65 0 0 0-.84 0L.17 5.57a.47.47 0 0 0 0 .73l5.7 5.01c.22.2.6.2.83 0Z" fill="#8E8F9A"/></svg>
      </div>
      <div class="Gallery__modal-arrow Gallery__modal-arrow--right" @click.stop="switchPhoto('next')">
        <svg width="22" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.27.65-.34.3a.47.47 0 0 0 0 .73l4.12 3.59H.59c-.33 0-.59.23-.59.52v.42c0 .29.26.52.59.52h18.46l-4.12 3.59a.47.47 0 0 0 0 .73l.34.3c.23.2.6.2.84 0l5.72-4.99a.47.47 0 0 0 0-.72L16.1.65a.65.65 0 0 0-.84 0Z" fill="#8E8F9A"/></svg>
      </div>
      <div class="Gallery__modal-close"></div>
    </div>
    <div class="Gallery__modal">
      <img
        v-if="activePhoto"
        :src="activePhoto.url"
        alt=""
        class="Gallery__modal-photo"
      >
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { enableBodyScroll, disableBodyScroll } from '../utils/DOMHelper';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Gallery',
  data() {
    return {
      photos: [],
      activePhoto: false,
      isLoaderVisible: true,
      isLoaderRemoved: false,
    };
  },
  components: {
    GrandTitle,
    Loader,
  },
  computed: {
    ...mapGetters(['storage']),
    rows() {
      const rowsArray = [];
      const rowSizes = [3, 2];

      for (let i = 0, chunkIndex = 0; i < this.photos.length;) {
        const columns = this.photos.slice(i, i + rowSizes[chunkIndex]);
        rowsArray.push({ rowId: i, columns });

        i += rowSizes[chunkIndex];

        if (chunkIndex + 1 >= rowSizes.length) {
          chunkIndex = 0;
        } else {
          chunkIndex += 1;
        }
      }

      return rowsArray;
    },
    activePhotoIndex() {
      return this.photos.findIndex((photo) => photo.id === this.activePhoto.id);
    },
  },
  methods: {
    setPhotos() {
      const photosRef = ref(this.storage, '/photos/');

      listAll(photosRef)
        .then((res) => {
          res.items.forEach((itemRef, index) => {
            getDownloadURL(itemRef)
              .then((url) => {
                this.photos.push({ id: index, url });
              });
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    switchPhoto(type) {
      if (type === 'next') {
        this.switchToNext();
      } else {
        this.switchToPrevious();
      }
    },
    switchToNext() {
      if (this.activePhotoIndex === this.photos.length - 1) {
        [this.activePhoto] = this.photos;
      } else {
        this.activePhoto = this.photos[this.activePhotoIndex + 1];
      }
    },
    switchToPrevious() {
      if (this.activePhotoIndex === 0) {
        this.activePhoto = this.photos[this.photos.length - 1];
      } else {
        this.activePhoto = this.photos[this.activePhotoIndex - 1];
      }
    },
    triggerOverlay() {
      this.closePhotoModal();
    },
    openPhotoModal(photoId) {
      this.activePhoto = this.photos.find((photo) => photo.id === photoId);
      disableBodyScroll();
    },
    closePhotoModal() {
      this.activePhoto = null;
      enableBodyScroll();
    },
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
    keyHandler({ key }) {
      if (!this.activePhoto) {
        return;
      }

      if (key === 'ArrowLeft') {
        this.switchToPrevious();
      } else if (key === 'ArrowRight') {
        this.switchToNext();
      } else if (key === 'Escape') {
        this.closePhotoModal();
      }
    },
    wheelHandler({ wheelDelta }) {
      if (!this.activePhoto) {
        return;
      }

      if (wheelDelta > 0) {
        this.switchToNext();
      } else {
        this.switchToPrevious();
      }
    },
    setListeners() {
      window.addEventListener('keydown', this.keyHandler);
      window.addEventListener('wheel', this.wheelHandler);
    },
  },
  mounted() {
    this.setPhotos();
    this.setListeners();
    setTimeout(() => {
      this.isLoaderVisible = false;
      this.removeLoader();
    }, 1000);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keyHandler);
    window.removeEventListener('wheel', this.wheelHandler);
  },
};
</script>

<style lang="scss">
  .Gallery {
    background: #132b34;

    &__content {
      max-width: 2000px;
      position: relative;
      padding: 250px 20px;
      margin: 0 auto 0;

      .Grand-title {
        top: 100px;
      }
    }

    &__grand-title-wrapper {
      position: relative;
      top: -200px;
    }

    &__row-wrapper {
      width: 100%;
    }

    &__row {
      display: flex;

      @media (max-width: 700px) {
        flex-wrap: wrap;
      }

      &--1-col {
        &.Gallery__photo-wrapper {
          padding-top: 35%;
          max-width: 850px;
          margin: 0 auto;
        }
      }

      &--2-col {
        &.Gallery__photo-wrapper {
          padding-top: 26%;
        }
      }

      &--3-col {
        &.Gallery__photo-wrapper {
          padding-top: 20%;
        }
      }

      &--1-col,
      &--2-col,
      &--3-col {
        &.Gallery__photo-wrapper {
          @media (max-width: 700px) {
            padding-top: 55%;
          }
        }
      }
    }

    &__photo-wrapper {
      width: 100%;
      position: relative;
      margin: 0 5px 10px 5px;
      cursor: pointer;
    }

    &__photo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      transition: opacity .3s;

      &:hover {
        opacity: 0.8;
      }
    }

    &__modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-top: 85vh;
      width: auto;
      z-index: 6;
    }

    &__modal-photo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      object-fit: contain;
      object-position: center;
      transform: translateX(-50%);
      width: auto;
      max-width: 80vw;

      @media (max-width: 900px) {
        max-width: 70vw;
      }
    }

    &__modal-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.6;
      cursor: pointer;

      path {
        transition: fill .3s;
      }

      &:hover {
        & path {
          fill: #fff;
        }
      }

      &--left {
        left: 50px;
        transition: left .2s;

         &:active {
          left: 54px;
        }
      }

      &--right {
        right: 50px;
        transition: right .2s;

        &:active {
          right: 54px;
        }
      }
    }

    &__modal-count {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #8e8f9a;
      font-size: 16px;
      letter-spacing: 1px;
    }

    &__modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 22px;
      height: 22px;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        content: '';
        transition: background-color .3s;

        &:hover {
          background-color: #fff;
        }
      }

      &::before {
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%) rotate(-45deg);
        height: 2px;
        background-color: #8e8f9a;
      }

      &::after {
        left: 50%;
        top: 0;
        bottom: 0;
        transform: translateX(-50%) rotate(-45deg);
        width: 2px;
        background-color: #8e8f9a;
      }
    }

    &__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #111111;
      z-index: 5;
    }
  }
</style>
