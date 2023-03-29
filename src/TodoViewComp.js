import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPenToSquare,
  faCheck,
  faTrashCanArrowUp,
  faThumbsDown,
  faBookmark,
  faArrowRotateBack,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faStar } from "@fortawesome/free-regular-svg-icons";

const arrayObjects = [
  {
    id: 1,
    text: "Noskriet 10km",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 2,
    text: "Notīrīt hanteles",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 3,
    text: "Aizbraukt uz tirgu",
    completed: false,
    deleted: false,
    isEdit: false
  },
  {
    id: 4,
    text: "Salabot mašīnu",
    completed: false,
    deleted: false,
    isEdit: false
  }
];

export default function TodoViewComp() {
  const [todoList, setTodoList] = useState(arrayObjects);
  const [viewType, steViewType] = useState(0);
  const [editText, setEditText] = useState("");
  const [inputText, setInputText] = useState("");

  function RemoveAll() {
    setTodoList([]);
  }

  function RemoveDeleted() {
    let newTodoList = todoList.filter((todo) => todo.deleted === false);
    setTodoList(newTodoList);
  }

  function RemoveCompleted() {
    let newTodoList = todoList.filter((todo) => todo.completed === false);
    setTodoList(newTodoList);
  }

  function completeTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function saveTodoItem(itemId) {
    if (editText.length === 0) return;

    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdit: false, text: editText };
      }
      return todo;
    });

    setTodoList(newTodoList);
    setEditText("");
  }

  function getNewId() {
    let maxId = 0;
    todoList.map((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    return maxId + 1;
  }

  function addTodoItem() {
    if (inputText.length === 0) return;

    let todoId = getNewId();

    let newTodoItem = {
      id: todoId,
      text: inputText,
      completed: false,
      deleted: false,
      isEdit: false
    };
    const items = todoList;
    setTodoList([...todoList, newTodoItem]);
    setInputText("");
  }

  function TodoItemTextDeleted(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }
  function restoreTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: false, completed: false, isEdit: false };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }

  function ChangeViewType(viewType) {
    steViewType(viewType);
  }

  function editTodoItem(itemId) {
    const item = todoList.find((todo) => todo.id === itemId);
    setEditText(item.text);

    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdit: true };
      } else {
        return { ...todo, isEdit: false };
      }
    });

    setTodoList(newTodoList);
  }

  let newList = [];
  if (viewType === 0) {
    newList = todoList;
  } else if (viewType === 1) {
    newList = todoList.filter((todo) => todo.deleted === true);
  } else if (viewType === 2) {
    newList = todoList.filter((todo) => todo.completed === true);
  } else if (viewType === 3) {
    newList = todoList.filter(
      (todo) => todo.completed === false && todo.deleted === false
    );
  }

  return (
    <div>
      <div className="RowStyle">
        <button className="BtnStyle2" onClick={() => ChangeViewType(0)}>
          Attēlot visus
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(1)}>
          Attēlot dzēstos
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(2)}>
          Attēlot pabeigtos
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(3)}>
          Attēlot aktīvos
        </button>
      </div>
      <div className="RowInputStyle">
        <div className="RowInputStyle1st">
          <input
            className="InputText"
            type="text"
            value={inputText}
            placeholder="Pievienot darbiņu"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="BtnStyle" onClick={addTodoItem} title="Pievienot">
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </div>
        <div className="RowInputStyle2nd">
          <button
            className="BtnStyle"
            onClick={RemoveAll}
            title="Izdzēst visus ierakstus"
          >
            <FontAwesomeIcon icon={faTrashCanArrowUp} />
          </button>
          <button
            className="BtnStyle"
            onClick={RemoveDeleted}
            title="Izdzēst neizdarītos"
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
          <button
            className="BtnStyle"
            onClick={RemoveCompleted}
            title="Izdzēst paveiktos"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
      </div>
      <div className="RowStyle">
        {newList.map((item) => {
          let spanClassName = "TodoItemText";
          if (item.completed) spanClassName = "TodoItemTextCompleted";
          if (item.deleted) spanClassName = "TodoItemTextDeleted";

          return (
            <div key={item.id} className="RowItemStyle">
              <div>
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="RowItemStyleText">
                {item.isEdit === false && (
                  <span className={spanClassName}>{item.text}</span>
                )}
                {item.isEdit && (
                  <input
                    type="text"
                    className="RowItemStyleInput"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                )}
              </div>
              <div>
                {!item.completed && !item.deleted && !item.isEdit && (
                  <>
                    <button
                      onClick={() => completeTodoItem(item.id)}
                      title="Pabeigt"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() => TodoItemTextDeleted(item.id)}
                      title="Nepabeigt"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button onClick={() => editTodoItem(item.id)} title="Labot">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </>
                )}

                {item.isEdit && (
                  <button
                    onClick={() => saveTodoItem(item.id)}
                    title="Saglabāt"
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                )}
                {(item.completed || item.deleted || item.isEdit) && (
                  <button
                    onClick={() => restoreTodoItem(item.id)}
                    title="Atjaunot"
                  >
                    <FontAwesomeIcon icon={faArrowRotateBack} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
