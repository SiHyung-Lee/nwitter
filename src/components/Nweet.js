import React, { useState } from 'react';
import { dbService } from 'fbase';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm('Are you sure you want to delete this nweet');
        if (ok) {
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    };
    const toggleEditClick = () => {
        setEditing((prev) => !prev);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            value={newNweet}
                            placeholder='Edit your nweet'
                            onChange={onChange}
                            required
                        />
                        <input type='submit' value='Update Nweet' />
                    </form>
                    <button onClick={toggleEditClick}>Cancel</button>
                </>
            ) : (
                <div>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Nweet
                            </button>
                            <button onClick={toggleEditClick}>
                                Edit Nweet
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Nweet;
