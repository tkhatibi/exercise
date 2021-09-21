import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createAgent } from '../helpers/agent';
import {
  createGlobalState,
  createPersistedState,
} from '../helpers/hook-helpers';
import {
  Credentials,
  Token,
  UserUserDetail,
  UserUserEdit,
  UserUserOverall,
  UserUserRegister,
} from '../openapi';
import { Alert, useAlert } from '.';

const { Provider: AuthProvider, usePersistedState } =
  createPersistedState<Token>('auth', {});

export function useAuth() {
  const { push } = useRouter();

  const [state, setState] = usePersistedState();

  const setToken = (token?: Token) => {
    setState(token || {});
    push(token ? '/' : '/login');
  };

  return {
    state: {
      ...state,
      loggedIn: state.token !== undefined,
    },
    agent: createAgent(state.token),
    setToken,
    unsetToken: () => setToken(),
  };
}

export { AuthProvider };

export function useRegister() {
  const { agent } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserUserRegister>();

  const { alert, setAlert } = useAlert();

  const onSubmit: SubmitHandler<UserUserRegister> = async ({
    name,
    username,
    password,
  }) => {
    try {
      const res = await agent.user.postUserCollection({
        name,
        username,
        password,
      });
      if (res.status < 300) {
        setAlert(
          new Alert('success', 'Your account has been created successfully.'),
        );
      } else if (res.status >= 400) {
        setAlert(res.data);
      }
    } catch (error) {
      setAlert(error);
    }
  };

  return {
    alert,
    errors,
    register,
    submit: handleSubmit(onSubmit),
    submitting: isSubmitting,
  };
}

export function useLogin() {
  const { agent, setToken } = useAuth();

  const { fetchProfile } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Credentials>();

  const { alert, setAlert } = useAlert();

  const onSubmit: SubmitHandler<Credentials> = async ({
    username,
    password,
  }) => {
    try {
      const res = await agent.auth.login({
        username,
        password,
      });
      if (res.status < 300) {
        setToken(res.data);
        fetchProfile();
      } else if (res.status >= 400) {
        setAlert(res.data);
      }
    } catch (error) {
      setAlert(error);
    }
  };

  return {
    alert,
    errors,
    register,
    submit: handleSubmit(onSubmit),
    submitting: isSubmitting,
  };
}

export function useLogout() {
  const { unsetToken } = useAuth();

  const { unsetProfile } = useProfile();

  const logout = () => {
    unsetProfile();
    unsetToken();
  };

  return {
    logout,
  };
}

export function useDeleteAccount() {
  const {
    state: { id },
    agent,
    unsetToken,
  } = useAuth();

  const { unsetProfile } = useProfile();

  const { setAlert } = useAlert();

  const [deleting, setDeleting] = useState(false);

  const deleteAccount = async () => {
    setDeleting(true);
    try {
      const res = await agent.user.deleteUserItem(`${id}`);
      if (res.status < 300) {
        unsetProfile();
        unsetToken();
      } else if (res.status >= 400) {
        setAlert(res.data);
      }
    } catch (error) {
    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    deleteAccount,
  };
}

export interface ProfileState {
  refreshing: boolean;
  profile?: UserUserDetail;
  alert?: Alert;
}

const { Provider: ProfileProvider, useGlobalState } =
  createGlobalState<ProfileState>({ refreshing: false });

export function useProfile() {
  const {
    state: { id },
    agent,
  } = useAuth();

  const [state, setState] = useGlobalState();

  const setProfile = (profile?: UserUserDetail) => {
    setState({
      refreshing: false,
      profile,
      alert: undefined,
    });
  };

  const fetchProfile = async () => {
    if (id === undefined) return;
    setState({
      ...state,
      refreshing: true,
    });
    try {
      const res = await agent.user.getUserItem(`${id}`);
      if (res.status < 300) {
        setProfile(res.data);
      } else if (res.status >= 400) {
        setState({
          refreshing: false,
          // @ts-ignore
          alert: new Alert('danger', res.data?.message || 'Unknown Error'),
        });
      }
    } catch (error) {
      setState({
        refreshing: false,
        alert: new Alert(
          'danger',
          error instanceof Error ? error.message : 'Unknown error',
        ),
      });
    }
  };

  return {
    state,
    fetchProfile,
    setProfile,
    unsetProfile: () => setProfile(),
  };
}

export { ProfileProvider };

export function useSettings() {
  const {
    state: { id },
    agent,
  } = useAuth();

  const {
    setProfile,
    state: { profile },
  } = useProfile();

  const { alert, setAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserUserEdit>();

  const onSubmit: SubmitHandler<UserUserEdit> = async ({ name, password }) => {
    try {
      const res = await agent.user.patchUserItem(`${id}`, {
        name,
        password,
      });
      if (res.status < 300) {
        setProfile(res.data);
      } else if (res.status >= 400) {
        setAlert(res.data);
      }
    } catch (error) {
      setAlert(error);
    }
  };

  return {
    alert,
    errors,
    register,
    profile,
    submitting: isSubmitting,
    submit: handleSubmit(onSubmit),
  };
}

export function useUsers() {
  const { agent } = useAuth();

  const [users, setUsers] = useState<UserUserOverall[]>();

  const { setAlert } = useAlert();

  const [fetching, setFetching] = useState(false);

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const res = await agent.user.getUserCollection();
      if (res.status < 300) {
        setUsers(res.data);
      } else if (res.status >= 400) {
        setAlert(res.data);
      }
    } catch (error) {
      setAlert(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetched: users !== undefined,
    fetching,
    fetchUsers,
  };
}
