import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
	const pipe: FilterPipe = new FilterPipe();
	const nullitems = null;
	const emptyitems = [];
	const manyitems = [{id: 1, poster_path: '/a.jpg', vote_count: 2}, {id: 2, poster_path: '/b.jpg', vote_count: 5}];

	it('should create an instance', () => {
	expect(pipe).toBeTruthy();
	});
	it('returns no list if there is nothing to filter', () => {
	expect(pipe.transform(nullitems, '1', 'vote_count')).toEqual([]);
	});
	it('returns no list if no value provided', () => {
	expect(pipe.transform(emptyitems, '1', 'vote_count')).toEqual([]);
	});
	it('returns unchanged list if filter ineffective', () => {
	expect(pipe.transform(manyitems, '1', 'vote_count')).toEqual(manyitems);
	});
	it('returns unchanged list if filter provided', () => {
	expect(pipe.transform(manyitems, '', 'vote_count')).toEqual(manyitems);
	});
	it('returns filtered value if filtered', () => {
	expect(pipe.transform(manyitems, '3', 'vote_count')).toEqual([{id: 2, poster_path: '/b.jpg', vote_count: 5}]);
	});

});
