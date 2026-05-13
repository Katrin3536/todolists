type ButtonProps = {
    title: string;
}

export const Button = ({title}:ButtonProps) => {
  return (
      <div>
          <button>{title}</button>
      </div>
  )
}