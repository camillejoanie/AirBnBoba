// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import * as sessionActions from "../../store/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors({});
//       return dispatch(
//         sessionActions.signup({
//           email,
//           username,
//           firstName,
//           lastName,
//           password,
//         })
//       )
//         .then(closeModal)
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) {
//             setErrors(data.errors);
//           }
//         });
//     }
//     return setErrors({
//       confirmPassword: "Confirm Password field must be the same as the Password field"
//     });
//   };

//   const handleClose = () => {
//     closeModal();
//   };

//   return (
//     <div className="signup-form-container">
//       <button className="close-button" onClick={handleClose}>
//                 X
//       </button>
//       <h1 className="signup-form-title">Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input
//             className="signup-input"
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         {errors.email && <p className="signup-error">{errors.email}</p>}
//         <label>
//           Username
//           <input
//             className="signup-input"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         {errors.username && <p className="signup-error">{errors.username}</p>}
//         <label>
//           First Name
//           <input
//             className="signup-input"
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
//         <label>
//           Last Name
//           <input
//             className="signup-input"
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </label>
//         {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
//         <label>
//           Password
//           <input
//             className="signup-input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p className="signup-error">{errors.password}</p>}
//         <label>
//           Confirm Password
//           <input
//             className="signup-input"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.confirmPassword && (
//           <p className="signup-error">{errors.confirmPassword}</p>
//         )}
//         <button className="signup-button" type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default SignupFormModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleClose = () => {
    closeModal();
  };

  // Function to check if the Sign Up button should be disabled
  const isButtonDisabled = () => {
    return (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      password.length < 6 ||
      // confirmPassword !== password ||
      username.length < 4
    );
  };

  return (
    <div className="signup-form-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h1 className="signup-form-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="signup-error">{errors.email}</p>}
        <label>
          Username
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="signup-error">{errors.username}</p>}
        <label>
          First Name
          <input
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
        <label>
          Password
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="signup-error">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="signup-error">{errors.confirmPassword}</p>
        )}
        <button
          className={`signup-button ${isButtonDisabled() ? 'signup-button-disabled' : ''}`}
          type="submit"
          disabled={isButtonDisabled()}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
