<template>
  <div>
    <underwriterEdit />
    <underwriterAdd />
    <organizationEdit />
    <organizationAdd />
    <newPolicyHolder />
    <editPolicyHolder />
    <addNewFPolicy />
    <addDependent />
    <errorPop />
    <editCover />
    <editDependent />
    <v-app id="inspire">
      <v-navigation-drawer v-if="get_user!=null" v-model="draw" left clipped app>
        <v-list dense>
          <v-list-item v-if="menuRights(get_user.roles)" link :to="menus[0].link">
            <v-list-item-action>
              <v-icon>{{ menus[0].icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menus[0].name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group :prepend-icon="menus[1].icon">
            <template v-slot:activator>
              <v-list-item-title>{{ menus[1].name }}</v-list-item-title>
            </template>
            <v-list-group
              dense
              no-action
              sub-group
              v-for="(term, index) in menus[1].terms"
              :key="index"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title :to="term.link">{{ term.term }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item :to="item.link" link v-for="(item, index) in term.items" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list-group>
          <v-list-item link :to="menus[2].link">
            <v-list-item-action>
              <v-icon>{{ menus[2].icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menus[2].name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>{{ menus[3].icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ menus[3].name }}</v-list-item-title>
            </template>
            <v-list-item :to="item.link" link v-for="(item, index) in menus[3].items" :key="index">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary" clipped-left dark>
        <v-app-bar-nav-icon @click.stop="draw = !draw"></v-app-bar-nav-icon>
        <v-toolbar-title>IMS</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-chip v-if="get_user!=null" outlined small>{{get_user.email}}</v-chip>
        </div>
      </v-app-bar>

      <v-main>
        <div fluid>
          <router-view></router-view>
        </div>
      </v-main>
      <v-footer color="primary" app>
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import errorPop from "./components/ErrorPop";
import underwriterEdit from "./sections/GlobalEntities/EditUnderwrites";
import underwriterAdd from "./sections/GlobalEntities/AddUnderwriters";
import organizationEdit from "./sections/GlobalEntities/EditOrganizations";
import organizationAdd from "./sections/GlobalEntities/AddOrganizations";
import newPolicyHolder from "./sections/PolicyHolder/NewPolicyHolder";
import editPolicyHolder from "./sections/PolicyHolder/EditPolicyHolder";
import addNewFPolicy from "./sections/FuneralPolicy/NewFuneralPolicy";
import addDependent from "./sections/Dependent/NewDependent";
import editCover from "./sections/Packages/EditCover";
import editDependent from "./sections/Dependent/EditDependent";
export default {
  components: {
    underwriterEdit,
    underwriterAdd,
    organizationEdit,
    organizationAdd,
    errorPop,
    newPolicyHolder,
    editPolicyHolder,
    addNewFPolicy,
    addDependent,
    editCover,
    editDependent,
  },
  data: () => ({
    draw: null,
    menus: [
      {
        name: "Dashboard",
        link: { name: "dashboard" },
        icon: "mdi-view-dashboard",
        roles: ["Data"],
      },
      {
        name: "Policies",
        icon: "mdi-sitemap",
        roles: ["Admin", "Capturer"],
        terms: [
          {
            term: "Long term",
            items: [{ name: "Funeral", link: { name: "funeralList" } }],
          },
          {
            term: "Short term",
            items: [],
          },
        ],
      },
      {
        name: "Policy Holders",
        roles: ["Admin", "Capturer"],
        icon: "mdi-account-multiple",
        link: { name: "policyholderList" },
      },
      {
        name: "Settings",
        icon: "mdi-flower",
        roles: ["Admin", "Capturer"],
        items: [
          { name: "Global Entities", link: { name: "underwriters" } },
          { name: "Processes", link: { name: "status" } },
          { name: "Users", link: { name: "users" } },
          { name: "Funera Policy Packages", link: { name: "packagesList" } },
          { name: "Relationships", link: { name: "relationshipList" } },
        ],
      },
    ],
  }),
  methods: {
    ...mapActions(["GetUserDetails"]),
    menuRights(roles) {
      let count = 0;
      roles.forEach((element) => {
        if (this.get_user.roles.includes(element)) {
          count++;
        }
      });
      return count > 0 ? true : false;
    },
  },
  computed: mapGetters(["get_user"]),
  mounted() {
    this.GetUserDetails();
  },
};
</script>
