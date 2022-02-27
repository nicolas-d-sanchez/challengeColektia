<template>
  <div v-if="currentTutorial" class="edit-form">
    <h2>Tutorial</h2>
    <form>
      <div class="form-group">
        <label for="title"><strong>Title</strong></label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description"><strong>Description</strong></label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div>
        <label><strong>Image:</strong></label>
        <br>
        <img width="150px" :src="'http://localhost:8080/'+currentTutorial.image " />  
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>

      <div class="form-group">
        <label for="formFile">New Image</label>
        <input
          class="form-control" 
          id="formFile"
          type="file"
          ref="file"
          required
          @change="selectFile"
        />
      </div>
    </form>

    <div class="d-grid gap-4 d-md-block mt-4">
      <button class="btn btn-outline-primary mr-2 btn-sm"
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="btn btn-outline-primary mr-2 btn-sm"
        @click="updatePublished(true)"
      >
        Publish
      </button>

      <button class="btn btn-outline-primary mr-2 btn-sm"
        @click="deleteTutorial"
      >
        Delete
      </button>

      <button type="submit" class="btn btn-outline-primary btn-sm"
        @click="updateTutorial"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      newImage: "",
      currentTutorial: null,
      message: ''
    };
  },
  methods: {

    selectFile(){
        const file = this.$refs.file.files[0];
        this.newImage = file;
        console.log(this.newImage)
    },

    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      const formData = new FormData()

      formData.append('image', this.newImage)
      formData.append('title', this.currentTutorial.title)
      formData.append('description', this.currentTutorial.description)
      formData.append('status', this.currentTutorial.status)

      TutorialDataService.update(this.currentTutorial.id, this.formData)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
