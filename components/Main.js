import { auth, db } from "../utils/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { userAgent } from "next/server";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import useFetchTodos from "../hooks/fetchTodos";
import TodoCard from "./TodoCard";

export default function Main() {
  const { userInfo, currentUser, logout } = useAuth();
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const [edittedValue, setEdittedValue] = useState("");

  const { todos, setTodos, loading, error } = useFetchTodos();
  const logOut = async () => {
    await logout(auth);
  };
  async function handleAddTodo() {
    if (!todo) {
      return;
    }
    const newKey =
      Object.keys(todos || {}).length === 0
        ? 1
        : Math.max(...Object.keys(todos || {})) + 1;
    setTodos({
      ...todos,
      [newKey]: {
        task: todo,
        subtasks: [],
      },
    });
    const userRef = doc(db, "tasks", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: {
            task: todo,
            subtasks: [],
          },
        },
      },
      { merge: true }
    );
    setTodo("");
  }

  async function handleDeleteSubTask(todoKey, subTask) {
    const userRef = doc(db, "tasks", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [todoKey]: {
            subtasks: arrayRemove(subTask),
          },
        },
      },
      { merge: true }
    );
    window.location.reload(true);
  }

  async function handleAddSubTask(todoKey, subTask) {
    const userRef = doc(db, "tasks", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [todoKey]: {
            subtasks: arrayUnion(subTask),
          },
        },
      },
      { merge: true }
    );
    window.location.reload(true);
  }

  async function handleEditTodo() {
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(db, "tasks", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(null);
    setEdittedValue("");
  }
  function handleAddEdit(todoKey) {
    return () => {
      console.log(todos[todoKey]);
      console.log("bannan");
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }
  function handleDelete(todoKey) {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];
      console.log("clicked");
      console.log(todoKey);
      console.log(tempObj);

      setTodos(tempObj);
      const userRef = doc(db, "tasks", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  }

  return (
    <div>
      <div className="container">
        <div className="heading">
          <h1>{currentUser.email}</h1>
          <h1>TODO - LIST</h1>
        </div>
        <div className="input">
          <input
            type={"text"}
            placeholder={"Enter a Task"}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button onClick={handleAddTodo}>Create Task</button>
        </div>
        <div className="tasks">
          <h3>Pending Tasks</h3>
          {!loading && (
            <>
              {Object.keys(todos).map((todo, i) => {
                return (
                  <TodoCard
                    handleEditTodo={handleEditTodo}
                    key={i}
                    handleAddEdit={handleAddEdit}
                    edit={edit}
                    todoKey={todo}
                    edittedValue={edittedValue}
                    setEdittedValue={setEdittedValue}
                    handleDelete={handleDelete}
                    handleAddSubTask={handleAddSubTask}
                    handleDeleteSubTask={handleDeleteSubTask}
                    todos={todos}
                  >
                    {todos[todo].task}
                  </TodoCard>
                );
              })}
            </>
          )}
        </div>
        <div className="tasks">{""}</div>
      </div>
      <div className="logout">
        <button onClick={logOut}>
          <Link className="link" href={"/"}>
            Logout
          </Link>
        </button>
      </div>
    </div>
  );
}
