const requireAll = context => context.keys().map(context);

const component = require.context('./components', true, /\.vue$/);


requireAll(component).forEach(({default:item}) => {
	console.log(item)
	Vue.component(`wb-${item.name}`, item);
});