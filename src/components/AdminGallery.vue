<template>
  <div class="AdminGallery">
    <div class="AdminGallery__title">Gallery</div>
    <form class="AdminGallery__form">
      <label for="addPhotoInput" class="AdminGallery__label">
        <input
          type="file"
          id="addPhotoInput"
          class="AdminGallery__input"
          name="photoFile"
          ref="photoFile"
          @change="uploadPhoto"
        >
      </label>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { ref as firebaseRef, uploadBytes } from 'firebase/storage';

export default {
  name: 'AdminGallery',
  setup() {
    const photoFile = ref(null);

    return { photoFile };
  },
  computed: {
    ...mapGetters(['storage']),
  },
  methods: {
    async uploadPhoto() {
      const photoData = this.photoFile.files[0];

      const storageRef = firebaseRef(this.storage, `photos/${photoData.name}`);

      uploadBytes(storageRef, photoData).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .AdminGallery {
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
      width: 250px;
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
      }
    }

    &__input {
      position: absolute;
    }
  }
</style>
