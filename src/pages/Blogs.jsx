import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from 'firebase/database'
import { database } from "../firebase"
import _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const db = database;
    const blogCountRef = ref(db, "blogs");
    let length = 0;
    useEffect(() => {
        async function getBlogs(){
            try{
                setLoading(true)
                onValue(blogCountRef, (snapshot) => {
                    const data = snapshot.val();
                    length = data.length;
                    setBlogs([...data])
                });
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false)
            }
        }
        getBlogs();
    }, [length])
   
    return(
        <>
            <div className="container flex flex-wrap gap-10 justify-center">
            {loading || blogs.length === 0 && (
            <>
                <FontAwesomeIcon className="text-3xl animate-spin" icon={faSpinner}/>
                <p>Loading...</p>
            </>
            )}
                {   
                    blogs.length !== 0 && (
                        blogs.map((value, index) => 
                            <div className="flex flex-col" key={index}>
                                <h3 className="text-4xl font-semibold text-center capitalize">{value.title}</h3>
                                {value.imageURL && <img src={value.imageURL} alt="" />}
                                <p>{_.truncate(value.description)}</p>
                                <Link className="underline text-blue-400 hover:text-blue-600" to={`add-blog/${index}`}>Read more</Link>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}
