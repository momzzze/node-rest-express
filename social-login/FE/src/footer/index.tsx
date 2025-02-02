import style from "./style.module.scss";
const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>
        © {new Date().getFullYear()} Nikola Ninov |
        <a
          href={import.meta.env.VITE_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={style.githubLink}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
