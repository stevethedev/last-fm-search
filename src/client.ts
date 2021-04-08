// import {search} from "./api/search";
import {App} from './components/App';
import ReactDOM from 'react-dom';

(async function main() {
    // const results = await search({ artist: 'cher' });
    ReactDOM.render(App(), document.getElementById('app'));
})();
