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
    ></div>
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
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Gallery',
  data() {
    return {
      photos: [
        { id: 1, url: 'https://lumiere.qodeinteractive.com/wp-content/uploads/2017/09/port-h3-img-1.jpg' },
        { id: 2, url: 'https://lumiere.qodeinteractive.com/wp-content/uploads/2017/09/port-h3-img-4.jpg' },
        { id: 3, url: 'https://lumiere.qodeinteractive.com/wp-content/uploads/2017/09/port-h3-img-10.jpg' },
        { id: 4, url: 'https://snapster.foxthemes.me/wp-content/uploads/2020/08/8.11.jpg' },
        { id: 5, url: 'https://snapster.foxthemes.me/wp-content/uploads/2020/08/8.9.jpg' },
        { id: 6, url: 'https://firebasestorage.googleapis.com/v0/b/pari-art-music-orchestra.appspot.com/o/galleryImages%2FIMG_0073-min.JPG?alt=media&token=c885aedf-069b-453a-bae1-a01913532f39' },
        { id: 7, url: 'https://lumiere.qodeinteractive.com/wp-content/uploads/2017/09/port-h3-img-15.jpg' },
        { id: 8, url: 'https://lumiere.qodeinteractive.com/wp-content/uploads/2017/08/port-h3-img-20.jpg' },
      ],
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
      position: relative;
      padding: 250px 0;
      margin: 0 20px 0;

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
