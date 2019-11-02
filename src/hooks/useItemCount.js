import {useContext} from 'react';

import {ItemCountContext} from '../context/itemContext';

export default function useItemCount() {
 return useContext(ItemCountContext);
}