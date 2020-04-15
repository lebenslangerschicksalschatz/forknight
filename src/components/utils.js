export const isLoggedIn = () => {
	if (localStorage.getItem('token') === null){
		return false;
	} else {
		return true;
	}
};

export const getUsername = () => (
	localStorage.getItem('username')
);