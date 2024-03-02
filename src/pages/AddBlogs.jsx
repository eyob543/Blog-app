import { useState } from "react";
import { database } from "../firebase"
import { set, ref, onValue } from 'firebase/database'
import _ from 'lodash'
export default function AddBlog(){
    const db = database;
    const [message, setMessage] = useState("");
    const [inputs, setInputs] =useState({
        title: "",
        imageURL:"",
        description:""
    });
    const blogCountRef = ref(db, "blogs");

    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    function handleSubmit(event){
        event.preventDefault();
        let numberOfBlogPosts;
        onValue(blogCountRef, (snapshot) => {
            const data = snapshot.val();
            numberOfBlogPosts = _.toArray(data).length
        });

        if(inputs.title === "" || inputs.description === ""){
            setMessage("Please enter the title and description of your blog")
        }else{
            set(ref(db, `blogs/${numberOfBlogPosts}`), {
                title:inputs.title,
                imageURL:inputs.imageURL,
                description:inputs.description
            })
            setInputs({
                title: "",
                imageURL:"",
                description:""
            })
            setMessage("Blog posted successfully")
        }


        
    }
    return(
        <>
            <form className="flex flex-col flex-wrap gap-y-5" onSubmit={handleSubmit}>
                <div htmlFor="title">                    
                    <label>
                        Title: 
                    </label>
                    <input 
                        type="text"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input 
                        type="text"
                        name="imageURL"
                        value={inputs.imageURL || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <label htmlFor="description" className="my-auto">Description:</label>
                     <textarea 
                        cols="23"
                        rows="2"
                        name="description"
                        value={inputs.description || ""}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="mx-auto font-sans font-bold rounded-lg outline-none py-2 w-1/3 hover:bg-blue-700 cursor-pointer text-white bg-blue-500">Post</button>
            {message === "Blog posted successfully" && <p className="text-center">{message}</p>}
            {message !== "" && message !== "Blog posted successfully" && <p className="text-center">{message}</p>}
            </form>
        </>
    )
}