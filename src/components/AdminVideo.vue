<template>
  <QuestionPopup
    :questionData="questionPopupData"
    questionText="Are you sure you want to delete this video?"
    @handlYes="removeVideo"
    @handlNo="questionPopupData = null"
    v-if="questionPopupData"
  />
  <div class="AdminVideo">
    <div class="AdminVideo__list">
      <button class="AdminVideo__add-video" @click="openEventModal">add video</button>
      <div
        class="AdminVideo__video"
        v-for="video in videosList"
        :key="video.id"
        @click="activeVideo = video"
      >
        <div class="AdminVideo__video-wrapper">
          <div
            class="AdminVideo__video-preview"
            :style="{backgroundImage: `url(http://i3.ytimg.com/vi/${video.urlId}/hqdefault.jpg)`}"
          >
          </div>
        </div>
        <p class="AdminVideo__video-title">{{video.title}}</p>
        <Tools @delete="openQuestionPopup(video)" :editType="false" />
      </div>
    </div>
    <div class="AdminVideo__video-window" v-if="activeVideo">
      <iframe
        class="AdminVideo__video-window-iframe"
        width="1280"
        height="720"
        :src="`https://www.youtube.com/embed/${activeVideo.urlId}`"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { doc, deleteDoc } from 'firebase/firestore';
import QuestionPopup from '@/components/QuestionPopup.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'AdminVideo',
  components: {
    QuestionPopup,
    Tools,
  },
  data() {
    return {
      activeVideo: null,
      questionPopupData: null,
    };
  },
  computed: {
    ...mapGetters(['db', 'locale', 'videos']),
    videosList() {
      if (!this.videos.length) {
        return false;
      }

      return this.videos.map((video) => {
        const videoUrlArrey = video.url.split('/');

        return {
          id: video.id,
          urlId: videoUrlArrey[videoUrlArrey.length - 1],
          title: video.title[this.locale],
        };
      });
    },
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    openQuestionPopup(video) {
      this.questionPopupData = video;
    },
    async removeVideo(data) {
      this.questionPopupData = null;

      try {
        await deleteDoc(doc(this.db, 'videos', data.id));
      } catch (error) {
        console.error('Coudn`t remove video');
        console.log(error);
      } finally {
        this.activeVideo = null;
      }
    },
    openEventModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: true });
    },
  },
};
</script>

<style lang="scss" scoped>
  .AdminVideo {
    position: relative;
    padding: 20px;
    flex: 1;
    display: flex;
    min-height: 70vh;

    @media (max-width: 1000px) {
      flex-direction: column;
    }

    &__list {
      width: 65%;

      @media (max-width: 1000px) {
        width: 100%;
      }
    }

    &__add-video {
      background-color: #15aaff;
      box-shadow: 0 2px 5px rgba(21, 170, 255, 0.4);
      height: 40px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px 22px;
      border-radius: 5px;
      margin-bottom: 20px;
      border: none;
      color: #fff;
      font-size: 15px;
      text-transform: capitalize;
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: 0 2px 5px rgba(21, 170, 255, 0.8);
      }
    }

    &__video {
      position: relative;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.01);
      }
    }

    .Tools__tools {
      top: 0;
      right: 20px;
    }

    &__video-wrapper {
      margin-right: 20px;
      position: relative;
      border-radius: 4px;
      width: 130px;
      height: 80px;
      border: 1px solid #1d1d1d;
      flex-shrink: 0;
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
      padding-right: 40px;
    }

    &__video-window {
      position: sticky;
      top: -40px;
      width: 35%;
      height: 36vh;
      padding: 60px 0 0 20px;

      @media (max-width: 1400px) {
        height: 30vh;
      }

      @media (max-width: 1000px) {
        order: -1;
        top: 20px;
        padding: 0;
        width: 100%;
        box-shadow: 0 40px 0 #F1F4F6, -20px 40px 0 #F1F4F6, 20px 40px 0 #F1F4F6, 0 -20px 0 #F1F4F6;
      }
    }

    &__video-window-iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
