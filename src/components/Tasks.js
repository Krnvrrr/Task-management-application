import React, { useEffect, useContext, useRef, useState } from "react";
import Taskitem from "./Taskitem";
import { taskcontext } from "../App";
export default function Tasks() {
  let { tasks, settasks, status, handleDelete, handleupdate, comp_success } =
    useContext(taskcontext);
  let ref = useRef(null);
  let updatetask = (note) => {
    ref.current.click();
    settask(note);
  };
  let update = () => {
    console.log(task.Title, task.discription, task.id);
    handleupdate(task.Title, task.discription, task.id);
  };
  let onchange = (e) => {
    e.preventDefault();
    settask({ ...task, [e.target.name]: e.target.value });
  };
  let [task, settask] = useState({ Title: "", discription: "", id: "" });
  useEffect(() => {
    let gettask = async () => {
      let response = await fetch(`http://localhost:3000/allTask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        settasks(data);
        console.log(tasks)
        comp_success(data);
      } else { 
        console.log(data);
      }
    };
    gettask();
  }, []);
  return (
    <div>
      <div></div>

      <button
        type="button"
        aria-disabled="true"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="">
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={update}
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-wrap">
        {tasks.map((element) => {
          return (
            <Taskitem
              Title={element.Title}
              discription={element.discription}
              key={element._id}
              id={element._id}
              status={element.status}
              handleDelete={handleDelete}
              handlestatus={status}
              updatetask={updatetask}
            />
          );
        })}
      </div>
    </div>
  );
}
