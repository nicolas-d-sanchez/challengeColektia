<template>
  <div class="submit-form" >
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="description">Imagen</label>
        <input
          type="file"
          ref="file"
          required
          @change="selectFile"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        image: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    selectFile(){
        const file = this.$refs.file.files[0];
        this.tutorial.image = file;
        console.log(this.tutorial.image)
    },

     saveTutorial() {
      // var data = {
      //   image: this.tutorial.image,
      //   title: this.tutorial.title,
      //   description: this.tutorial.description
      // };

       const formData = new FormData()

        formData.append('image', this.tutorial.image)
        formData.append('title', this.tutorial.title)
        formData.append('description', this.tutorial.description)

      console.log(formData);



       TutorialDataService.create(formData)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
      },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
