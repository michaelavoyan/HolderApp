import {items} from '../guide-items';

describe('Validate "What is new" guide item', () => {
    it('Guide items should have unique Ids', () => {
        const uniqueGuideItems = new Set();

        items.forEach(({id}) => {
            uniqueGuideItems.add(id);
        });

        expect(items).toHaveLength(uniqueGuideItems.size);
    });
});
