import React, {useState, useEffect} from "react";
import axios from 'axios';

const client = axios.create({
    baseURL: "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPItotM/"
    // baseURL: "https://api.scb.se/OV0104/v1/doris/sv/ssd"
    // baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

const queryData = JSON.stringify({
"query": [
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "000004VU",
            "000004VW"
          ]
        }
      }
    ],
    "response": {
      "format": "px"
    }
  });

  const scbConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
};
const queriedData = ` 
{
  launchesPast(limit: 8) {
    id
    mission_name
  }
}
`;
const Test = () => {
  
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        /* headers: { 'Content-Type': 'application/json' }, */
        body: JSON.stringify({
          "query": [
                {
                  "code": "ContentsCode",
                  "selection": {
                    "filter": "item",
                    "values": [
                      "000004VU",
                      "000004VW"
                    ]
                  }
                }
              ],
              "response": {
                "format": "json"
              }
            })
    };
    fetch("https://api.scb.se/OV0104/v1/doris/sv/ssd/START/PR/PR0101/PR0101A/KPItotM", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data.title));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
  
  
  /* 

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState<any[]>([]);


    useEffect( () => {
        const fetchPost = async () => {
        try {
            let response = await client.post('');
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
 */
    return(
        <p>
            Blogposterna:
            {/* {posts.length > 0 &&
             posts[1].id} */}
        </p>
    )
}

export default Test;