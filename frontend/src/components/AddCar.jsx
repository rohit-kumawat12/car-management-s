import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddCar = () => {
  const context = useContext(NoteContext);
  const { addNote: addCar } = context;

  const [car, setCar] = useState({
    title: "",
    description: "",
    tags: { car_type: "", company: "", dealer: "" },
    images: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    const imageArray = car.images.split(",").map((img) => img.trim());
    if (imageArray.length > 10) {
      alert("A car can have up to 10 images only.");
      return;
    }
    addCar(car.title, car.description, car.tags, imageArray);
    setCar({
      title: "",
      description: "",
      tags: { car_type: "", company: "", dealer: "" },
      images: "",
    });
    // Close the modal
    document.getElementById("closeModal").click();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (["car_type", "company", "dealer"].includes(name)) {
      setCar((prevCar) => ({
        ...prevCar,
        tags: { ...prevCar.tags, [name]: value },
      }));
    } else {
      setCar((prevCar) => ({ ...prevCar, [name]: value }));
    }
  };

  return (
    <div style={{display:'flex', margin:'1%', width:'98%', justifyContent:'end'}}>
      {/* Add Car Button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCarModal"
      >
        Add New Car
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addCarModal"
        tabIndex="-1"
        aria-labelledby="addCarModalLabel"
        aria-hidden="true"
        style={{maxWidth:'100%', width:'100%', background:'#00000047'}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCarModalLabel">
                Add New Car
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={car.title}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={car.description}
                    onChange={onChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="car_type" className="form-label">
                    Car Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="car_type"
                    name="car_type"
                    value={car.tags.car_type}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    value={car.tags.company}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dealer" className="form-label">
                    Dealer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dealer"
                    name="dealer"
                    value={car.tags.dealer}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">
                    Images (comma-separated URLs)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="images"
                    name="images"
                    value={car.images}
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeModal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Add Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
