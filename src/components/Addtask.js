import React,{useContext, useState} from "react";
import { taskcontext } from "../App";
import Taskchart from "./Taskchart"
export default function Addtask() {
   let {addtask} = useContext(taskcontext);
   let [task,settask]= useState({Title:"",discription:""});
   let onchange=(e)=>{
    e.preventDefault();
    settask({...task,[e.target.name]:e.target.value});
   }
   let onclick=()=>{
    if(task.Title.length&&task.discription.length)
    {addtask(task.Title,task.discription)
     settask({Title:"",discription:""})}
    else {
      console.log("no blank entry accepted ")
      settask({Title:"",discription:""})
    }
   }
  return (
    <div className="d-flex flex-wrap">
      <div> 
        <Taskchart/>
      </div>
    <div className="d-flex m-3">
      
      <form className="pt-3" style={{width:'600px',marginLeft:'15%'}}>
        <h1>Add A New Task</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={task.Title}
            name="Title"
            className="form-control"
            onChange={onchange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Discription
          </label>
          <input
            type="text"
            value={task.discription}
            onChange={onchange}
            name="discription"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="button" onClick={onclick} className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
    </div>
  );
}
