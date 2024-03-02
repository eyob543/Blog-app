import { useParams } from "react-router-dom"
import { database } from "../firebase"
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "../components/ErrorPage";
export default function BlogsDetail(){
    const [blogDetail, setBlogDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const db = database;
    const blogCountRef = ref(db, "blogs");

    useEffect(() => {
        onValue(blogCountRef, (snapshot) => {
            try{
                setLoading(true);
                const data = snapshot.val();
                setBlogDetail([...data.filter((_, index) => index == id)])
            }catch(error){
                console.log({ error })
                return <ErrorPage errorMessage={error}/>
            }finally{
                setLoading(false)
            }
        });
    }, [id])
   
    return(
        <>
            {loading && <FontAwesomeIcon icon={faSpinner}/>}
            {
                blogDetail.length !== 0 && (
                    <main className="flex gap-y-10 flex-wrap flex-col justify-center">
                        <h1 className="text-center text-3xl font-semibold capitalize">{blogDetail[0].title}</h1>
                        <img className="justify-cente mx-auto max-w-auto" src={blogDetail[0].imageURL} />
                        <p className="text-wrap max-w-2xl">{blogDetail[0].description}</p>
                    </main>
                )
            }
        </>
    )
}
