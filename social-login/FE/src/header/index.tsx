import style from "./style.module.scss";
const Header = () => {
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
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
