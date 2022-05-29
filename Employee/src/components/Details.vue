<template>
  <div class="container">
    <div class="panel">
      <div class="panel-content">
        <div class="form-container" style="text-align: left">
          <div class="back-btn">
            <div>
              <h1 style="text-align: left; margin-right: 10px;">Employee Details</h1>
            </div>
            <button class="btn btn-xl btn-primary" @click="back">Back</button>
          </div>
        </div>

        <div class="data-container">
          <table id="employee" v-if="employeeData">
            <tr>
              <th>First Name</th>
              <td>{{employeeData.first_name}}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{{employeeData.last_name}}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{{employeeData.phone}}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{employeeData.email}}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{{employeeData.city}}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{{employeeData.state}}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{{employeeData.dob}}</td>
            </tr>
          </table>
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
    } else {
      this.getDetails()
    }
  },

  methods: {
    getDetails () {
      this.$http.get('admin/employee/get',
        {
          params: {employee_id: this.$route.params.id},
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('currentUser')
          }
        })
        .then(response => {
          this.employeeData = response.data.data.employeeDetails
        })
        .catch(function (error) {
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
      background: #d93015;
      color: #ddd3d3;
      height: 10%;
      margin-top: 3%;
  }

  .btn.btn-black {
      background: black;
      color: white;
  }

  .btn.btn-white {
      background: white;
      color: black;
  }

  #employee {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin-top: 10px;
  }

  #employee td, #employee th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #employee tr:nth-child(even){background-color: #f2f2f2;}

  #employee tr:hover {background-color: #ddd;}

  #employee th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
  }
</style>
