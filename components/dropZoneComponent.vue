<template>
  <div>
    <v-card>
      <v-toolbar outlined dense color="light-blue darken-1" dark>
        <v-toolbar-title>Upload document</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <br />
      <br />
      <vue-dropzone
        id="dropzone"
        ref="myVueDropzone"
        :options="dropzoneOptions"
        @vdropzone-files-added="fileAdded"
        @vdropzone-sending-multiple="sendingFiles"
        @vdropzone-sending="sendingFiles"
        @vdropzone-success-multiple="success"
        @vdropzone-success="success"
      ></vue-dropzone>
      <br />
      <br />
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ headers.name }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(i, index) in addedFiles"
                    :key="index"
                    @click="selectedfile = i.dataurl.dataURL"
                  >
                    <td>{{ i.title }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <div v-if="selectedfile.length == 0">
            <v-card-title>Select file to preview</v-card-title>
          </div>
          <div v-else>
            <div v-if="selectedfile.length > 0">
              <embed
                :src="selectedfile"
                type="application/pdf"
                width="100%"
                height="500px"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script src="~/components/dropzone.js"></script>
