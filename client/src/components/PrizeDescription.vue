<template>
  <div class="posts">
    <div class="row">
      <b-img v-bind:src='image_url' fluid alt="Fluid image"  />
      <b-card text-variant="black" title="Card Title">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <!-- <b-button href="#" variant="razz">Redeem</b-button> -->
        <b-btn v-b-modal.modal1 variant='razz'>Launch demo modal</b-btn>
        <p>
          {{quantity}} left in stock
        </p>
      </b-card>
      <!-- Modal Component -->
      <b-modal id="modal1" centered>
        <h4>Are you Sure?</h4>
        <b-btn v-b-modal.modal2 variant='razz'>Launch demo modal</b-btn>
      </b-modal>
      <b-modal id="modal2" centered>
        <h4>Are you Sure?</h4>
      </b-modal>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'PrizeDescription',
  data () {
    return {
      name: '',
      description: '',
      quantity: 0,
      image_url: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      console.log(response)
      this.name = response.data.name
      this.description = response.data.description
      this.quantity = response.data.quantity
      this.image_url = response.data.image_url
    }
  }
}
</script>
<style type="text/css">
.posts{
  background-color: #f3f3f3;
  width:70%;
  margin:0 auto;
}
</style>
