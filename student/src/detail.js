import React, { useState } from "react";
import { MDBRow, MDBCol,MDBDataTable  } from "mdbreact";
import firebase from "firebase";
import Storage from "./firebase/index";
import Axios from "axios";

const detail = (props) => {
  const [Name, setName] = useState("");
  const [Id, setId] = useState("");
  const [Course, setCourse] = useState("B.Tech");
  const [Mob, setMob] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [Fee, setFee] = useState(false);
  const [DOB, setDOB] = useState("");
  const [Hobbies, setHobbies] = useState([]);
  const [pic, setpic] = useState("");
  const [picURL, setPicURL] = useState("");
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [files, setFiles] = useState([]);
  const [Exam,setExam]=useState('')
  const [sub1,setsub1]=useState(0)
  const [sub2,setsub2]=useState(0)
  const [sub3,setsub3]=useState(0)
  const [prac1,setprac1]=useState(0)
  const [prac2,setprac2]=useState(0)
  const [total,settotal]=useState(0)
  const [scores,setScores]=useState([])
  const [tablescores,setTableScores]=useState([])
  const [editscore,setEditScore]=useState({})
  
  const cols= [
    {
      label: 'Exam Name',
      field: 'exam',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Subject 1',
      field: 'sub1',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Subject 2',
      field: 'sub2',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Subject 3',
      field: 'sub3',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Practical 1',
      field: 'prac1',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Practical 2',
      field: 'prac2',
      sort: 'asc',
      width: 100
    },
    {
        label: 'Total',
        field: 'total',
        sort: 'asc',
        width: 100
      },
      {
        label: 'EDIT',
        field: 'edit',
        sort: 'asc',
        width: 100
      }
  ]


  const submitHandler = async () => {
    try {
      if (
        Name === "" ||
        Id === "" ||
        Mob === "" ||
        Email === "" ||
        Gender === "" ||
        DOB === ""
      ) {
        alert("Mandatory Feilds missing");
      } else {
        let obj = {
          Name: Name,
          ID: Id,
          Course: Course,
          Mob: Mob,
          Email: Email,
          Gender: Gender,
          Fee: Fee,
          DOB: DOB,
          Hobbies: Hobbies,
          pic: picURL,
          files: files,
          scores:scores
        };
        let res = await Axios.post("http://localhost:3001/Student/add", obj);
        if (res.status === 200) {
          alert("Student Added.");
          // setName("")
          // setId("")
          // setMob("")
          // setPicURL("")
          // setDOB("")
          // setEmail("")
          // setGender("")
          // setFee(false)
          // setHobbies([])
          // setpic()
          // setFile()
          // setFileURL([])
          // setFiles([])
          // setFileName([])
          window.location.reload();
        } else {
          alert("Student already exists/Network Error");
        }
      }
    } catch (err) {
      alert("Student already exists/Network Error");
    }
  };
const newHandler=()=>{
  window.location.reload()
}
  const picUploadHandler = async () => {
    const uploadTask = Storage.ref()
      .child("images/" + pic.name + Math.random())
      .put(pic);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Progress: ${progress}%`);
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          console.log("file uploading...");
        }
        // ...etc
      },
      (error) => console.log(error.code),
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(downloadURL);
        setPicURL(downloadURL);
        alert("Picture Uploaded");
        // the web storage url for our file
      }
    );
  };
  const fileUploadHandler = async () => {
    const uploadTask = Storage.ref()
      .child("images/" + file.name + Math.random())
      .put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Progress: ${progress}%`);
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          console.log("file uploading...");
        }
        // ...etc
      },
      (error) => console.log(error.code),
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(downloadURL);
        setFileURL([...fileURL, downloadURL]);
        setFileName([...fileName, file.name]);
        setFiles([...files, { name: file.name, url: downloadURL }]);

        alert("File Uploaded");
        // the web storage url for our file
      }
    );
  };
  const changeHandler = (event, obj) => {
    let val = event.target.value;
    
    if (obj === "Name") {
      setName(val);
    }
    if (obj === "ID") {
      setId(val);
    }
    if (obj === "Course") {
      setCourse(val);
    }
    if (obj === "Mobile") {
      setMob(val);
    }
    if (obj === "Email") {
      setEmail(val);
    }
    if (obj === "Gender") {
      setGender(val);
    }
    if (obj === "Fee") {
      setFee(!Fee);
    }
    if (obj === "DOB") {
      setDOB(val);
    }
    if (obj === "Exam") {
        setExam(val);
      }
      if (obj === "sub1") {
        setsub1(val);
        
        
        
      }
      if (obj === "sub2") {
        setsub2(val);
      }
      if (obj === "sub3") {
        setsub3(val);
      }
      if (obj === "prac1") {
        setprac1(val);
      }
      if (obj === "prac2") {
        setprac2(val);
      }
      
    if (obj === "Hobbies") {
      if (Hobbies.includes(val)) {
        setHobbies(
          Hobbies.filter((ev) => {
            return ev !== val;
          })
        );
      } else {
        setHobbies([...Hobbies, val]);
      }
    }
    if (obj === "pic") {
      setpic(event.target.files[0]);
    }
    if (obj === "file") {
      setFile(event.target.files[0]);
    }
  };
  const modelClickHandler=()=>{
     let check=false
     scores.map((obj)=>{
          if(obj.exam===Exam)
          check=true
      })
      if(check){
          alert("Exam already present")
      }else{
      let obj={
          exam:Exam,
          sub1:sub1,
          sub2:sub2,
          sub3:sub3,
          prac1:prac1,
          prac2:prac2,
          total:parseInt(sub1)+parseInt(sub2)+parseInt(sub3)+parseInt(prac1)+parseInt(prac2)
      }
      setScores([...scores,obj])
      let obj2={
        exam:Exam,
        sub1:sub1,
        sub2:sub2,
        sub3:sub3,
        prac1:prac1,
        prac2:prac2,
        total:parseInt(sub1)+parseInt(sub2)+parseInt(sub3)+parseInt(prac1)+parseInt(prac2),
        edit:<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2" onClick={(event)=>{editHandler(obj)}}></button>
    }

    setTableScores([...tablescores,obj2])
}
  }
  const editmodelClickHandler=()=>{
    //   console.log(scores.filter((e)=>{return e.exam!==Exam}))
    let obj={
        exam:Exam,
        sub1:sub1,
        sub2:sub2,
        sub3:sub3,
        prac1:prac1,
        prac2:prac2,
        total:parseInt(sub1)+parseInt(sub2)+parseInt(sub3)+parseInt(prac1)+parseInt(prac2)
    }
    // setScores(scores.filter((e)=>{return e.exam!==Exam}))
    setScores([...scores.filter((e)=>{return e.exam!==Exam}),obj])
    let obj2={
        exam:Exam,
        sub1:sub1,
        sub2:sub2,
        sub3:sub3,
        prac1:prac1,
        prac2:prac2,
        total:parseInt(sub1)+parseInt(sub2)+parseInt(sub3)+parseInt(prac1)+parseInt(prac2),
        edit:<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2" onClick={(event)=>{editHandler(obj)}}></button>
    }
    // setTableScores(tablescores.filter((e)=>{return e.exam!==Exam}))
    setTableScores([...tablescores.filter((e)=>{return e.exam!==Exam}),obj2])
  }
 const editHandler=(obj)=>{
    setExam(obj.exam)
    setsub1(obj.sub1)
    setsub2(obj.sub2)
    setsub3(obj.sub3)
    setprac1(obj.prac1)
    setprac2(obj.prac2)
    settotal(obj.total)
 }
 console.log(scores)
  return (
    
    <div className="container">
        <h3>ADD STUDENT</h3>
    <hr></hr>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Student Info
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="3">
          <button style={{ width: "100%" }} onClick={submitHandler}>
            Save
          </button>
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="3">
          <button style={{ width: "100%" }} onClick={newHandler}>NEW</button>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Student Full Name
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            style={{ width: "100%" }}
            value={Name}
            onChange={(event) => {
              changeHandler(event, "Name");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          ID
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={Id}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "ID");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Course Name
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <select
            value={Course}
            style={{ width: "100%", height: "110%" }}
            onChange={(event) => {
              changeHandler(event, "Course");
            }}
          >
            <option value="B.Tech">B.Tech</option>
            <option value="B.E">B.E</option>
            <option value="M.B.A">M.B.A</option>
          </select>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Mobile
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={Mob}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "Mobile");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Email
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={Email}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "Email");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Gender
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <label style={{ backgroundColor: "#f0f8ff" }}>
            <input
              type="radio"
              value="Male"
              checked={Gender === "Male"}
              onChange={(event) => {
                changeHandler(event, "Gender");
              }}
            ></input>
            MALE
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label style={{ backgroundColor: "#f0f8ff" }}>
            <input
              type="radio"
              value="Female"
              checked={Gender === "Female"}
              onChange={(event) => {
                changeHandler(event, "Gender");
              }}
            ></input>
            FEMALE
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label style={{ backgroundColor: "#f0f8ff" }}>
            <input
              type="radio"
              value="Others"
              checked={Gender === "Others"}
              onChange={(event) => {
                changeHandler(event, "Gender");
              }}
            ></input>
            OTHERS
          </label>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          ALL Fee Paid
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <label>
            <input
              type="checkbox"
              checked={Fee}
              onChange={(event) => {
                changeHandler(event, "Fee");
              }}
            ></input>
            Yes/No
          </label>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Date Of Birth
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={DOB}
            type="date"
            onChange={(event) => {
              changeHandler(event, "DOB");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Hobbies
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <div
            className="container"
            style={{
              border: "solid 1px gray",
              height: "90px",
              overflowY: "scroll",
            }}
          >
            {/* checked={Hobbies.includes('Cricket')} onChange={(event)=>{changeHandler(event,'Hobbies')}} */}
            <MDBRow>
              &nbsp;
              <label>
                <input
                  type="checkbox"
                  value="Cricket"
                  checked={Hobbies.includes("Cricket")}
                  onChange={(event) => {
                    changeHandler(event, "Hobbies");
                  }}
                ></input>
                Cricket
              </label>
            </MDBRow>
            <MDBRow>
              &nbsp;
              <label>
                <input
                  type="checkbox"
                  value="Football"
                  checked={Hobbies.includes("Football")}
                  onChange={(event) => {
                    changeHandler(event, "Hobbies");
                  }}
                ></input>
                Football
              </label>
            </MDBRow>
            <MDBRow>
              &nbsp;
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  checked={Hobbies.includes("Reading")}
                  onChange={(event) => {
                    changeHandler(event, "Hobbies");
                  }}
                ></input>
                Reading
              </label>
            </MDBRow>
          </div>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol size="4">
          <MDBRow>
            <MDBCol
              style={{
                backgroundColor: "#f0f8ff",
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              ADD PICTURE
            </MDBCol>
          </MDBRow>
          <br></br>
          <MDBRow>
            <input
              // value={pic}
              type="file"
              onChange={(event) => {
                changeHandler(event, "pic");
              }}
            ></input>
          </MDBRow>

          <br></br>
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "center",
              }}
            >
              <button onClick={picUploadHandler}>UPLOAD</button>
            </MDBCol>
          </MDBRow>
          <br></br>
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "right",
              }}
            >
              <img
                style={{ width: "inherit", height: "250px" }}
                src={picURL}
              ></img>
            </MDBCol>
          </MDBRow>
          <br></br>
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <MDBRow>
            <MDBCol
              style={{
                backgroundColor: "#f0f8ff",
                textAlign: "left",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              ADD Files
            </MDBCol>
          </MDBRow>
          <br></br>
          <MDBRow>
            <input
              // value={file}
              type="file"
              onChange={(event) => {
                changeHandler(event, "file");
              }}
            ></input>
          </MDBRow>

          <br></br>
          <MDBRow>
            <MDBCol
              style={{
                textAlign: "center",
              }}
            >
              <button onClick={fileUploadHandler}>UPLOAD</button>
            </MDBCol>
          </MDBRow>
          <br></br>
          <div
            className="container"
            style={{
              border: "solid 1px gray",
              height: "150px",
              overflowY: "scroll",
            }}
          >
            {files.map((obj) => {
              return (
                <div key={Math.random()}>
                  <label key={Math.random()}>{obj.name}</label>
                  <br></br>
                </div>
              );
            })}
          </div>
        </MDBCol>
      </MDBRow>
      <hr></hr>
<MDBRow>
    <MDBCol size="4" style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}>
Marks
    </MDBCol>
    <MDBCol size="1"></MDBCol>
    <MDBCol size="4">
        <button type="button" data-toggle="modal" data-target="#myModal">ADD MARKS</button>
        <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">ADD MARKS</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
        <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Exam
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={Exam}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "Exam");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject1 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub1}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub1");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject2 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub2}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub2");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject3 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub3}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub3");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Practical1 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={prac1}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "prac1");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Practical2 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={prac2}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "prac2");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      {/* <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Total
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={total}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "total");
            }}
          ></input>
        </MDBCol>
      </MDBRow> */}
      <br></br>
      
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={modelClickHandler}>ADD</button>
        </div>
        
      </div>
    </div>
  </div>
    </MDBCol>
</MDBRow>
<MDBRow>
    <MDBCol>
<MDBDataTable
      striped
      bordered
      hover
      data={{columns:cols, rows:tablescores}}
    />
    </MDBCol>
    <div class="modal" id="myModal2">
    <div class="modal-dialog">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">ADD MARKS</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
        <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Exam
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={Exam}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "Exam");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject1 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub1}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub1");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject2 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub2}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub2");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Subject3 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={sub3}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "sub3");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Practical1 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={prac1}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "prac1");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Enter Practical2 Marks
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={prac2}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "prac2");
            }}
          ></input>
        </MDBCol>
      </MDBRow>
      <br></br>
      {/* <MDBRow>
        <MDBCol
          size="4"
          style={{
            backgroundColor: "#f0f8ff",
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          Total
        </MDBCol>
        <MDBCol size="1"></MDBCol>
        <MDBCol size="7">
          <input
            value={total}
            style={{ width: "100%" }}
            onChange={(event) => {
              changeHandler(event, "total");
            }}
          ></input>
        </MDBCol>
      </MDBRow> */}
      <br></br>
      
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={editmodelClickHandler}>EDIT</button>
        </div>
        
      </div>
    </div>
  </div>
</MDBRow>
    </div>
  );
};

export default detail;
