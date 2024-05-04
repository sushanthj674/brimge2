import { Link } from "react-router-dom";
import '../appstyles.css';
import { storeUser } from "./Firebase";

export var username;
function LandingForm() {
  function dontdisplayme() {
    const formElement = document.querySelector(".formm");
    if (formElement) {
      formElement.style.display = 'none';
    }
  }
 function handleSubmit(event) {

  username=document.getElementById('username').value;
      if(username==""){
              alert("please enter user name")
      }
      else{
        storeUser(username) ;
        event.preventDefault(); 
         dontdisplayme();
      }
 
  }

  return (
    <>
      <div className="row formm">
        <h4 className="text-center">landing form</h4>
        <center>
            <form className="shadow text-start landing-form" >
              <label>Username:</label>
              <input type="text" required autoFocus className="mx-1 form-input " id="username" placeholder="username"></input>
              <br></br>
              <p className="my-3">Select gender</p>
              <label className="mx-3">male</label>
              <input type="radio" name="gender" className=" m-3 "></input>
              <label className="mx-3">female</label>
              <input type="radio" name="gender" className="m-3"></input>
              <br></br>
              <label>selece prefrence</label>
              <select className="width-50">
                <optgroup>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Any</option>
                </optgroup>
              </select>
              <center onClick={handleSubmit}>
                <Link to="/StartChat">
                  <button type="submit" className="btn-success btn width-50 m-3">proceed</button>
                </Link>
              </center>
            </form>
        </center>
      </div>
    </>
  );
}

export default LandingForm;