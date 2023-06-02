import React,{memo} from 'react'


function Taskitem  ({Title,discription,status,id,handleDelete,handlestatus,updatetask}){
    let note={Title:Title,
        discription:discription,
    id:id}
  return (
    <>
    <div name={id} className={`card ${status==='panding'?'bg-secondary text-white':'bg-success text-white'}`}style={{width: "18rem",margin:'10px', boxShadow:'0px 0px 3px black'}}>
  <div className="card-body">
  <i className="fa-solid fa-bars-progress fs-2" ></i>
    <h5 className="card-title">{Title}</h5>
    <p className="card-text">{discription}</p>
    {status==='panding'?<button name={id} type="button" onClick={handlestatus} className="btn btn-primary m-1"><i className="fa-solid fa-square-check m-1"></i>Done </button>:''}
    <button type="button" name={id} onClick={()=>{updatetask(note)}} className="btn btn-primary m-1"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
    <button type="button" name={id} className="btn btn-danger m-1" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i> Delete</button>
  </div>
</div>
    </>
  )
}
export default memo(Taskitem)

