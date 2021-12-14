<template>
  <div class="VideoModal">
    <div class="VideoModal__overlay" @click="closeModal"></div>
    <div class="VideoModal__modal">
      <div class="VideoModal__modal-close-btn" @click="closeModal"></div>
      <form class="VideoModal__form" @submit.prevent="addVideo">
        <div class="VideoModal__header">
          <h3 class="VideoModal__form-title">New Video</h3>
          <div class="VideoModal__locales">
            <div
              class="VideoModal__locales-btn"
              :class="{'VideoModal__locales-btn--active': localeItem === activeLocale}"
              v-for="localeItem in localesList"
              :key="localeItem"
              @click="activeLocale = localeItem"
            >
              {{localeItem}}
            </div>
          </div>
        </div>
        <label for="videoUrl" class="VideoModal__label">
          <div class="VideoModal__input-caption">Youtube video url</div>
          <input
            type="text"
            class="VideoModal__input"
            id="videoUrl"
            v-model="videoUrl"
          >
        </label>
        <label for="videoName" class="VideoModal__label">
          <div class="VideoModal__input-caption">Name</div>
          <input
            type="text"
            class="VideoModal__input"
            id="videoName"
            v-model="title[activeLocale]"
          >
        </label>
        <button type="submit" class="VideoModal__form-btn btn">save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'VideoModal',
  data() {
    return {
      title: {
        en: '',
        ua: '',
      },
      videoUrl: '',
      activeLocale: 'ua',
      localesList: ['ua', 'en'],
    };
  },
  computed: {
    ...mapGetters(['db', 'videos', 'locale', 'storage']),
  },
  methods: {
    ...mapMutations(['updateIsModalFormOpen']),
    async addVideo() {
      const videoData = {
        title: {
          en: this.title.en,
          ua: this.title.ua,
        },
        orderId: Number(new Date().getTime()),
        url: this.videoUrl,
      };

      try {
        const docRef = await addDoc(collection(this.db, 'videos'), videoData);
        console.log('Document written with ID: ', docRef.id);
        this.closeModal();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
    closeModal() {
      this.updateIsModalFormOpen({ isModalFormOpen: false });
    },
  },
  mounted() {
    this.activeLocale = this.locale;
  },
};
</script>
