import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddText, Gettodos, deletetodos, Edittodos, editstatus } from '../Services/Allapi'; // Adjust path as needed

function Todo() {
  const [text, setText] = useState({
    title: "",
    description: ""
  });
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleClear = () => {
    setText({
      title: "",
      description: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value
    });
  };

  const fetchTodos = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const result = await Gettodos(reqHeader);
        console.log(result);

        if (result.status === 200) {
          setTodos(result.data); // Update state with fetched todos
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch todos"
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Token Missing",
          text: "Please login to fetch todos"
        });
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to fetch todos: ${error.message}`
      });
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  const addText = async (e) => {
    e.preventDefault();

    const { title, description } = text;

    if (!title || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Fill The Form Completely"
      });
    } else {
      try {
        const reqBody = { title, description };
        const token = sessionStorage.getItem('token');
        
        if (token) {
          const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };

          const result = await AddText(reqBody, reqHeader);
          console.log(result);

          if (result.status === 200) {
            console.log(result.data);
            Swal.fire({
              title: "ADDED SUCCESSFULLY",
              text: "",
              icon: "success"
            });
            handleClear();
            fetchTodos(); // Refresh todos after adding a new one
          } else {
            console.log(result.response.data);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: result.response.data.error
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Token Missing",
            text: "Please login to add a todo"
          });
        }
      } catch (error) {
        console.error("Failed to add text:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to add text: ${error.message}`
        });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const result = await deletetodos(id, reqHeader);
        if (result.status === 200) {
          Swal.fire({
            title: "Deleted Successfully",
            text: "",
            icon: "success"
          });
          fetchTodos(); // Refresh todos after deletion
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete todo"
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Token Missing",
          text: "Please login to delete todos"
        });
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to delete todo: ${error.message}`
      });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedTitle = prompt("Enter new title:");
      const updatedDescription = prompt("Enter new description:");
      if (updatedTitle && updatedDescription) {
        const reqBody = { title: updatedTitle, description: updatedDescription };
        const token = sessionStorage.getItem('token');
        if (token) {
          const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };

          const result = await Edittodos(id, reqBody, reqHeader);
          if (result.status === 200) {
            Swal.fire({
              title: "Updated Successfully",
              text: "",
              icon: "success"
            });
            fetchTodos(); // Refresh todos after update
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update todo"
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Token Missing",
            text: "Please login to update todos"
          });
        }
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to update todo: ${error.message}`
      });
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const result = await editstatus(id, { status: 'completed' }, reqHeader);
        if (result.status === 200) {
          Swal.fire({
            title: "Marked as Completed",
            text: "",
            icon: "success"
          });
          fetchTodos(); // Refresh todos after marking as completed
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to mark todo as completed"
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Token Missing",
          text: "Please login to mark todos as completed"
        });
      }
    } catch (error) {
      console.error("Failed to mark todo as completed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to mark todo as completed: ${error.message}`
      });
    }
  };

  return (
    <div className="todo-container">
      <h2 className='text-center fs-1 fw-bolder mt-1'>Add Todo</h2>
      <form onSubmit={addText}>
        <div className="form-group">
          <label className='text-black fw-bolder fs-4'>Title</label>
          <input
            type="text"
            name="title"
            value={text.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label className='text-black fw-bolder fs-4'>Description</label>
          <textarea
            name="description"
            value={text.description}
            onChange={handleInputChange}
            className="form-control"
            rows="3"
            placeholder="Enter description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-4 mt-3">Add Todo</button>
        <button type="button" onClick={handleClear} className="btn btn-secondary mt-3 ml-2">Clear</button>
      </form>

      <div className="todo-list-container">
      <div className="pending-todos">
  <h3>Pending Todos</h3>
  <ul>
    {todos.filter(todo => todo.status === 'pending').map(todo => (
      <li key={todo._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="checkbox"
          checked={false} // Ensure checkbox is unchecked
          readOnly
          style={{
            marginRight: '10px',
          }}
        />
        <strong>{todo.title}</strong>: {todo.description}
        <button
          className="btn btn-warning ms-2"
          onClick={() => handleUpdate(todo._id)}
        >
          Update
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => handleDelete(todo._id)}
        >
          Delete
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => handleComplete(todo._id)}
        >
          Complete
        </button>
      </li>
    ))}
  </ul>
</div>

        <div className="completed-todos">
  <h3>Completed Todos</h3>
  <ul>
    {todos.filter(todo => todo.status === 'completed').map(todo => (
      <li key={todo._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="checkbox"
          checked
          readOnly
          style={{
            accentColor: '#28a745', /* Green color for the checkmark */
            marginRight: '10px'
          }}
        />
        <strong>{todo.title}</strong>: {todo.description}
        <button className="btn btn-danger ms-2" onClick={() => handleDelete(todo._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
}

export default Todo;
