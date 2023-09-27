export const FILTER_CARD = 'FILTER_CARD';
export const DATA_CARD = 'DATA_CARD';
export const DATA_ROLE = 'DATA_ROLE';
export const DATA_VIDEO = 'DATA_VIDEO';
export const DATA_TV = 'DATA_TV';
export const DATA_PERSON = 'DATA_PERSON';
export const DATA_PERSON_PAGE = 'DATA_PERSON_PAGE';
export const SORT_CARD = 'SORT_CARD';
export const SORT_FILMS = 'SORT_FILMS';
export const DATA_CARD_VOTES = 'DATA_CARD_VOTES';
export const DATA_REVENUE = 'DATA_REVENUE';
export const DATA_PRIMARY = 'DATA_PRIMARY';
export const DATA_LOAD = 'DATA_LOAD';
export const DATA_LOAD_TV = 'DATA_LOAD_TV';
export const DATA_ID = 'DATA_ID';
export const DATA_MOVIE = 'DATA_MOVIE';
export const DATA_MOVIE_TV = 'DATA_MOVIE_TV';
export const DATA_ROLE_TV = 'DATA_ROLE_TV';
export const DATA_VIDEO_TV = 'DATA_VIDEO_TV';

export const setDataCart = (data, dataSection, todos1, todosVotes) => ({
    type: DATA_CARD, SORT_CARD, DATA_CARD_VOTES,
    data,
    dataSection,
    todos1,
    todosVotes,
});

