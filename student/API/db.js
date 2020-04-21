const sql=require('mssql')
const config = {
    user: "sa",
    password: "Arisgani1712",
    server: "ec2-3-218-240-98.compute-1.amazonaws.com",
    database: "studentDB",
    options: {
      encrypt: false,
      instanceName: "SQLEXPRESS"
    }
  };
  const poolingSql=async()=>{
    try{ 
    const poolSql=await new sql.ConnectionPool(config)
    await poolSql.connect()

    return(poolSql)
  }
  catch(err){
      console.log(err)
  }
    
    }

    module.exports=poolingSql