import { NextPage } from "next";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useFormFields } from "../src/lib/utils";
import { supabase } from "../src/lib/supabase";

type SignUpFieldProps = {
  email: string;
  password: string;
};

type SupabaseSignupPayload = SignUpFieldProps; // type alias

// the value we'd like to initialize the SignUp form with
const FORM_VALUES: SignUpFieldProps = {
  email: "",
  password: "",
};

function Signin() {
  const [loading, setLoading] = useState(false);

  const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES);

  const signUp = async (payload: SupabaseSignupPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        console.log({ message: error.message, type: "error" });
      } else {
        console.log({
          message:
            "Signup successful. Please check your inbox for a confirmation email!",
          type: "success",
        });
      }
    } catch (error) {
      console.log({ message: error.error_description || error, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    signUp(values);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      {/* App logo and tagline*/}
      <div className="w-full text-center mb-4 flex  flex-col place-items-center">
        <div>
          <FaLock className="text-gray-600 text-5xl shadow-sm" />
        </div>
        <h3 className="text-3xl text-gray-600">
          Supa<strong>Auth</strong>
        </h3>
        <small>
          Please provide your <strong>email</strong> and{" "}
          <strong>password</strong> and sign up
        </small>
      </div>

      {/* Sign Up form  */}
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Your Email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              placeholder="Your password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>

          {/*  Sign Up form: Actions */}

          <div className="flex pt-4 gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="h-12 w-12 relative">{loading}</div>
    </div>
  );
}

export default Signin;

// // define the shape of the SignUp form's fields
// type SignUpFieldProps = {
//   email: string;
//   password: string;
// };

// type SupabaseSignupPayload = SignUpFieldProps; // type alias

// // the value we'd like to initialize the SignUp form with
// const FORM_VALUES: SignUpFieldProps = {
//   email: "",
//   password: "",
// };

// function Signin() {
//   const [loading, setLoading] = useState(false);

//   const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES);

//   const signUp = async (payload: SupabaseSignupPayload) => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signUp(payload);
//       if (error) {
//         console.log({ message: error.message, type: "error" });
//       } else {
//         console.log({
//           message:
//             "Signup successful. Please check your inbox for a confirmation email!",
//           type: "success",
//         });
//       }
//     } catch (error) {
//       console.log({ message: error.error_description || error, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSumbit = (event: React.FormEvent) => {
//     event.preventDefault();
//     signUp(values);
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center relative">
//       {/* App logo and tagline*/}
//       <div className="w-full text-center mb-4 flex  flex-col place-items-center">
//         <div>
//           <FaLock className="text-gray-600 text-5xl shadow-sm" />
//         </div>
//         <h3 className="text-3xl text-gray-600">
//           Supa<strong>Auth</strong>
//         </h3>
//         <small>
//           Please provide your <strong>email</strong> and{" "}
//           <strong>password</strong> and sign up
//         </small>
//       </div>

//       {/* Sign Up form  */}
//       <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
//         <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block font-semibold text-gray-800 mb-2"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
//               placeholder="Your Email"
//               required
//               value={values.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block font-semibold text-gray-800 mb-2"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
//               placeholder="Your password"
//               required
//               value={values.password}
//               onChange={handleChange}
//             />
//           </div>

//           {/*  Sign Up form: Actions */}

//           <div className="flex pt-4 gap-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow"
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="h-12 w-12 relative">{loading}</div>
//     </div>
//   );
// }

// export default Signin;
