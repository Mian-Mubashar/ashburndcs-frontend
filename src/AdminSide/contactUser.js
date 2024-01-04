import axios from "axios";
import { useEffect, useState } from "react";
import CreateModal from "./create";
import tw from "twin.macro";

const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

export default function ElearnListing() {
  const [tableData, setTableData] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const handleCreate = () => setIsCreate(!isCreate);
  useEffect(() => {
    axios
      .get("http://localhost:4200/api/learning/view")
      .then((response) => {
        if (response) {
          setTableData(response?.data?.data);
          console.log("response", response);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  console.log("--------------", tableData);
  return (
    <>
      <div className="flex-none rounded-full bg-emerald-500/20 p-1"></div>
      <ul className="divide-y divide-gray-100">
        {tableData?.map((data) => (
          <li key={data?.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={data?.imageSrc?.src}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {data?.heading}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {data?.subHeading}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">
                {data?.description}
              </p> */}
              {data?.price ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  ${" "}
                  <p className="text-xs leading-5 text-gray-500">
                    {data?.price}
                  </p>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  {/* <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div> */}
                  <p className="text-xs leading-5 text-gray-500">
                    {" "}
                    <SubmitButton>Submit</SubmitButton>
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <CreateModal
        open={isCreate}
        setOpen={setIsCreate}
        handleOpen={handleCreate}
      />
    </>
  );
}
