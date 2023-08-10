<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        &nbsp;|&nbsp;
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <RouterView />
    </v-main>
  </v-app>
</template>
