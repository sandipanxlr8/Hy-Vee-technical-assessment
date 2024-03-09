"use client";

import React, { useState } from "react";
import Image from "next/image";
import { fetchAge, fetchGender, fetchCountry } from "../utils/api";

const Home: React.FC = () => {
  const [enteredName, setEnteredName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const ageData = await fetchAge(enteredName);
      const genderData = await fetchGender(enteredName);
      const countryData = await fetchCountry(enteredName);

      setEnteredName("");
      setAge(ageData.age ?? 0);
      setGender(genderData.gender ?? "Unknown");
      const countryCode = countryData.country?.[0]?.country_id ?? "Unknown";
      let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
      setCountry(regionNames.of(countryCode));
    } catch (error) {
      console.log(error);

      setError("An error occurred at API. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container h-screen py-4">
      <div className="mx-auto max-w-xl h-full flex flex-col justify-between">
        <div className="p-4">
          <h1 className="font-semibold leading-7 text-gray-900 text-3xl text-center mb-6">
            Guesser
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={enteredName}
                  onChange={(e) => setEnteredName(e.target.value)}
                  placeholder="Enter a name"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Guessing ..." : "Guess"}
                </button>
              </div>
            </div>
          </form>

          {/* Result section */}
          {error && (
            <p className="text-red-500 font-medium text-md mt-4">{error}</p>
          )}

          {isLoading ? (
            // <div className="flex justify-center items-center">
            //   <div className="animate-spin rounded-full h-10 w-10 bg-gray-200"></div>
            // </div>
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mt-4 flex flex-col space-y-2"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            !error &&
            gender &&
            age &&
            country && (
              <div className="mt-4 flex flex-col space-y-2">
                <p className="text-gray-700">Age: {age ? age : "Unknown"}</p>
                <p className="text-gray-700">
                  Gender: {gender ? gender : "Unknown"}
                </p>
                <p className="text-gray-700">
                  Country: {country ? country : "Unknown"}
                </p>
              </div>
            )
          )}
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          A Guessing web application using{" "}
          <a href="https://nextjs.org/" className="underline">
            Next.js
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
