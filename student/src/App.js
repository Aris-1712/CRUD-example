import React,{Component} from 'react'
import {MDBDataTable} from 'mdbreact'
import Detail from './detail'
import Axios from 'axios'
import Edit from './edit'

class App extends Component {
state={
  updated:false,
  students:{},
  rows:[],
  editmode:false,
  student:{}
}
cols= [
  {
    label: 'Student Name',
    field: 'Name',
    sort: 'asc',
    width: 150
  },{
    label: 'ID',
    field: 'id',
    sort: 'asc',
    width: 150
  },{
    label: 'Email',
    field: 'email',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Mobile',
    field: 'mobile',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Edit',
    field: 'edit',
    sort: 'asc',
    width: 150
  },
  {
    label: 'DELETE',
    field: 'delete',
    sort: 'asc',
    width: 150
  }
]

componentDidMount=async()=>{
let res=await Axios.get('https://arcane-citadel-24451.herokuapp.com/student/all')
let Rows=[]
console.log(res.data)
res.data.map((obj)=>{
  let Row={
    Name:obj.Name,
    id:obj.ID,
    email:obj.Email,
    mobile:obj.Mob,
    edit:<button onClick={(event)=>{this.editclick(event,obj)}}>EDIT</button>,
    delete:<button onClick={(event)=>{this.delclick(event,obj)}}>DELETE</button>
  }
  Rows.push(Row)
})
this.setState({students:res.data,rows:Rows})

}
delclick=async(event,obj)=>{
  try{let data={
    ID:obj.ID
  }
  let res=await Axios.post("https://arcane-citadel-24451.herokuapp.com/student/del",data)
  if(res.status===200){
    alert("Student Deleted")
    window.location.reload()
  }
}
catch(err){
  alert(err)
}
  

}

updateChecker=async()=>{
  let res=await Axios.get('https://arcane-citadel-24451.herokuapp.com/student/all')
  let Rows=[]
  res.data.map((obj)=>{
    let Row={
      Name:obj.Name,
      id:obj.ID,
      email:obj.Email,
      mobile:obj.Mob,
      edit:<button onClick={(event)=>{this.editclick()}}>EDIT</button>
      
    }
    Rows.push(Row)
  })
  this.setState({students:res.data,rows:Rows})
}

editclick=(event,obj)=>{
  console.log("here")
this.setState({editmode:!this.state.editmode,student:obj})
}
  render(){ 
    console.log(this.state.rows)
    return(
      <div className="container">
        <h1 style={{textAlign:"center"}}>Student Master</h1>
        <hr></hr>
        <h3>SEARCH STUDENT</h3>
        <hr></hr>
        <MDBDataTable
      striped
      bordered
      hover
      data={{columns:this.cols, rows:this.state.rows}}
    />
    <hr></hr>
  {this.state.editmode?<Edit data={this.state.student}></Edit>:<Detail ></Detail>}
  </div>
    )

  }

}

export default App