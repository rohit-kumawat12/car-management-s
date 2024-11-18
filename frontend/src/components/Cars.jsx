import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import CarItem from "./CarItem";
import AddCar from "./AddCar";

const Cars = () => {
    const context = useContext(NoteContext);
    const { notes, fetchNote } = context;

    const [note, setNote] = useState({
        eid: "",
        etitle: "",
        edescription: "",
        etag: { car_type: "", company: "", dealer: "" },
        eimages: "",
    });

    useEffect(() => {
        fetchNote();
    }, [fetchNote]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            eid: currentNote._id,
            etitle: currentNote.title,
            etag: currentNote.tags,
            edescription: currentNote.description,
            eimages: currentNote.images.join(", "),
        });
    };

    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <div className="cars-container">
            <AddCar />
            <div className="car-list" style={{display:'flex',flexWrap:'wrap'}}>
                {notes.length === 0 ? (
                    <p>No cars to display</p>
                ) : (
                    notes.map((note) => <CarItem key={note._id} note={note} updateNote={updateNote}/>)
                )}
            </div>
        </div>
    );
};

export default Cars;
