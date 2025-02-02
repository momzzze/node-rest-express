import style from "./style.module.scss";
const Header = ({
  onAuthClick,
}: {
  onAuthClick: (isLogin: string) => void;
}) => {
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
            <li>
              <button onClick={() => onAuthClick("login")}>Login</button>
            </li>
            <li>
              <button onClick={() => onAuthClick("register")}>Register</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
