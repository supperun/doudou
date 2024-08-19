<script setup lang="ts">

</script>

<template>
  <div class="tain-page">
    <div class="carts">
      <div class="tain-cart"></div>
      <div class="tain-cart"></div>
    </div>
    <div class="tain-after"></div>
  </div>
</template>

<style lang="scss" scope>
.tain-page {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);
  --tw-ring-shadow: 0 0 #0000;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-bg-opacity: 1;
  --tw-bg-opacity-25: .25;
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-bg-opacity), 0 2px 4px -2px var(--tw-shadow-color);

  position: relative;
  border-radius: 20px 20px 0 0;
  height: 100vh;
  padding: 1rem;
  z-index: 3;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));

  .tain-after {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: .35;
    filter: blur(20px);
    z-index: -1;
    background: url(https://api.luvying.com/acgimg?id=425) no-repeat center center / cover fixed;
  }

  .carts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1rem;
    padding: 1rem;


    .tain-cart {
      height: 30vh;
      border-radius: 1rem;
      padding: 1.5rem;
      backdrop-filter: blur(5px);
      background-color: rgb(229 231 235 / var(--tw-bg-opacity-25));
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
  }
}
</style>