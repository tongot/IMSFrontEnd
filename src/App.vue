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
          <v-list-item v-if="menuRights(menus[0].roles)" link :to="menus[0].link">
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
                  <v-list-item-title v-if="menuRights()" :to="term.link">{{ term.term }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <span v-for="(item, index) in term.items" :key="index">
                <v-list-item :to="item.link" link v-if="menuRights(item.roles)">
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item>
              </span>
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
            <span link v-for="(item, index) in menus[3].items" :key="index">
              <v-list-item :to="item.link" v-if="menuRights(item.roles)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </span>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary" clipped-left dark>
        <v-app-bar-nav-icon @click.stop="draw = !draw"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="get_Organization==null">IMS</v-toolbar-title>
        <v-toolbar-title
          v-if="get_Organization!=null"
          class="text-capitalize"
        >{{get_Organization.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-chip v-if="get_user!=null" outlined>
            {{get_user.email}}
            <v-btn @click="logOut()" class="ml-2" small text>
              Logout
              <v-icon right>mdi-logout</v-icon>
            </v-btn>
          </v-chip>
        </div>
      </v-app-bar>

      <v-main>
        <div>
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
        roles: "",
      },
      {
        name: "Policies/claims",
        icon: "mdi-sitemap",
        roles: "",
        terms: [
          {
            term: "Long term",
            items: [
              { name: "Funeral", link: { name: "funeralList" }, roles: "" },
            ],
          },
          {
            term: "Short term",
            roles: "",
            items: [],
          },
          {
            term: "Claims",
            items: [
              {
                name: "Funeral Claims",
                link: { name: "funeralClaimList" },
                roles: "",
              },
            ],
          },
        ],
      },
      {
        name: "Policy Holders",
        roles: "",
        icon: "mdi-account-multiple",
        link: { name: "policyholderList" },
      },
      {
        name: "Settings",
        icon: "mdi-flower",
        roles: "admin",
        items: [
          {
            name: "Global Entities",
            link: { name: "underwriters" },
            roles: "super",
          },
          { name: "Processes", link: { name: "status" }, roles: "isOrgAdmin" },
          { name: "Users", link: { name: "users" }, roles: "admin" },
          {
            name: "Funera Policy Packages",
            link: { name: "packagesList" },
            roles: "isOrgAdmin",
          },
          {
            name: "Relationships",
            link: { name: "relationshipList" },
            roles: "admin",
          },
        ],
      },
    ],
  }),
  methods: {
    ...mapActions(["GetUserDetails", "GetOrganizationById", "LogOut"]),
    menuRights(role) {
      if (role == "admin") {
        return this.isAdmin();
      } else if (role == "super") {
        return this.isSuper();
      } else if (role == "isOrgAdmin") {
        return this.isOrgAdmin();
      } else {
        return true;
      }
    },
    isSuper() {
      let role = this.get_user.roles.filter(
        (item) => item.toLowerCase() === "admin"
      )[0];
      if (typeof role != "undefined") {
        return true;
      } else {
        false;
      }
    },
    isOrgAdmin() {
      let role = this.get_user.roles.filter(
        (item) => item.toLowerCase().slice(0, 5) === "admin"
      )[0];
      if (typeof role != "undefined") {
        return role.length == "admin".length + 1 ? true : false;
      } else {
        false;
      }
    },
    isAdmin() {
      let role = this.get_user.roles.filter(
        (item) => item.toLowerCase().slice(0, 5) === "admin"
      )[0];
      if (typeof role != "undefined") {
        return true;
      } else {
        false;
      }
    },
    logOut() {
      this.LogOut();
    },
  },
  computed: mapGetters(["get_user", "get_Organization"]),
  mounted() {
    this.GetUserDetails().then(() => {
      if (this.get_user != null) {
        this.GetOrganizationById(this.get_user.organizationId);
      } else {
        this.$route.push({ name: "login" });
      }
    });
  },
};
</script>
