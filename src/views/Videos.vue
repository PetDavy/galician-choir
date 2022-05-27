<template>
  <Loader :isVisible="isLoaderVisible" v-if="!isLoaderRemoved" />
  <section class="Videos" :class="{'Videos--modal': activeVideo}">
    <div class="Videos__content">
      <GrandTitle :titleText="titles[locale].videos" align="left:40" color="light" v-if="isLoaderRemoved" />
      <div class="Videos__grid">
        <div
          class="Videos__grid-item"
          v-for="video in videosList"
          :key="video.id"
          @click="activeVideo = video"
        >
          <div class="Videos__video-wrapper">
            <div
              class="Videos__video-preview"
              :style="{backgroundImage: `url(http://i3.ytimg.com/vi/${video.urlId}/hqdefault.jpg)`}"
            >
            </div>
          </div>
          <span class="Videos__video-title">{{video.title}}</span>
        </div>
      </div>

      <div class="Videos__modal-overlay" v-if="activeVideo" @click="activeVideo = null"></div>
      <div class="Videos__modal" v-if="activeVideo">
        <iframe
          class="Videos__modal-iframe"
          width="1280"
          height="720"
          :src="`https://www.youtube.com/embed/${activeVideo.urlId}`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import GrandTitle from '@/components/GrandTitle.vue';
import Loader from '@/components/Loader.vue';
import titles from '@/assets/texts/titles.json';

export default {
  name: 'Videos',
  components: {
    Loader,
    GrandTitle,
  },
  data() {
    return {
      isLoaderVisible: true,
      isLoaderRemoved: false,
      activeVideo: null,
      titles,
    };
  },
  computed: {
    ...mapGetters(['locale', 'videos']),
    videosList() {
      if (!this.videos.length) {
        return false;
      }

      const preparedVideos = this.videos.map((video) => {
        const videoUrlArrey = video.url.split('/');

        return {
          id: video.id,
          orderId: video.orderId,
          urlId: videoUrlArrey[videoUrlArrey.length - 1],
          title: video.title[this.locale],
        };
      });

      return preparedVideos.sort((videoA, videoB) => videoB.orderId - videoA.orderId);
    },
  },
  methods: {
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

<style lang="scss" scoped>
  .Videos {
    position: relative;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/galician-choir.appspot.com/o/meta%2Fvideo-bg-2.jpg?alt=media&token=46509269-a970-4962-a056-33b52235d7e8');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 85vh;

    &--modal {
      z-index: 6;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      opacity: 0.7;
      z-index: 1;
    }

    &__content {
      position: relative;
      max-width: 1600px;
      position: relative;
      padding: 250px 20px 100px;
      margin: 0 auto 0;
      z-index: 2;

      .Grand-title {
        top: 100px;
      }
    }

    &__grand-title-wrapper {
      position: relative;
      top: -200px;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    &__grid-item {
      border-radius: 4px;
      background-color: #fff;
      width: 100%;
      transition: transform 0.3s;
      cursor: pointer;

      &:hover {
        transform: scale(1.04);
      }
    }

    &__video-wrapper {
      position: relative;
      border-radius: 4px 4px 0 0;
      width: 100%;
      height: 190px;
      margin-bottom: 10px;
      border: 1px solid #1d1d1d;

      @media (max-width: 600px) {
        height: 240px;
      }
    }

    &__video-preview {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 4px 4px 0 0;
      background-size: cover;
      background-position: center;
    }

    &__video-title {
      display: block;
      color: #000;
      font-size: 18px;
      padding: 0 15px 20px;
    }

    &__modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 80%;
      width: 70%;
      height: 85%;
      background: #000;
      border-radius: 4px;

      @media (max-width: 1300px) {
        height: 60%;
      }

      @media (max-width: 1000px) {
        height: 50%;
      }

      @media (max-width: 600px) {
        width: 90%;
        height: 40%;
      }
    }

    &__modal-iframe {
      height: 100%;
      width: 100%;
    }

    &__modal-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
