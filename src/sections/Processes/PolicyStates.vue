<template>
  <div class="pa-2">
    <!--Edit Process-->
    <v-dialog width="500" v-model="ProcessEditDialog">
      <v-card>
        <v-form ref="formEditProcess">
          <v-card-title>
            Edit Process
            <v-spacer></v-spacer>
            <v-btn icon @click.prevent="ProcessEditDialog = !ProcessEditDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert dismissible type="error" v-if="get_processError != null">{{ get_processError }}</v-alert>
            <v-text-field v-model="EProcess.name" :rules="[rules.required]" label="Process Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.prevent="EditPro()" depressed>Edit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!--
    Add Status
    -->
    <div>
      <v-dialog width="500" persistent v-model="dialogAddStatus">
        <v-card>
          <v-alert type="error" v-if="errorRoles != null">{{ errorRoles }}</v-alert>
          <v-card-title>
            Add New Status
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogAddStatus = !dialogAddStatus">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-form ref="formAddState">
              <v-alert type="error" v-if="get_stateError != null">{{ get_stateError }}</v-alert>
              <v-text-field v-model="State.name" :rules="[rules.required]" label="State Name"></v-text-field>
              <v-text-field
                v-model="State.displayName"
                :rules="[rules.required]"
                label="Process Name"
              ></v-text-field>
              <v-text-field
                v-model="State.order"
                type="number"
                :rules="[rules.required]"
                label="Order"
              ></v-text-field>
              <v-checkbox v-model="State.isActiveState" label="Is Active state"></v-checkbox>
              <v-checkbox v-model="State.active" label="Active"></v-checkbox>
              <v-checkbox v-model="State.isFinal" label="Is Final"></v-checkbox>
              <v-card outlined :loading="loadingRoles">
                <v-card-text>
                  <v-checkbox
                    v-for="role in Roles"
                    :key="role.name"
                    :label="role.name"
                    :value="role.isSelected"
                    v-model="role.isSelected"
                  ></v-checkbox>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="get_loadingState" depressed @click="AddState()">Add</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <!--Edit status-->
    <div>
      <div>
        <v-dialog width="500" persistent v-model="dialogEditStatus">
          <v-card>
            <v-alert type="error" v-if="errorRoles != null">{{ errorRoles }}</v-alert>
            <v-card-title>
              Edit Status
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogEditStatus = !dialogEditStatus">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form ref="formEditState">
                <v-alert type="error" v-if="get_stateError != null">{{ get_stateError }}</v-alert>
                <v-text-field v-model="StateEdit.name" :rules="[rules.required]" label="State Name"></v-text-field>
                <v-text-field
                  v-model="StateEdit.displayName"
                  :rules="[rules.required]"
                  label="Process Name"
                ></v-text-field>
                <v-text-field
                  v-model="StateEdit.order"
                  type="number"
                  :rules="[rules.required]"
                  label="Order"
                ></v-text-field>
                <v-checkbox v-model="StateEdit.isActiveState" label="Is Active state"></v-checkbox>
                <v-checkbox v-model="StateEdit.active" label="Active"></v-checkbox>
                <v-checkbox v-model="StateEdit.isFinal" label="Is Final"></v-checkbox>
                <v-card outlined :loading="loadingRoles">
                  <v-card-text>
                    <v-checkbox
                      v-for="role in Roles"
                      :key="role.name"
                      :label="role.name"
                      :value="role.isSelected"
                      v-model="role.isSelected"
                    ></v-checkbox>
                  </v-card-text>
                </v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :loading="get_loadingState" depressed @click="EditState()">Edit</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <!--main view for processes -->
    <div>
      <v-btn :loading="get_loadingProcess" @click="addDialog = !addDialog" text>
        <v-icon left>mdi-plus</v-icon>Process
      </v-btn>
      <v-form v-if="addDialog" ref="formAddProcess">
        <v-card width="400">
          <v-card-title>
            Add Process
            <v-spacer></v-spacer>
            <v-btn icon @click.prevent="addDialog = !addDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert dismissible type="error" v-if="get_processError != null">{{ get_processError }}</v-alert>
            <v-text-field v-model="Process.name" :rules="[rules.required]" label="Process Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.prevent="Add()" depressed>Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <div class="ma-2 d-flex justify-md-space-around">
        <v-card width="400" v-for="process in get_processes" :key="process.id">
          <v-card-title>
            {{ process.name }}
            <v-spacer></v-spacer>
            <v-btn @click.prevent="OpenEditProcess(process)" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-subheader>State Order</v-subheader>
              <v-btn
                :loading="get_loadingState"
                @click.prevent="OpenAddState(process.id)"
                small
                text
              >
                <v-icon left>mdi-plus</v-icon>State
              </v-btn>
              <v-list-item-group>
                <v-list-item
                  :disabled="state.name=='Deceased'"
                  v-for="state in process.state"
                  :key="state.id"
                >
                  <v-list-item-title>
                    <v-avatar v-if="state.name!='Deceased'" color="primary" size="30">
                      <span class="white--text">{{ state.order }}</span>
                    </v-avatar>&nbsp;
                    <span>{{ state.displayName }}</span>&nbsp;
                    <v-chip small>{{ state.name }}</v-chip>
                  </v-list-item-title>
                  <v-list-item-action>
                    <v-btn v-if="state.name!='Deceased'" @click.prevent="OpenEditState(state)" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    loadingRoles: false,
    Roles: [],
    ProcessEditDialog: false,
    dialogAddStatus: false,
    dialogEditStatus: false,
    addDialog: false,
    errorRoles: null,
    Process: {
      name: "",
    },
    EProcess: {
      name: "",
      id: 0,
    },
    State: {
      name: "",
      displayName: "",
      order: null,
      processId: null,
      roles: "",
      isFinal: false,
    },
    StateEdit: {
      id: null,
      name: "",
      displayName: "",
      order: null,
      processId: null,
      active: null,
      roles: "",
      isFinal: false,
      isActiveState: false,
    },
    PolicyTypes: [{ nama: "Funeral", isSelected: true }],
    rules: {
      required: (v) => !!v || "this field is required",
    },
  }),
  methods: {
    ...mapActions([
      "GetProcesses",
      "AddProcess",
      "EditProcess",
      "AddStatus",
      "EditStatus",
      "GetAllRoles",
    ]),
    OpenEditState(state) {
      this.errorRoles = null;
      this.Roles = [];
      this.loadingRoles = true;
      this.GetAllRoles()
        .then(
          (response) => {
            if (response.status === 200) {
              this.loadingRoles = false;
              response.data.data.forEach((element) => {
                state.rolesAllowed.split(",").forEach((item) => {
                  if (element.name == item) {
                    element.isSelected = true;
                  }
                });
                this.Roles.push(element);
              });
            }
          },
          (e) => {
            alert("Error " + e.response);
          }
        )
        .catch(() => {
          alert("Failed to request Roles");
        });
      this.StateEdit.id = state.id;
      this.StateEdit.name = state.name;
      this.StateEdit.displayName = state.displayName;
      this.StateEdit.order = state.order;
      this.StateEdit.processId = state.processId;
      this.StateEdit.active = state.active;
      this.StateEdit.isFinal = state.isFinal;
      this.StateEdit.isActiveState = state.isActiveState;
      this.dialogEditStatus = true;
    },
    Add() {
      if (this.$refs.formAddProcess.validate()) {
        this.AddProcess(this.Process);
      }
    },
    OpenEditProcess(process) {
      this.EProcess.id = process.id;
      this.EProcess.name = process.name;
      this.ProcessEditDialog = true;
    },
    EditPro() {
      if (this.$refs.formEditProcess.validate()) {
        this.EditProcess(this.EProcess);
      }
    },
    OpenAddState(id) {
      this.errorRoles = null;
      this.State.processId = id;
      this.Roles = [];
      this.GetAllRoles()
        .then(
          (response) => {
            if (response.status === 200) {
              this.loadingRoles = false;
              this.Roles = response.data.data;
            }
          },
          (e) => {
            alert("Error " + e.response);
          }
        )
        .catch(() => {
          alert("Failed to request Roles");
        });
      this.dialogAddStatus = true;
    },
    AddState() {
      if (this.$refs.formAddState.validate()) {
        this.State.roles = this.RolesString();
        if (this.State.roles != null) {
          this.AddStatus(this.State);
        }
      }
    },
    EditState() {
      if (this.$refs.formEditState.validate()) {
        this.StateEdit.roles = this.RolesString();
        if (this.StateEdit.roles != null) {
          this.EditStatus(this.StateEdit);
        }
      }
    },
    RolesString() {
      let rolesSelected = [];
      this.Roles.filter((item) => item.isSelected).forEach((item) => {
        rolesSelected.push(item.name);
      });
      if (rolesSelected.length < 1) {
        this.errorRoles = "Please select at least one Role";
        return null;
      }
      return rolesSelected.join(",");
    },
  },
  computed: mapGetters([
    "get_processes",
    "get_loadingProcess",
    "get_processError",
    "get_stateError",
    "get_loadingState",
    "get_loadingRoles",
    "get_roles",
  ]),
  mounted() {
    this.GetProcesses();
  },
};
</script>

<style></style>
