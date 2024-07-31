import React from "react";

export default function Form(props){

    const[formData, setFormData] = React.useState({
        userName : "",
        password1 : "",
        password2 : "",
        selectedBox : "userName",
        warningStatus : false,
        warningMessage : ""
    })

    function handleClick(event){
        const {name} = event.target
        setFormData(prevValue => ({
            ...prevValue,
            selectedBox : name
        }))
    }

    // function handleChange(event){
    //     const {name, value} = event.target
    //     setFormData(prevData => ({
    //         ...prevData,
    //         warningStatus : true,
    //         warningMessage : "*You cannot use the keyboard ;)"
    //     }))
    // }

    // update the box when a letter is clicked
    React.useEffect( () => {
        setFormData(prevData => ({
            ...prevData,
            [formData.selectedBox] : prevData[prevData.selectedBox] + props.selectedLetterValue,
            warningStatus : false,
            warningMessage : ""
        })); 
        }
        , [props.selectedLetterId])


    function handleClickSubmit(){
        // determine the warning message
        if(formData.userName === ""){
            setFormData(prevData => ({
                ...prevData,
                warningStatus : true,
                warningMessage : "*Username cannot be empty"
            }))
        }
        else if(formData.password1 === ""){
            setFormData(prevData => ({
                ...prevData,
                warningStatus : true,
                warningMessage : "*Password cannot be empty"
            }))
        }
        else if(formData.password2 === ""){
            setFormData(prevData => ({
                ...prevData,
                warningStatus : true,
                warningMessage : "*Password cannot be empty"
            }))
        }

        // case when the password do not matched
        else if(formData.password1 !== formData.password2){
            setFormData(prevData => ({
                ...prevData,
                warningStatus : true,
                warningMessage : "*Passwords do not match"
            }))
        }
        // case when the password matched
        else if(formData.password1 === formData.password2){
            setFormData(({
                userName : "",
                password1 : "",
                password2 : "",
                selectedBox : "userName",
                warningStatus : false,
                warningMessage : ""
            }))
        }
        else{
            setFormData(prevData => ({
                ...prevData,
                warningStatus : false,
                warningMessage : ""
            }))
        }

        console.log(`userName: ${formData.userName}\npassword1: ${formData.password1}\npassword2: ${formData.password2}`)
    }

    // check if any keyboard is pressed
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, true)
    }, [])

    function handleKeyDown(){
        setFormData(prevData => ({
            ...prevData,
            warningStatus : true,
            warningMessage : "*You cannot use the keyboard ;)"
        }))
    }

    return(
        <div  className="semuaForm">

            <div className="uiInput">

            <h3>Make an account</h3>

            <input type="text" 
            placeholder="your name" 
            name="userName"
            onClick={handleClick}
            value={formData.userName}
            ></input>

            <input type="password" 
            placeholder="password" 
            name="password1"
            onClick={handleClick}
            value={formData.password1}
            ></input>

            <input type="password" 
            placeholder="confirm your password" 
            name="password2"
            onClick={handleClick}
            value={formData.password2}
            ></input>

            <button type="submit" 
            className="submitButton"
            onClick={handleClickSubmit}>Submit</button>
            {formData.warningStatus && <p> {formData.warningMessage} </p>}
            </div>

            <hr className="myHr"/>
        </div>
    )
}