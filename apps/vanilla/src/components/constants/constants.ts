//const BASE_URL = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?offset=';
const BASE_URL = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/';
const SORT_BY_ID_URL = `${BASE_URL}?ordering=id`;
const SORT_BY_TITLE_ENG_URL = `${BASE_URL}?ordering=title_eng`;
const SORT_BY_AIRED_START_URL = `${BASE_URL}?ordering=aired__startswith`;
const SORT_BY_STATUS_URL = `${BASE_URL}?ordering=status`;

export { SORT_BY_ID_URL, SORT_BY_STATUS_URL, SORT_BY_TITLE_ENG_URL, SORT_BY_AIRED_START_URL, BASE_URL };
