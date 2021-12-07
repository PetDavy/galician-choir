<template>
  <div class="Socials">
    <div class="Socials__content">
      <div class="Socials__header">
        Socials
        <button class="Socials__update-btn" @click="updateSocials">update socials</button>
      </div>
      <div class="Socials__list">
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.facebook}">
          <span class="Socials__list-item-caption">Facebook</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="facebook"
          >
        </label>
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.instagram}">
          <span class="Socials__list-item-caption">Instagram</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="instagram"
          >
        </label>
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.youtube}">
          <span class="Socials__list-item-caption">Youtube</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="youtube"
          >
        </label>
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.twitter}">
          <span class="Socials__list-item-caption">Twitter</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="twitter"
          >
        </label>
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.tiktok}">
          <span class="Socials__list-item-caption">Tiktok</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="tiktok"
          >
        </label>
        <label class="Socials__list-item" :class="{'Socials__list-item--active': socials.soundcloud}">
          <span class="Socials__list-item-caption">SoundCloud</span>
          <input
            type="url"
            class="Socials__list-item-input"
            v-model="soundcloud"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  setDoc,
  doc,
} from 'firebase/firestore';

export default {
  name: 'Socials',
  data() {
    return {
      facebook: '',
      instagram: '',
      youtube: '',
      twitter: '',
      tiktok: '',
      icloud: '',
    };
  },
  computed: {
    ...mapGetters(['socials', 'db']),
  },
  setLocalSocials() {

  },
  watch: {
    socials() {
      this.setUpdateSocials();
    },
  },
  methods: {
    async updateSocials() {
      const socialsData = {
        facebook: this.facebook,
        instagram: this.instagram,
        youtube: this.youtube,
        twitter: this.twitter,
        tiktok: this.tiktok,
        soundcloud: this.soundcloud,
      };

      try {
        const cityRef = doc(this.db, 'socials', this.socials.id);

        const docRef = await setDoc(cityRef, socialsData);

        console.log('Document updated ID: ', docRef);
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    },
    setUpdateSocials() {
      this.facebook = this.socials.facebook;
      this.instagram = this.socials.instagram;
      this.youtube = this.socials.youtube;
      this.twitter = this.socials.twitter;
      this.tiktok = this.socials.tiktok;
      this.soundcloud = this.socials.soundcloud;
    },
  },
  mounted() {
    this.setUpdateSocials();
  },
};
</script>

<style lang="scss" scoped>
  .Socials {
    width: 50%;
    padding: 0 20px;

    &__content {
      background-color: #fff;
      border-radius: 4px;
    }

    &__header {
      margin-bottom: 20px;
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__update-btn {
      background-color: #15aaff;
      box-shadow: 0 2px 5px rgba(21, 170, 255, 0.4);
      height: 30px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 5px 22px;
      border-radius: 5px;
      margin-left: 20px;
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

    &__list {
      padding: 0 20px 20px;
      display: flex;
      flex-direction: column;
    }

    &__list-item {
      display: block;
      margin-bottom: 20px;

      &--active {
        order: -1;
      }
    }

    &__list-item-caption {
      color: #666;
      margin-bottom: 5px;
      font-size: 14px;
      display: block;
    }

    &__list-item-input {
      width: 100%;
      height: 40px;
      font-size: 18px;
      border: none;
      color: #000;
      border-bottom: 1px solid #ccc;

      &:focus {
        outline: none;
        border-bottom: 2px solid #15aaff;
      }
    }
  }
</style>
