<template>
  <div class="ma-2">
    <v-card min-height="100vh" flat>
      <v-navigation-drawer absolute expand-on-hover permanent>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-home </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Organizations</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list dense shaped>
          <v-list-item-group>
            <v-list-item v-for="org in get_Organizations" :key="org.id">
              <v-list-item-title>{{ org.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card flat color="grey lighten-3" class="container">
        <v-row>
          <v-col cols="4">
            <v-card width="480px" color="primary" class="white--text">
              <v-card-title>
                Policy Holders
                <v-spacer></v-spacer>
                <v-icon size="50"> mdi-account-multiple </v-icon>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <span class="display-3">20000</span>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card width="480px" color="success" class="white--text">
              <v-card-title
                >Active
                <v-spacer></v-spacer>
                <v-icon size="50"> mdi-account-check </v-icon>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <span class="display-3">19000</span>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card width="480px" color="pink darken-3" class="white--text">
              <v-card-title
                >Deceased
                <v-spacer></v-spacer>
                <v-icon size="50"> mdi-account-alert</v-icon>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <span class="display-3">300</span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="4">
            <pie-chart :data="myData"></pie-chart>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    menuWidth: 1,
    viewWidth: 11,
    myData: [
      ["Active", "20"],
      ["Lead", "50"],
      ["Rejected", "30"],
      ["Approved", "23"],
    ],
  }),
  methods: {
    menu() {
      console.warn(this.menuWidth);
      if (this.menuWidth === 1) {
        this.menuWidth = 3;
        this.viewWidth = 9;
      }
    },
    menuClose() {
      this.menuWidth = 1;
      this.viewWidth = 11;
    },
    ...mapActions(["GetOrganizations"]),
  },
  computed: mapGetters(["get_Organizations"]),
  mounted() {
    this.GetOrganizations();
  },
};
</script>

<style scoped>
.container {
  margin-left: 50px;
}
</style>>
