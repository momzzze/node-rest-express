import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.scss";
import { RootState, AppDispatch } from "../store";
import { logout } from "../store/auth/authSlice";
const Header = ({
  onAuthClick,
}: {
  onAuthClick: (isLogin: string) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <div className={style.search}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
          />
          <button>Search</button>
        </div>
        <div className={style.nav}>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <span>Welcome, {user?.username}</span>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => onAuthClick("login")}>Login</button>
                </li>
                <li>
                  <button onClick={() => onAuthClick("register")}>
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
