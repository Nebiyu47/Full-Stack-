import { Paper,Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import React ,{useState,useEffect} from 'react';
const useStyles = makeStyles((theme)=>({
    root:{
        '& > *' : {
            margin : theme.spacing(1),
        },
    },
}));
export default function Student(){
const paperStyle ={padding: '50px 20px', width:600 , margin:" 20px auto"}
const [name ,setName]= useState("");
const [adress,setAdress]= useState("");
const [student, setStudent]=useState([])
const classes = useStyles();

const handleClick=(e)=>{
   e.preventDefault()
    const student ={name,adress}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
    }).then(()=>{
        console.log("New Student Add")
    })
}
useEffect(()=>{
    fetch("http://localhost:8080/student/find")
    .then(res=>res.json())
    .then((result)=>{
        setStudent(result);
    })
},[])
return(


    <Container>
        <Paper elevation = {3} style ={paperStyle}>
            <h1 style={{color:"blue"}}>
                <u>Add Student</u></h1>
                <form className={classes.root}noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Student Name" variant="outlined"
                    fullWidth value ={name}
                    onChange={(e)=>setName(e.target.value)}/> 
                </form>
                <TextField id="outlined-basic" label="Adress Name" variant="outlined" fullWidth value={adress}
                onChange={(e)=>setAdress(e.target.value)}/>
                <Button variant="contaiend" color="secondary" onClick={handleClick}>Submite</Button>
        </Paper>
        <h1>Student</h1>
        <Paper elevation={3} style={paperStyle}>
            {student.map(student=>(
                <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}}Key={student.id}>
                    ID:{student.id}<br/>
                    Name:{student.name}<br/>
                    Address:{student.adress}<br/>
                    </Paper>
            ))}
       </Paper>
    </Container>
);
}
