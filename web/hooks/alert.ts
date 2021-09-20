import { useState } from 'react';

export class Alert {
  constructor(
    public type: 'warning' | 'success' | 'info' | 'danger',
    public message: string,
    public title?: string,
  ) {}
}

export function useAlert() {
  const [alert, _setAlert] = useState<Alert>();

  const setAlert = (alert: Alert | Error | unknown) => {
    if (alert instanceof Alert) {
      _setAlert(alert);
    } else if (alert instanceof Error) {
      _setAlert(new Alert('danger', alert.message));
    } else if (typeof alert === 'string') {
      _setAlert(new Alert('danger', alert));
    } else if (typeof alert === 'object' && alert && 'message' in alert) {
      // @ts-ignore
      _setAlert(new Alert('danger', alert.message));
    } else {
      _setAlert(new Alert('danger', 'Unknown Error'));
    }
  };

  return { alert, setAlert };
}
