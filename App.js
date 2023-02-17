import React from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
// import Checkout from "./screens/checkout";
import Base from "./screens/base";
// import Login from "./screens/login";
// import Index from "./screens/index";
// import ListView from "./screens/listView";
import SignUp from "./screens/signUp";
// import AccountRecovery from "./screens/accountRecovery";
// import DbTest from "./screens/dbTest";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <Base>
        {/* <Login /> */}
        {/* <Index /> */}
        {/* <ListView /> */}
        <SignUp />
        {/* <Checkout /> */}
        {/* <AccountRecovery/> */}
        {/* <DbTest /> */}
      </Base>
    </TailwindProvider>
  );
}
