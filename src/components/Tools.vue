<template>
  <div class="Tools__tools">
    <div class="Tools__tools-toggler"></div>
    <div class="Tools__tools-popup">
      <span class="Tools__tool" @click="$emit('edit')">Edit</span>
      <span class="Tools__tool" @click="$emit('delete')">Delete</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .Tools {
    &__tools {
      position: absolute;
      top: 20px;
      right: 30px;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        .Tools__tools-popup {
          display: block;
        }
      }
    }

    &__tools-toggler {
      position: relative;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #666;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -12px;
        margin-right: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #666;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: -12px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #666;
      }
    }

    &__tools-popup {
      display: none;
      position: absolute;
      top: 80%;
      right: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      min-width: 150px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }

    &__tool {
      display: block;
      font-size: 16px;
      padding: 10px 15px;

      &:hover {
        background-color: #e0f3ff;
      }
    }
  }
</style>
