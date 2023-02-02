// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const Form = () => {
//   const schema = yup.object().shape({
//     email: yup.string().email("Invalid Email!").required("Email required!"),
//     password: yup.string().min(4).max(20).required("Password required!"),
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     mode: "onBlur",
//     resolver: yupResolver(schema),
//   });

//   const [buttonActive, setButtonActive] = useState(false);
//   const watchEmail = watch("email", "");
//   const watchPassword = watch("password", "");

//   useEffect(() => {
//     if (
//       Object.keys(errors).length === 0 &&
//       watchEmail !== "" &&
//       watchPassword !== ""
//     ) {
//       setButtonActive(true);
//     }
//   }, [errors, watchEmail, watchPassword]);

//   const onSubmit = (data) => {
//     if (Object.keys(errors).length === 0) {
//       console.log(data);
//     } else {
//       return;
//     }
//   };

  return (
    <div>FORM HERE</div>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input type="text" placeholder="Email" {...register("email")} />
    //   <p>{errors.email?.message}</p>
    //   <input type="password" placeholder="Password" {...register("password")} />
    //   <p>{errors.password?.message}</p>
    //   {buttonActive ? (
    //     <input type="submit" className="btn-active" />
    //   ) : (
    //     <input type="submit" className="btn" />
    //   )}
    // </form>
  );
};

export default Form;
