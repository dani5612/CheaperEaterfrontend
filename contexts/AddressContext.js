import { createContext, useState } from "react";

export const addressDetailsContext = createContext();

const AddressDetailsProvider = (props) => {
  const [addressDetails, setAddressDetails] = useState({
    address: { address1: "Set Location" },
  });

  return (
    <addressDetailsContext.Provider value={[addressDetails, setAddressDetails]}>
      {props.children}
    </addressDetailsContext.Provider>
  );
};

export default AddressDetailsProvider;
