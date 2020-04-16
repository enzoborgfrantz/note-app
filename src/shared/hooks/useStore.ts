import { useState, useEffect } from "react";
import { useGoogleApi } from "./useGoogleApi";
import { useGoogleDrive } from "./useGoogleDrive";
import { useGoogleAuth } from "./useGoogleAuth";

const getUniqueId = () => Date.now().toString();

interface Store {
  [key: string]: Object;
}

export type AddItem = (
  item: Object
) => { id: string; persisted: Promise<boolean> };

export type RemoveItem = (id: string) => { persisted: Promise<boolean> };

export type UpdateItem = (
  item: Object,
  id: string
) => { persisted: Promise<boolean> };

export const useStore = () => {
  const [state, setState] = useState<Store>({});

  const { isGoogleApiReady } = useGoogleApi();
  const { isUserAuthenticated } = useGoogleAuth();
  // const { isFetchingFiles: isLoading, fetchFiles } = useGoogleDrive();

  useEffect(() => {
    if (!isGoogleApiReady || !isUserAuthenticated) {
      return;
    }

    // fetchContent functionality
    // fetchContent().then((savedFiles) => {
    //   setState({ ...savedFiles, state });
    // });

    // @TODO load items from google drive on mount
  }, [isGoogleApiReady, isUserAuthenticated]);

  const persistState = async (nextState: Store) => {
    // @TODO use debounce

    // on success @TODO remove
    return true;
  };

  const add: AddItem = (item) => {
    const id = getUniqueId();
    const nextState = { ...state, [id]: item };
    setState(nextState);
    const persisted = persistState(nextState);
    return { id, persisted };
  };

  const remove: RemoveItem = (id: string) => {
    const { [id]: itemToRemove, ...nextState } = state;
    setState(nextState);
    const persisted = persistState(nextState);
    return { persisted };
  };

  const update: UpdateItem = (item: Object, id: string) => {
    const nextState = { ...state, [id]: item };
    setState(nextState);
    const persisted = persistState(nextState);
    return { persisted };
  };

  return {
    add,
    remove,
    update,
    items: state,
    // isLoading,
  };
};
