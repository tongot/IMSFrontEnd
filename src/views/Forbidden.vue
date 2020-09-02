<template>
  <div>
    <v-row justify="center" align="center">
      <v-card class="mt-10">
        <v-card-text>
          <h1 class="text-center display-1">Forbidden</h1>
          <v-subheader>sorry you have no right to perform this action</v-subheader>
        </v-card-text>
        <v-card-actions>
          <v-btn text small class="primary" :to="{name:'login'}">login with another user</v-btn>
          <v-spacer></v-spacer>
          <v-btn text small :to="{name:'login'}">go back</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>