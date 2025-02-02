import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/auth/action";
import { RootState, AppDispatch } from "../../store";
import styles from "./style.module.scss";

const AuthModal = ({
  type,
  onClose,
}: {
  type: "login" | "register";
  onClose: (type?: "login" | "register") => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      dispatch(
        loginUser({ identifier: formData.email, password: formData.password })
      );
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.closeContainer}>
          <button className={styles.close} onClick={() => onClose()}>
            ✖
          </button>
        </div>

        <h2>{type === "login" ? "Login" : "Register"}</h2>

        <button className={styles.fbButton}>
          {type === "login" ? "Login with Facebook" : "Sign up with Facebook"}
        </button>

        <p className={styles.divider}>or</p>

        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {type === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : type === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className={styles.switch}>
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => onClose(type === "login" ? "register" : "login")}
          >
            {type === "login" ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
