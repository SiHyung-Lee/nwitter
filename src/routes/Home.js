import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const data = await dbService.collection('nweets').get();
        data.forEach((document) => {
            console.log(document.data());
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection('nweets').add({
            nweet,
            createdAt: Date.now(),
        });
        setNweet('');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type='text'
                    placeholder="What's on your mind"
                />
                <input type='submit' value='Nweet' />
            </form>
        </div>
    );
};

export default Home;
