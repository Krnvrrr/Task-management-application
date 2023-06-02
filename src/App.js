import Addtask from "./components/Addtask";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import { createContext, useState } from "react";
export let taskcontext = createContext();
function App() {
  let [tasks, settasks] = useState([]);
  let [success, setsuccess] = useState(0);
  let comp_success = (array) => {
    let p = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].status == "done") {
        p++;
      }
    }
    if (array.length > 0) {
      setsuccess((p / array.length) * 100);
    }
  };
  let handleupdate = async (Title, discription, id) => {
    let response = await fetch(`http://localhost:3000/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Title: Title, discription: discription }),
    });
    const task = await response.json();
    if(response.status==200)
    {console.log(task);
    for (let i = 0; i < tasks.length; i++) {
      let element = tasks[i];
      if (element._id === id) {
        tasks[i].Title = task.Title;
        tasks[i].discription = task.discription;
      }
    }
    let newtask = tasks.slice();
    settasks(newtask);}
    else {
      console.log("plese try again");
    }
  };

  let status = async (e) => {
    e.preventDefault();
    let id = e.target.name;
    let response = await fetch(`http://localhost:3000/updateStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    if (response.status==200)
    {for (let i = 0; i < tasks.length; i++) {
      let element = tasks[i];
      if (element._id === id) {
        tasks[i].status = "done";
      }
    }
    let newtask = tasks.slice();
    console.log(newtask);
    settasks(newtask);
    comp_success(newtask);}
    else {
      console.log("please try once again")
    }
  };
  let handleDelete = async (e) => {
    e.preventDefault();
    let id = e.target.name;
    let response = await fetch(`http://localhost:3000/deleteTask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    if (response.status==200)
    {let newtask = tasks.filter((e) => {
      return e._id !== id;
    });
    settasks(newtask);
    comp_success(newtask);}
    else {
      console.log("plese try once again")
    }
  };
  let addtask = async (Title, discription) => {
    const response = await fetch("http://localhost:3000/newTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Title: Title, discription: discription }),
    });
    const task = await response.json();
    if(response.status==200)
    {let newTask = tasks.concat(task);
    settasks(newTask);
    comp_success(newTask);}
    else {
      console.log("plese try once again");
    }
  };
  return (
    <>
      <taskcontext.Provider
        value={{
          tasks,
          settasks,
          status,
          handleDelete,
          addtask,
          handleupdate,
          success,
          comp_success,
        }}
      >
        <Navbar />
        <Addtask />
        <Tasks />
      </taskcontext.Provider>
    </>
  );
}

export default App;
