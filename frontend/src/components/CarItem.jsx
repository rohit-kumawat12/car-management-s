import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const CarItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      {/* Image Slider */}
      {note.images && note.images.length > 0 ? (
        <div id={`carousel${note._id}`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {note.images.map((image, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Car Image ${index + 1}`}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carousel${note._id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carousel${note._id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "black",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <div
          className="card-img-top"
          style={{
            height: "180px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1rem",
            color: "#6c757d",
          }}
        >
          No Image Available
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">
          {note.description?.length > 50
            ? note.description.slice(0, 50) + "..."
            : note.description}
        </p>
        <p className="card-text">
          <strong>Type:</strong> {note.tags?.car_type || "N/A"}
          <br />
          <strong>Company:</strong> {note.tags?.company || "N/A"}
          <br />
          <strong>Dealer:</strong> {note.tags?.dealer || "N/A"}
        </p>
        <p className="card-text">
          <strong>Owner ID:</strong> {note.userId || "N/A"}
        </p>
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => updateNote(note)}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarItem;
