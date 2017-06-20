import './app.scss';

function log(x, y = 'World') {
	console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello


const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';

console.log(b)