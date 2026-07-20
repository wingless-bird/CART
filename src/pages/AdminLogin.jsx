import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";


export default function AdminLogin() {


  const {
  isAdminLoggedIn,
  authLoading,
  loginAdmin,
  logoutAdmin,
  changeAdminPassword
} = useInventory();


  const navigate = useNavigate();

  // ==================================================
// WAIT FOR JWT SESSION CHECK
// ==================================================

useEffect(() => {

  if (!authLoading && isAdminLoggedIn) {

    navigate("/admin", {
      replace: true
    });

  }

}, [
  authLoading,
  isAdminLoggedIn,
  navigate
]);

if (authLoading) {

  return (

    <div className="admin-login-page">

      <h2>
        Checking session...
      </h2>

    </div>

  );

}

  // ==========================
  // LOGIN STATE
  // ==========================

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [loginError,setLoginError] = useState("");



  // ==========================
  // CHANGE CREDENTIALS STATE
  // ==========================

  const [newUsername,setNewUsername] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);

  const [loading,setLoading] = useState(false);



  // ==========================
  // LOGIN
  // ==========================

  const handleLoginSubmit = async(e)=>{

    e.preventDefault();

    setLoginError("");

    setLoading(true);


    try{

      const success = await loginAdmin(
        username,
        password
      );


      if(success){

      navigate("/admin", {
        replace: true
      });

      }
      else{

        setLoginError(
          "Invalid username or password."
        );

      }


    }
    catch(error){

      console.error(
        "Login Error:",
        error
      );

      setLoginError(
        "Something went wrong."
      );

    }
    finally{

      setLoading(false);

    }

  };





  // ==========================
  // UPDATE ADMIN CREDENTIALS
  // ==========================

  const handlePasswordChangeSubmit = async(e)=>{

    e.preventDefault();



    if(!newUsername || !newPassword){

      alert(
        "Username and password are required."
      );

      return;

    }



    if(newPassword !== confirmPassword){

      alert(
        "Passwords do not match."
      );

      return;

    }



    setLoading(true);


    try{


      const result =
        await changeAdminPassword(
          newUsername,
          newPassword
        );


      if(result){

        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");

      }


    }
    catch(error){

      console.error(
        "Credential Update Error:",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };



  // ==================================================
  // VIEW A
  // LOGGED IN SECURITY PANEL
  // ==================================================

  if(isAdminLoggedIn){

    return (

      <div className="admin-security-container">
        <h2 className="admin-security-title">
          🔒 Security Credentials Manager
        </h2>



        <p className="admin-security-subtitle">
          Update administrator username and password.
        </p>




        <form
          className="admin-security-form"
          onSubmit={handlePasswordChangeSubmit}
        >



          {/* NEW USERNAME */}

          <div>

            <label className="admin-form-label">
              New Username
            </label>


            <input
              type="text"
              value={newUsername}
              required
              placeholder="Enter new username"
              onChange={
                e=>setNewUsername(e.target.value)
              }
              className="admin-form-input"
            />

          </div>




          {/* NEW PASSWORD */}

          <div>

            <label className="admin-form-label">
              New Password
            </label>


            <input
              type={
                showPassword
                ?
                "text"
                :
                "password"
              }
              value={newPassword}
              required
              placeholder="Enter new password"
              onChange={
                e=>setNewPassword(e.target.value)
              }
              className="admin-form-input"
            />

          </div>





          {/* CONFIRM PASSWORD */}

          <div>

            <label className="admin-form-label">
              Confirm Password
            </label>


            <input
              type={
                showPassword
                ?
                "text"
                :
                "password"
              }
              value={confirmPassword}
              required
              placeholder="Confirm new password"
              onChange={
                e=>setConfirmPassword(e.target.value)
              }
              className="admin-form-input"
            />

          </div>





          {/* SHOW PASSWORD */}

          <label className="admin-checkbox-label">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={
                ()=>setShowPassword(
                  !showPassword
                )
              }
            />


            Show passwords

          </label>





          {/* SAVE BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="admin-credentials-save-btn"
          >

            {
              loading
              ?
              "Updating..."
              :
              "Commit Credentials Change"
            }


          </button>


        </form>





        {/* ACTION BUTTONS */}

        <div className="admin-action-row">


          <button
            onClick={()=>{
              navigate("/admin");
            }}
            className="admin-dashboard-btn"
          >

            Return Dashboard

          </button>





          <button
            onClick={()=>{

              logoutAdmin();

            navigate("/", {
              replace: true
            });
            }}
            className="admin-logout-btn"
          >

            Logout

          </button>



        </div>



      </div>

    );

  }
    // ==================================================
  // VIEW B
  // LOGIN PAGE
  // ==================================================

  return (

    <div className="admin-login-page">



      <div className="admin-login-header">


        <div className="admin-login-icon">
          ⚙️
        </div>



        <h2 className="admin-login-title">
          Admin Gateway
        </h2>



        <p className="admin-login-subtitle">
          Authentication Required
        </p>


      </div>





      {
        loginError && (

          <div className="admin-login-error">

            ⚠️ {loginError}

          </div>

        )
      }






      <form
        onSubmit={handleLoginSubmit}
        className="admin-login-form"
      >



        {/* USERNAME */}

        <div>


          <label className="admin-form-label">

            Username

          </label>



          <input
            type="text"
            required
            value={username}
            placeholder="Enter admin username"
            onChange={
              e=>setUsername(e.target.value)
            }
            className="admin-form-input"
          />


        </div>






        {/* PASSWORD */}

        <div>


          <label className="admin-form-label">

            Password

          </label>



          <input
            type={
              showPassword
              ?
              "text"
              :
              "password"
            }
            required
            value={password}
            placeholder="Enter password"
            onChange={
              e=>setPassword(e.target.value)
            }
            className="admin-form-input"
          />


        </div>







        {/* SHOW PASSWORD */}

        <label className="admin-checkbox-label">


          <input
            type="checkbox"
            checked={showPassword}
            onChange={
              ()=>setShowPassword(
                !showPassword
              )
            }
          />


          Show password


        </label>







        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="admin-login-submit-btn"
        >

          {
            loading
            ?
            "Checking..."
            :
            "Verify Credentials & Enter"
          }


        </button>



      </form>


    </div>

  );

}