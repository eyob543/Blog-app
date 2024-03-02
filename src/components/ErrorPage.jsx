export default function ErrorPage({ errorMessage }){
    return(
        <>
            <h3>Oops an  error occured</h3>
            <h4>{errorMessage}</h4>
        </>
    )
}