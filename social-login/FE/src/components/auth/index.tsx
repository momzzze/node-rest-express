import styles from "./style.module.scss";

const AuthModal = ({ type, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Контейнер за хиксчето вътре в модала */}
        <div className={styles.closeContainer}>
          <button className={styles.close} onClick={onClose}>
            ✖
          </button>
        </div>

        <h2>{type === "login" ? "Login" : "Register"}</h2>

        {/* Facebook Login Button */}
        <button className={styles.fbButton}>
          {type === "login" ? "Login with Facebook" : "Sign up with Facebook"}
        </button>

        <p className={styles.divider}>or</p>

        {/* Форма за Login */}
        {type === "login" ? (
          <form>
            <input type="text" placeholder="Email or Username" required />
            <input type="password" placeholder="Password" required />
            <button className={styles.primaryButton}>Login</button>
          </form>
        ) : (
          /* Форма за Register */
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className={styles.primaryButton}>Register</button>
          </form>
        )}

        {/* Toggle между Login и Register */}
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
