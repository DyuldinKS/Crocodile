import { h, render } from 'preact';
// import '../common/libs/extendedHashmap';
import Crocodile from './components/Crocodile';
import './styles/index.less';
import 'preact/devtools';

render(
	<Crocodile />,
	document.getElementById('root') as HTMLElement
);
