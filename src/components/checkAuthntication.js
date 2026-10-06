import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckAuthentication({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.warning("Please login to access this page", { theme: "dark" });
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
