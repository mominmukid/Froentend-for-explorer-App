import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuthentication({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    // If no user in localStorage → redirect
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
