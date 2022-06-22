import React from "react";

export default function Event({
    event,
    handleDelete
}) {
    const [newTitle, setNewTitle] = React.useState(event.title);

    return (
        <div className="event">
            <input type="text" value={event.name} readOnly={true}/>
            <button className="button-delete"
            onClick={() => handleDelete(event.name)}>
                DELETE
            </button>
        </div>
    );
}