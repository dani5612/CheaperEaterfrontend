import { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../api/localStorage";

export const addressDetailsContext = createContext();

const AddressDetailsProvider = (props) => {
  const [addressDetails, setAddressDetails] = useState({
    address: { address1: "Set Location" },
  });

  useEffect(() => {
    (async () => {
      const storedAddress = await getLocalStorage("address");

      if (!storedAddress?.address?.address1) {
        await setLocalStorage("address", {
          address: { address1: "Set Location" },
        });
      } else {
        setAddressDetails(storedAddress);
      }
    })();
  }, []);

  return (
    <addressDetailsContext.Provider value={[addressDetails, setAddressDetails]}>
      {props.children}
    </addressDetailsContext.Provider>
  );
};

export default AddressDetailsProvider;
