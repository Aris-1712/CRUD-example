const express = require("express");
const Joi = require("joi");
const { parse, stringify } = require("flatted/cjs");
const poolsql = require("../db");
const router = express.Router();
// -----------------------------------------
router.post("/add", async (req, resp) => {
  try {
    // console.log(stringify(req.body.files))

    // console.log(req2[0])
    let check = await validate(req.body);
    if (check) {
      console.log("here");
      const pool = await poolsql();
      const connect = await pool.request();
      console.log("here");
      let check = await connect.query(
        "select * from Student where ID='" + req.body.ID + "'"
      );
      if (check.recordset.length === 0) {
        let result = await connect.query(
          "insert into [dbo].[Student]([Name],[ID],[Course],[Mob],[Email],[Gender],[Fee],[DOB],[img]) values ('" +
            req.body.Name +
            "','" +
            req.body.ID +
            "','" +
            req.body.Course +
            "','" +
            req.body.Mob +
            "','" +
            req.body.Email +
            "','" +
            req.body.Gender +
            "','" +
            req.body.Fee +
            "','" +
            req.body.DOB +
            "','" +
            req.body.pic +
            "')"
        );
        let id = await connect.query(
          "select * from Student where ID='" + req.body.ID + "'"
        );
        let sid = id.recordset[0].sid;
        req.body.Hobbies.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into hobby values(" + parseInt(sid) + ",'" + obj + "')"
            );
          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        req.body.files.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into Files values('" +
                obj.name +
                "'," +
                parseInt(sid) +
                ",'" +
                obj.url +
                "')"
            );

          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        req.body.scores.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into scores values('" +
                obj.exam +
                "','" +
                obj.sub1 +
                "','" +
                obj.sub2 +
                "','" +
                obj.sub3 +
                "','" +
                obj.prac1 +
                "','" +
                obj.prac2 +
                "','" +
                obj.total +
                "'," +
                parseInt(sid) +
                ")"
            );
          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        resp.send("Student Added");
      } else {
        resp.status(404).send("Student already exists");
      }

      //   res.send(req.body);
    } else {
      resp.status(404).send("Invalid Data");
    }
  } catch (err) {
    console.log(err);
    resp.status(404).send(err);
  }
});
// -----------------------------------------------------------------------------------------------------
// let obj = {
//     Name: Name,
//     ID: Id,
//     Course: Course,
//     Mob: Mob,
//     Email: Email,
//     Gender: Gender,
//     Fee: Fee,
//     DOB: DOB,
//     Hobbies: Hobbies,
//     pic: picURL,
//     files: files,
//     scores:scores
//   };
router.get("/all", async (req, resp) => {
  try {
    const pool = await poolsql();
    const connect = await pool.request();
    let check = await connect.query("select * from Student ");

    let checking = async () => {
      let final = [];
      let final1 = check.recordsets[0].map(async (obj) => {
        let hobbies = [];
        let files = [];
        let scores = [];
        let hobby = await connect.query("select * from Hobby ");
        hobby.recordsets[0].map((obj2) => {
          if (obj.sid === obj2.sid) {
            //   console.log(obj2.hobby)
            hobbies.push(obj2.Hobby);
          }
        });
        let file = await connect.query("select * from Files ");
        file.recordsets[0].map((obj3) => {
          if (obj.sid === obj3.sid) {
            files.push({ name: obj3.fname, url: obj3.url });
          }
        });
        let score = await connect.query("select * from scores ");
        score.recordsets[0].map((obj4) => {
          if (obj.sid === obj4.sid) {
            scores.push({
              exam: obj4.Exam,
              sub1: obj4.Sub1,
              sub2: obj4.Sub2,
              sub3: obj4.Sub3,
              prac1: obj4.Prac1,
              prac2: obj4.Prac2,
              total: obj4.Total,
            });
          }
        });
        obj["hobbies"] = hobbies;
        obj["scores"] = scores;
        obj["files"] = files;

        return obj;
      });
      return await Promise.all(final1);
      // return final1
      //  return final
    };
    const data = await checking();
    resp.send(data);
  } catch (err) {
    resp.status(404).send("SQL ERROR");
  }
});
// -----------------------------------------------------------------------------------------------------
router.post("/edit", async (req, resp) => {
  try {
    // console.log(stringify(req.body.files))

    // console.log(req2[0])
    let check = await validate(req.body);
    if (check) {
      //   console.log("here");
      const pool = await poolsql();
      const connect = await pool.request();
      //   console.log("here");
      let check = await connect.query(
        "select * from Student where ID='" + req.body.ID + "'"
      );
      console.log(check.recordset.length);
      if (check.recordset.length === 1) {
        let id = await connect.query(
          "select * from Student where ID='" + req.body.ID + "'"
        );
        let sid = id.recordset[0].sid;
        let update = await connect.query(
          "update Student set Name=" +
            "'" +
            req.body.Name +
            "' , ID='" +
            req.body.ID +
            "' , Course='" +
            req.body.Course +
            "' , Mob='" +
            req.body.Mob +
            "' , Email='" +
            req.body.Email +
            "' , Gender='" +
            req.body.Gender +
            "' , Fee='" +
            req.body.Fee +
            "' , DOB='" +
            req.body.DOB +
            "' , img='" +
            req.body.pic +
            "' where sid='" +
            sid +
            "'"
        );
        //   let del4 = await connect.query(
        //     "delete from Student where sid='" + sid + "'"
        //   );
        let del1 = await connect.query(
          "delete from Files where sid='" + sid + "'"
        );
        let del2 = await connect.query(
          "delete from scores where sid='" + sid + "'"
        );
        let del3 = await connect.query(
          "delete from Hobby where sid='" + sid + "'"
        );

        let id1 = await connect.query(
          "select * from Student where ID='" + req.body.ID + "'"
        );
        let sid1 = id1.recordset[0].sid;
        req.body.Hobbies.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into hobby values(" + parseInt(sid1) + ",'" + obj + "')"
            );
          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        req.body.files.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into Files values('" +
                obj.name +
                "'," +
                parseInt(sid1) +
                ",'" +
                obj.url +
                "')"
            );
          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        req.body.scores.map(async (obj) => {
          try {
            let result = await connect.query(
              "insert into scores values('" +
                obj.exam +
                "','" +
                obj.sub1 +
                "','" +
                obj.sub2 +
                "','" +
                obj.sub3 +
                "','" +
                obj.prac1 +
                "','" +
                obj.prac2 +
                "','" +
                obj.total +
                "'," +
                parseInt(sid1) +
                ")"
            );
          } catch (err) {
            resp.status(404).send("SQL Error");
          }
        });
        resp.send("Student has been modified");
      } else {
        resp.status(404).send("Student already exists");
      }

      //   res.send(req.body);
    } else {
      resp.status(404).send("Invalid Data");
    }
  } catch (err) {
    console.log(err);
    resp.status(404).send(err);
    
  }
});
// -----------------------------------------------------------------------------------------------------
router.post('/del',async(req,resp)=>{
  try{
    const pool = await poolsql();
      const connect = await pool.request();
      //   console.log("here");
      let check = await connect.query(
        "select * from Student where ID='" + req.body.ID + "'"
      );
      if(check){
        let del=await connect.query("delete from Student where ID='"+req.body.ID+"'")
        resp.send("Student Deleted")
      }
      else(resp.status(404).send("Student not found or Network Error"))

  }
  catch(err){
    console.log(err)
    resp.status(404).send("Network/SQL ERROR")
  }
  
})
// -----------------------------------------------------------------------------------------------------
const validate = async (obj) => {
  let template = {
    Name: Joi.string().required(),
    ID: Joi.string().required(),
    Course: Joi.string().required(),
    Mob: Joi.string().required(),
    Email: Joi.string().required(),
    Gender: Joi.string().required(),
    Fee: Joi.boolean().required(),
    DOB: Joi.string().required(),
    Hobbies: Joi.array().required(),
    pic: Joi.string().required(),
    files: Joi.array().required(),
    scores: Joi.array().required(),
  };
//   console.log("Here");
  let res = await Joi.validate(obj, template);
  console.log(res);
  return res;
};

module.exports = router;
