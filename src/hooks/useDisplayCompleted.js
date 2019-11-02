import {useContext} from 'react';

import {DisplayCompletedContext} from '../context/displayCompletedContext';

export default function useDisplayCompleted() {
 return useContext(DisplayCompletedContext);
}