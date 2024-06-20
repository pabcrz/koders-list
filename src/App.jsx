/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import DelIcon from "./DelIcon";

function App() {
  const [koders, setKoders] = useState([]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm();

  function removeKoder(index) {
    setKoders(koders.filter((koder, i) => i !== index));
  }

  function onSubmit(data) {
    const { name, lastName, email } = data;
    setKoders([...koders, { name, lastName, email }]);
    reset();
  }
  return (
    <>
      <main className="w-full min-h-screen flex flex-col">
        <section className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-4">
          <h1 className="bg-gradient-to-bl from-blue-500 to-purple-700 text-transparent bg-clip-text font-bold text-3xl text-center">
            Lista de Koders
          </h1>

          <form
            className="flex gap-1 justify-center flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name" className="flex justify-between">
              Name:
              {errors.name && (
                <span className=" text-red-400 text-sm font-semibold">
                  {errors.name?.message}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Type your name"
              required
              className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
              {...register("name", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 2, message: "The name is too short" },
                maxLength: { value: 20, message: "The name is too long" },
              })}
            />

            <label htmlFor="name" className="flex justify-between">
              Last Name:
              {errors.lastName && (
                <span className=" text-red-400 text-sm font-semibold">
                  {errors.lastName?.message}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Type your Last Name"
              required
              className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
              {...register("lastName", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 2, message: "The last name is too short" },
                maxLength: { value: 20, message: "The last name is too long" },
              })}
            />

            <label htmlFor="name" className="flex justify-between">
              Email:
              {errors.email && (
                <span className=" text-red-400 text-sm font-semibold">
                  {errors.email?.message}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="Type your Email"
              required
              className="focus:outline-none rounded p-1 px-2 bg-slate-700 mb-2"
              {...register("email", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 5, message: "The email is too short" },
                maxLength: { value: 50, message: "The email is too long" },
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />

            <button
              className="border border-green-700 hover:shadow-none p-1 hover:bg-green-700 rounded my-4 disabled:bg-slate-400"
              disabled={isSubmitted ? !isValid : false}
            >
              Add
            </button>
          </form>
          <div className="h-4">
            <p
              className={clsx(" text-green-600 text-sm font-semibold", {
                hidden: !isValid,
              })}
            >
              Everything its ok
            </p>
          </div>
        </section>
        <section className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-4">
          {koders.length === 0 && (
            <p className="text-center text-lg font-semibold text-gray-400">
              No hay koders
            </p>
          )}
          {koders.length > 0 &&
            koders.map((koder, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-600 rounded p-1 flex justify-between"
                >
                  <div className="flex justify-between w-[85%] px-1">
                    <span className="w-1/2">
                      {koder.name} {koder.lastName}
                    </span>
                    <span className="w-1/2">{koder.email}</span>
                  </div>
                  <span className="cursor-pointer hover:bg-red-500 rounded-full p-1 text-center">
                    <DelIcon onClick={() => removeKoder(index)} />
                  </span>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
}

export default App;
