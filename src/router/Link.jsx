import { useRouter } from "./Router";

const Link = ({ to, className, children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default Link;
