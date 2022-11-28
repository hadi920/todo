import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function TodoCard(props) {
  const [addSubTask, setAddSubTask] = useState(false);
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
    handleAddSubTask,
    handleDeleteSubTask,
    todos,
  } = props;

  useEffect(() => {
    setSubTasks(todos[todoKey].subtasks);
  });

  function toggle() {
    setAddSubTask(!addSubTask);
  }

  return (
    <>
      <div className="check">
        <div className="input-box">
          <div className="editInput">
            {!(edit === todoKey) ? (
              <>{children}</>
            ) : (
              <input
                value={edittedValue}
                onChange={(e) => setEdittedValue(e.target.value)}
              />
            )}
            {/* {children} */}
          </div>
          <div className="buttons">
            {edit === todoKey ? (
              <button className="done" onClick={handleEditTodo}>
                Done
              </button>
            ) : (
              <button className="update" onClick={handleAddEdit(todoKey)}>
                Update
              </button>
            )}

            <button className="del" onClick={handleDelete(todoKey)}>
              Delete
            </button>
            <button className="sub" onClick={toggle}>
              Subtask
            </button>
          </div>
        </div>
        <div className="subtasks">
          {!addSubTask ? (
            <>
              <ol>
                {subTasks.map((task, i) => {
                  return (
                    <div className="subtask-item">
                      <li key={i}>{task}</li>
                      <MdDelete
                        className="del-icon"
                        onClick={() => handleDeleteSubTask(todoKey, task)}
                      />
                    </div>
                  );
                })}
              </ol>
            </>
          ) : (
            <>
              <input
                type={"text"}
                placeholder={"Enter a Sub Task"}
                onChange={(e) => setSubTask(e.target.value)}
              />
              <button onClick={() => handleAddSubTask(todoKey, subTask)}>
                Add Subtask
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

{
  /* <i onClick={handleEditTodo} className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"></i>
<i onClick={handleAddEdit(todoKey)} className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"></i> */
}
{
  /* <i onClick={handleDelete(todoKey)} className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"></i> */
}
