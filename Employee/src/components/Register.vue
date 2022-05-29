<template>
<div class="container">
  <div class="panel">
    <div class="panel-content">
      <div class="form-container" style="text-align: left">

          <h1 style="text-align: center;">Register</h1>
          <div class="control-group" >
              <label for="email">Email</label>
              <input
                type="text"
                class="control"
                id="email"
                v-model="email"
                name="email"/>
          </div>

          <div class="control-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="control"
                id="password"
                v-model="password"
                name="password"/>
          </div>

          <div class="button-group">
              <button class="btn btn-xl btn-primary" @click="login">Register</button>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },

  mounted () {
    // localStorage.removeItem('currentUser')
    if (localStorage.getItem('currentUser')) {
      this.$router.push({name: 'Dashboard'})
    }
  },
  methods: {
    login () {
      this.$http.post('admin/login', {email: this.email, password: this.password})
        .then(response => {
          localStorage.setItem('currentUser', response.data.data.token)
          this.$toasted.show(response.data.message, { type: 'success' })
          this.$router.push({name: 'Dashboard'})
        })
        .catch(error => {
          this.$toasted.show(error.response.data.err.message, { type: 'error' })
          console.log('Inside error, fetching product line items failed', error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    text-align: center;
    width: 100%;
    height: 100%;
    display: table;
    z-index: 1;
    margin-top: -57px;
  }

  .btn.btn-primary {
      background: blue;
  }

  .btn.btn-danger {
      background: red;
  }

  .panel {
      box-shadow: 0 2px 25px 0 rgb(0 0 0 / 15%);
      border-radius: 5px;
      background: #fff;
      width: 33%;
      margin-left: 30%;
      margin-top: 10%;
  }

  .panel-content {
      padding: 20px;
      width:80%;
  }

  .control-group {
    display: block;
    color: #3a3a3a;

    margin-bottom: 25px;
    font-size: 15px;
    width: 750px;
    max-width: 100%;
    position: relative;
  }

  .form-container .control-group .control {
    width:100%;
  }

  .control-group .control {
        background: #fff;
      border: 2px solid #c7c7c7;
      border-radius: 3px;
      width: 70%;
      height: 36px;
      display: inline-block;
      vertical-align: middle;
      transition: .2s cubic-bezier(.4,0,.2,1);
      padding: 0 10px;
      font-size: 15px;
      margin-top: 10px;
      margin-bottom: 5px;
  }

  .btn {
      box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%), 0 0 8px 0 rgb(0 0 0 / 10%);
      border-radius:3px;
      border: none;
      color: white;
      cursor: pointer;
      transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font: inherit;
      display: inline-block;
  }

  .btn.btn-sm {
          padding: 6px 12px;
      }

  .btn.btn-md {
      padding: 8px 16px;
  }

  .btn.btn-lg {
      padding: 10px 20px;
  }

  .btn.btn-xl {
      padding: 12px 24px;
      font-size: 16px;
  }

  .btn.btn-primary {
      background: green;
      color: black;
  }

  .btn.btn-black {
      background: black;
      color: white;
  }

  .btn.btn-white {
      background: white;
      color: black;
  }
</style>
