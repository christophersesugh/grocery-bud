import React from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState(getLocalStorage());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState(null);
  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //show alert
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      // handle editing
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      showAlert(true, "item added to list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName([]);
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger");
    const removedItem = list.filter((item) => item.id !== id);
    setList(removedItem);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <div className="container">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h2 style={{ margin: "5px" }}>Grocery Bud</h2>
        <div className="form-div">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g eggs"
              className="input"
            />
            <input
              type="submit"
              value={isEditing ? "Edit" : "Submit"}
              className="submit"
            />
          </form>
        </div>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button
          className="btn"
          onClick={() => {
            showAlert(true, "list is empty", "danger");
            setList([]);
          }}
        >
          clear items
        </button>
      </div>
    </div>
  );
}

export default App;
