import { Alert as AlertType } from '../hooks';

export interface AlertProps {
  value: AlertType;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  value: { type, ...rest },
}) => {
  return type === 'danger' ? (
    <Danger {...rest} />
  ) : type === 'info' ? (
    <Info {...rest} />
  ) : type === 'success' ? (
    <Success {...rest} />
  ) : type === 'warning' ? (
    <Warning {...rest} />
  ) : null;
};

export const Danger: React.FunctionComponent<{
  title?: String;
  message: string;
}> = ({ title, message }) => {
  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {title || 'Danger'}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{message}</p>
      </div>
    </div>
  );
};

export const Warning: React.FunctionComponent<{
  title?: String;
  message: string;
}> = ({ title, message }) => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">{title || 'Warning!'}</p>
      <p>{message}</p>
    </div>
  );
};

export const Success: React.FunctionComponent<{
  title?: String;
  message: string;
}> = ({ title, message }) => {
  return (
    <div
      className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          {title && <p className="font-bold">{title}</p>}
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export const Info: React.FunctionComponent<{
  title?: String;
  message: string;
}> = ({ title, message }) => {
  return (
    <div
      className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
      </svg>
      {title && <p className="font-bold">{title}</p>}
      <p>{message}</p>
    </div>
  );
};
