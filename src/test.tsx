import React, {useState, useEffect} from "react";
import axios from 'axios';

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts"
});


const Test = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState<any[]>([]);


    useEffect( () => {
        const fetchPost = async () => {
        try{
            let response = await client.get('?_limit=10');
            setPosts(response.data);
            console.log(response.headers);
            console.log("nu kommer själva datan:")
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
        };
        fetchPost();
        
    }, []);

    return(
        <p>
            Blogposterna:
            {posts.length > 0 &&
             posts[1].id}
        </p>
    )
}

export default Test;