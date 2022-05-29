<template>
  <div>
    <div class="search">
      <div class="control-group" >
          <input
            type="text"
            class="control"
            id="search"
            v-model="search"
            placeholder="search employee"
            name="search"/>
      </div>

      <a class="btn btn-xl search-btn" @click="searchEmployee" style="margin-top:10px;">Search</a>
    </div>
    <div class="employee-data" v-if="employee.length">
      <h2 style="text-align:center">Employee List</h2>
      <div class="employee-card">
        <div class="card" v-for="emp in employee" :key="emp.id">
          <img src="@/assets/avatar.png" alt="Avatar" style="width:100%;height:215px;">
          <h1>{{emp.first_name}} {{emp.last_name}}</h1>
          <div style="margin: 24px 0;">
            <a @click="showEmployee(emp.id)" title="View"><b-icon icon="eye-fill"></b-icon></a>
            <a @click="editEmployee(emp.id)" title="Edit"><b-icon icon="pencil-fill"></b-icon></a>
            <a @click="deleteEmployee(emp.id)" title="Delete"><b-icon icon="trash-fill"></b-icon></a>
          </div>
        </div>
      </div>
    </div>
    <div class="not-found" v-else>
        <p>No Employee is register, Please Register the Employee</p>
    </div>

    <button class="btn btn-xl btn-primary" @click="addEmployee" style="margin-top:10px;">Register</button>
</div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      employee: {},
      employeeData: {},
      search: '',
      searchResult: true
    }
  },

  mounted () {
    if (!localStorage.getItem('currentUser')) {
      this.$router.push({name: 'Register'})
    } else {
      this.getEmployee()
    }
  },
  watch: {
    search: function (value) {
      if (this.search === '') {
        this.getEmployee()
      }
    }
  },
  methods: {
    searchEmployee () {
      if (this.search !== '') {
        this.$http.get('admin/employee',
          {
            params: {first_name: this.search},
            headers: {
              authorization: localStorage.getItem('currentUser')
            }
          })
          .then(response => {
            this.employee = response.data.data.employeesList
          })
          .catch(error => {
            console.log('Inside error, fetching employee line items failed', error)
          })
      }
    },
    getEmployee () {
      this.$http.get('admin/employee', {
        headers: {
          authorization: localStorage.getItem('currentUser')
        }
      })
        .then(response => {
          this.employee = response.data.data.employeesList
        })
        .catch(error => {
          console.log('Inside error, fetching employee line items failed', error)
        })
    },
    showEmployee (id) {
      this.$router.push({name: 'Details', params: {id: id}})
    },
    addEmployee () {
      this.$router.push({name: 'Create'})
    },
    editEmployee (id) {
      this.$router.push({name: 'Edit', params: {id: id}})
    },
    deleteEmployee (id) {
      this.$http.delete('admin/employee',
        {
          params: {employee_id: id},
          headers: {
            authorization: localStorage.getItem('currentUser')
          }
        })
        .then(response => {
          this.employee = this.getEmployee()
          this.$toasted.show(response.data.message, { type: 'success' })
        })
        .catch(error => {
          this.$toasted.show(error.response.data.err.message, { type: 'error' })
          console.log('Inside error, fetching employee line items failed', error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employee-card {
  display: flex;
}
.card {
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    width: 20%;
    font-family: arial;
    margin-right: 20px;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}
.search {
  display: inline-flex;
}
a.search-btn{
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  color:white !important;
  font-size: 18px;
  margin-top: 12px;
  height: 2%;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
  cursor: pointer;
}

.control-group {
  display: block;
  color: #3a3a3a;
  margin-bottom: 25px;
  font-size: 15px;
  position: relative;
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

.not-found p {
  padding: 13px;
  background: #32e150;
  box-shadow: 0px 3px 6px 4px #c4c4c4;
  border-radius: 0.3rem;
}
</style>
