/** Dependencies */
import { useSelector, TypedUseSelectorHook } from 'react-redux';

/** Redux */
import { RootState } from '../store/root-reducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
