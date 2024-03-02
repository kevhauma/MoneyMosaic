import { useRecoilState } from 'recoil';
import { favouritesAtom } from './FavouritesAtom';

type VoidWithOneStringParam = (p: string) => void;
type UseFavouritesHookReturnType = [
  string[],
  VoidWithOneStringParam,
  VoidWithOneStringParam
];

export const useFavourites = (): UseFavouritesHookReturnType => {
  const [favourites, setFavourites] = useRecoilState(favouritesAtom);

  const addFavourite = (keyToAdd: string) => {
    setFavourites((prevFavourites) =>
      Array.from(new Set([...(prevFavourites || []), keyToAdd]))
    );
  };
  const removeFavourite = (keyToRemove: string) => {
    setFavourites((prevFavourites) =>
      (prevFavourites || []).filter((fav) => fav !== keyToRemove)
    );
  };

  return [favourites, addFavourite, removeFavourite];
};
