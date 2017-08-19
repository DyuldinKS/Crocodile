interface Map<K, V> {
	map(f: Function): Map<K, V>; 
}

Map.prototype.map = (f: Function) => {
	const self: Map<K, V> = (Map)this;
	let newMap = new Map(self:);
	for (var [key, value] of self) {
		newMap.set(key, f(key, value));
		console.log(key + ' = ' + value);
	}
	return newMap;
}

