type Props = {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export const Button = ({title,onClick,disabled,className}:Props) => {
  return <button className={className} onClick={onClick} disabled={disabled}>{title}</button>
}