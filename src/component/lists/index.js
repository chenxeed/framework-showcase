import {clearList, addList, updateSearchTitle} from './view';

// side effect functions
function updateList(list) {
	clearList();
	addList(list);
};

// export
export {
	updateList
}