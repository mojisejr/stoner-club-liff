import React from "react";
import { useLine } from "~/context/lineContext";

const Login = () => {
  const { loggedIn, login } = useLine();
  return (
    <>
      {!loggedIn ? (
        <button onClick={() => login()} className="btn btn-primary">
          Connect with $toner Club
        </button>
      ) : (
        <div>Connecting ..</div>
      )}
    </>
  );
};

export default Login;
