<template>
  <div class="container">
    <div class="panel">
      <div class="panel-content">
        <div class="form-container" style="text-align: left">
          <div class="back-btn">
            <div>
              <h1 style="text-align: left; margin-right: 10px;">Create Employee</h1>
            </div>
            <button class="btn btn-xl btn-primary" @click="back">Back</button>
          </div>
          <div class="data-container" v-if="employeeData">
            <div class="control-group" >
                <label for="first-name">First Name</label>
                <input
                  type="text"
                  class="control"
                  id="first_name"
                  v-model="employeeData.first_name"
                  name="first_name"/>
            </div>

            <div class="control-group">
                <label for="last-name">Last Name</label>
                <input
                  type="last_name"
                  class="control"
                  id="last_name"
                  v-model="employeeData.last_name"
                  name="last_name"/>
            </div>

            <div class="control-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="control"
                  id="email"
                  v-model="employeeData.email"
                  name="email"/>
            </div>

            <div class="control-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="control"
                  id="password"
                  v-model="employeeData.password"
                  name="password"/>
            </div>

            <div class="control-group">
                <label for="city">City</label>
                <input
                  type="city"
                  class="control"
                  id="city"
                  v-model="employeeData.city"
                  name="city"/>
            </div>

            <div class="control-group">
                <label for="state">State</label>
                <input
                  type="state"
                  class="control"
                  id="state"
                  v-model="employeeData.state"
                  name="state"/>
            </div>

            <div class="control-group">
                <label for="dob">Date of Birth</label>
                <input
                  type="dob"
                  class="control"
                  id="dob"
                  v-model="employeeData.dob"
                  name="dob"/>
            </div>

            <div class="button-group">
                <button class="btn btn-xl btn-update" @click="createEmployee">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
      employeeData: {}
    }
  },
  mounted () {
    if (!localStorage.getItem('currentUser')) {
      this.$router.push({name: 'Register'})
    }
  },

  methods: {
    createEmployee () {
      this.$http.post('admin/employee', this.employeeData,
        {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('currentUser')
          }
        })
        .then(response => {
          this.$toasted.show(response.data.message, { type: 'success' })
          this.$router.push({name: 'Dashboard'})
        })
        .catch(error => {
          if (error.response.data.err) {
            this.$toasted.show(error.response.data.err.message, { type: 'error' })
          } else {
            this.$toasted.show('Submit all field properly.', { type: 'error' })
          }
          console.log('Inside error, fetching employee line items failed', error)
        })
    },
    back () {
      this.$router.push({name: 'Dashboard'})
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
      width: 50%;
      margin-left: 25%;
      margin-top: 10%;
  }

  .panel-content {
      padding: 20px;
      width:100%;
  }

  .back-btn {
    display: flex;
  }

  .control-group {
    display: block;
    color: #3a3a3a;

    margin-bottom: 25px;
    font-size: 15px;
    width: 750px;
    max-width: 90%;
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
      background: #d93015;
      color: #ddd3d3;
      height: 10%;
      margin-top: 3%;
  }

  .btn.btn-update {
      background: Blue;
      color: white;
  }

  .btn.btn-white {
      background: white;
      color: black;
  }
</style>
