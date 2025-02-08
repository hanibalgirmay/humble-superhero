import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import NewHeroModal from "./components/NewHeroModal";
import { toast } from "react-toastify";
import { useForm, useFormContext } from "react-hook-form";

interface apiReponse {
  name: string;
  superpower: string;
  humilityScore: number;
}
function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [superheros, setSuperHeros] = useState<apiReponse[]>([]);

  const methods = useForm();

  const getSuperHeros = async () => {
    const response = await axios.get("http://localhost:5000/superheroes");
    console.log(response);
    setSuperHeros(response.data);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleApplication = (data: any) => {
    console.log("form submitted", data);
    const _data = {
      ...data,
      humilityScore: parseInt(data.humilityScore),
    };
    axios
      .post("http://localhost:5000/superheroes", _data)
      .then((response) => {
        toast.success("Superhero added successfully");
        setOpenModal(false);
        methods.reset();
        getSuperHeros();
      })
      .catch((error) => {
        error.response.data?.message?.forEach((error: any) => {
          toast.error(error);
        });
      });
  };

  useEffect(() => {
    getSuperHeros();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-blue-50 items-center justify-center space-y-4">
      <div className="flex flex-col h-full w-full items-center space-y-4">
        <div className="max-w-7xl md:min-w-[800px] w-full mx-auto bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between md:items-center items-start">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-gray-500">SuperHero</span>
              <h2 className="font-bold text-xl">SuperHeros Add and list</h2>
            </div>
            <button
              type="button"
              onClick={handleModal}
              className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold"
            >
              Add New Superheros
            </button>
          </div>
          <div className="mt-20">
            <span className="underline font-semibold font-mono decoration-wavy">
              List of superheros
            </span>
            <div className="flex flex-col gap-4">
              {superheros.map((hero, index) => (
                <div
                  key={index}
                  className="w-full mx-auto my-1 bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {hero.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Superpower: {hero.superpower}
                    </p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Humility Score:{" "}
                      </span>
                      <span className="ml-2 text-lg text-blue-500">
                        {hero.humilityScore}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <NewHeroModal
          methods={methods}
          handleForm={handleApplication}
          setOpenModal={handleModal}
        />
      )}
    </div>
  );
}

export default App;
