import {Alert} from 'react-native';

import {AfterResponseHook, BeforeRequestHook} from 'ky';

export const authBeforeResponseHooks: BeforeRequestHook = async ({headers}) => {
  const token = 'token' as any;
  headers.set('Authorization', 'Bearer ' + token);
};

export const authAfterResponseHooks: AfterResponseHook = async (req, option, res) => {
  const statusCode = [401].includes(res.status);
  if (statusCode) {
    Alert.alert('Session Expired');
    //handel expire
  } else if (!res.ok && !statusCode) {
    const err: any = await res.json();

    let error = '';
    if (err?.description) {
      error = err?.description;
    }

    Alert.alert(res.status.toString(), error);
  }
};
