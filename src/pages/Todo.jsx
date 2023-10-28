import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../layout/Header";

function Todo() {

  const [data, setData] = useState([])
  const [toggle, setToggle] = useState(false)
  const [innerToggle, setinnerToggle] = useState(false)
  const [rowindex, setRowindex] = useState(null);
  const [task, setTask] = useState({
    taskName: null,
    email : localStorage.getItem("email")
  });
  const [editvalue, setEditvalue] = useState(null)
  const day = new Date();
  const date = day.toLocaleString()

  const hendleTask = () => {
    if (task.taskName === null) {
      toast.warning("fill the Task")
    } else {
      axios.post("http://localhost:8000/todo/creat-task", task).then((res) => {
        toast.success(res.data.Message)
        
        getTask()
        document.getElementById('task').value = ""
        task.taskName = null
        setToggle(false)
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  const getTask = () => {
    axios.get("http://localhost:8000/todo/get-todo").then((res) => {
      setData(res.data.resuls);
    }).catch((err) => {
      console.log(err.message);
    })
  }

  const hendleChange = (item) => {
    const id = item
    axios.patch(`http://localhost:8000/todo/update/${id}`, {
      status: "Completed",
      updated_at: date
    }).then((res) => {
      toast.success("task is completed")
      getTask()
    }).catch((err) => {
      console.log("task is pending ===>", err);
    })
  }

  const hendleDelete = (item) =>{
    const id = item;
    axios.delete(`http://localhost:8000/todo/delete/${id}`).then((res) => {
      toast.success(res.data.Message)
      getTask()
    }).catch((err) => {
      console.log("task is note deleted ===>", err);
    })
  }
const aaa = "mohan"
  const editTask = (item) => {
    const id = item._id
    console.log(id);
    axios.patch(`http://localhost:8000/todo/update/${id}`, {
        taskName : editvalue === null ? item.taskName : editvalue,
        updated_at : date
    }).then((res) => {
      toast.success(res.data.Message)
      getTask()
      setinnerToggle(false)
    }).catch((err) => {
      console.log("task is pending ===>", err);
    })
  }

  return (
    <div className="App vh-100 ">
      <Header />
      <div className={`modal ${toggle === true && 'd-block'}`} tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" onClick={() => setToggle(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" id="task" placeholder="Enter Task" onChange={(e) => setTask((prev) => ({ ...prev, taskName: e.target.value }))} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={hendleTask}>Add Task</button>
              <button type="button" className="btn btn-primary" onClick={() => setToggle(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="box bg-dark text-end pb-3 pt-4 pe-5">
        <button className="btn btn-primary" onClick={() => setToggle(true)}>Add Task</button>
      </div>

      <table className="table table-dark table-striped text-center">

        <thead>
          <tr>
            <th>id</th>
            <th>check</th>
            <th>task</th>
            <th>status</th>
            <th>creatd Time</th>
            <th>update Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              if(item.email === localStorage.getItem("email")) {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th><input type="checkbox" disabled={item.status === "Completed" && "disabled"} checked={item.status === "Completed" && "checked"} className="form-check-input" onChange={() => hendleChange(item._id)} /></th>
                    <th className={`${item.status === "Completed" && 'text-decoration-line-through'}`}>{innerToggle &&  rowindex === index ? 
                    <><input type="text" defaultValue={item.taskName} onChange={(e)=>setEditvalue(e.target.value)} /></> : item.taskName }</th>
                    <th className={`text-${item.status === "Completed" && 'danger'}`}>{item.status}</th>
                    <th>{item.created_at}</th>
                    <th>{item.updated_at}</th>
  
                    <th>
                      {
                        innerToggle &&  rowindex === index ?
                        
                          <>
                            <button onClick={()=> editTask(item)} className="btn btn-primary btn-sm me-2">Save</button>
                            <button onClick={()=>setinnerToggle(false)} className="btn btn-warning btn-sm">Cancle</button>
                          </>:
                            <>
                            <button disabled={item.status === "Completed" && "disabled"} onClick={()=>{setinnerToggle(true); setRowindex(index)}} className="btn btn-primary btn-sm me-2">Edit</button>
                            <button onClick={()=> hendleDelete(item._id)} className="btn btn-danger btn-sm">Delete</button>
                          </> 
                      }
                    </th>
  
                  </tr>
                )
              }
            
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Todo;
