import { useState } from "react";
import NoteContext from "./NoteContext";

 const NoteState = (props) => {

    const host = 'https://car-management-s.onrender.com/api/';
    
    const noteInitial  = [ ]
    
    const initialState = [];


    const [notes, setNotes] = useState(noteInitial);

    const fetchNote = async () => {

        const response = await fetch(`${host}cars/fetchallcars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        setNotes(json);
    }

    // const fetchNote = async () => {
    //     const response = await fetch(`${host}cars/fetchallcars`);
    //     const json = await response.json();
    
    //     // Ensure notes is always an array
    //     if (Array.isArray(json)) {
    //         setNotes(json);
    //     } else {
    //         setNotes([]); // Fallback to an empty array if response is not an array
    //     }
    // };
    

    const addNote = async (title, description, tags, images) => {
        try {
            const response = await fetch(`${host}cars/addcar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    title,
                    description,
                    tags: {
                        car_type: tags.car_type,
                        company: tags.company,
                        dealer: tags.dealer,
                    },
                    images, // Array of image URLs
                }),
            });
    
            const car = await response.json();
            if (response.ok) {
                console.log(car);
                setNotes((prevCars) => prevCars.concat(car.savedCar)); // Update state
            } else {
                console.error("Error adding car:", car);
            }
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };
    
    

    const deleteNote = async (id) => {

        const response = await fetch(`${host}cars/deletecar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        const json = await response.json();
        console.log(json);
    }

    // const editNote = async (id, title, description, tag) => {
    //     const response = await fetch(`${host}notes/updatecar/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({title, description, tag})
    //     });
    //     const json = await response.json();
    //     console.log(json);
        
    //     for(let i=0;i<notes.length;i++){
    //         const element = notes[i];
    //         if(element._id===id){
    //             notes[i].title=title;
    //             notes[i].description=description;
    //             notes[i].tag=tag;
    //             break;
    //         }
    //     }
    // }

    const editNote = async (id, title, description, tags, images) => {
        try {
            const response = await fetch(`${host}cars/updatecar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tags, images }), // Pass updated fields
            });
    
            const json = await response.json();
            console.log(json);
    
            if (response.ok) {
                // Update the notes array with the updated car details
                const updatedNotes = notes.map((note) =>
                    note._id === id
                        ? { ...note, title, description, tags, images }
                        : note
                );
                setNotes(updatedNotes); // Update the state
            } else {
                console.error("Failed to update car:", json);
            }
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };
    

    const getUser = async () => {

        const response = await fetch(`${host}auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        return json;
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNote, getUser}}>
            {props.children}
        </NoteContext.Provider>
    );
 }

 export default NoteState;