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
      <div class="Gallery__modal-arrow Gallery__modal-arrow--left" @click.stop="switchPhoto('previous')">
        <svg width="42" height="77" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.4 35.6 31.7 1.7a3.5 3.5 0 0 1 5.3 0l3.5 4a4.5 4.5 0 0 1 0 5.9l-24 27 24.2 26.8a4.5 4.5 0 0 1 0 5.9L37 75.2a3.5 3.5 0 0 1-5.3 0L1.4 41.5a4.5 4.5 0 0 1 0-6Z" fill="#fff"/></svg>
      </div>
      <div class="Gallery__modal-arrow Gallery__modal-arrow--right" @click.stop="switchPhoto('next')">
        <svg width="42" height="77" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.6 41.5 10.2 75.2a3.5 3.5 0 0 1-5.3 0l-3.5-4a4.5 4.5 0 0 1 0-5.8l24-26.9-24-26.9a4.5 4.5 0 0 1 0-5.9l3.5-4a3.5 3.5 0 0 1 5.3 0l30.4 33.9a4.5 4.5 0 0 1 0 5.9Z" fill="#fff"/></svg>
      </div>
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
      const activePhotoIbdex = this.photos.findIndex((photo) => photo.id === this.activePhoto.id);

      if (type === 'next') {
        if (activePhotoIbdex === this.photos.length - 1) {
          [this.activePhoto] = this.photos;
        } else {
          this.activePhoto = this.photos[activePhotoIbdex + 1];
        }
      } else if (activePhotoIbdex === 0) {
        this.activePhoto = this.photos[this.photos.length - 1];
      } else {
        this.activePhoto = this.photos[activePhotoIbdex - 1];
      }
    },
    triggerOverlay() {
      this.closePhotoModal();
    },
    openPhotoModal(photoId) {
      this.activePhoto = this.photos.find((photo) => photo.id === photoId);
    },
    closePhotoModal() {
      this.activePhoto = null;
    },
    removeLoader() {
      setTimeout(() => {
        this.isLoaderRemoved = true;
      }, 500);
    },
  },
  mounted() {
    this.setPhotos();
    setTimeout(() => {
      this.isLoaderVisible = false;
      this.removeLoader();
    }, 1000);
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

      &--1-col {
        &.Gallery__photo-wrapper {
          padding-top: 500px;
          max-width: 850px;
          margin: 0 auto;
        }
      }

      &--2-col {
        &.Gallery__photo-wrapper {
          padding-top: 440px;
        }
      }
    }

    &__photo-wrapper {
      width: 100%;
      position: relative;
      margin: 0 5px 10px 5px;
      padding-top: 380px;
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
    }

    &__modal-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.6;
      cursor: pointer;

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
