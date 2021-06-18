import React from "react";

import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <React.Fragment>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <p className="list" key={id}>
            {title}
            <span className="span">
              <button
                type="button"
                className="edit-icon"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-icon"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </span>
          </p>
        );
      })}
    </React.Fragment>
  );
};

export default List;
