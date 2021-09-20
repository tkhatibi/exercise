export const Button: React.FunctionComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, disabled, ...rest }) => {
  const classNames = (className || '').split(' ');
  if (disabled) {
    classNames.push('opacity-50', 'cursor-not-allowed');
  }
  return (
    <button className={classNames.join(' ')} disabled={disabled} {...rest} />
  );
};
