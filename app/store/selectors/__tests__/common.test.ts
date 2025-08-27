import {Store} from 'redux';
import {categoriesByTypesSelector} from '../common';
import {CATEGORIES} from '../../../../storybook/constants';
import {initTestsStore} from '../../store';
import {credentialCategoriesSuccess} from '../../actions';

describe('Common selectors', () => {
    describe('CategoriesByTypesSelector', () => {
        let store: Store<any>;

        beforeAll(() => {
            store = initTestsStore();
            store.dispatch(credentialCategoriesSuccess(CATEGORIES));
        });

        it('returns categories according to requested types', () => {
            const types = [
                'PassportV1.0',
                'EmailV1.0',
                'EducationDegreeStudyV1.0'
            ];
            const result = categoriesByTypesSelector(
                store.getState() as any,
                types
            );
            expect(result).toHaveLength(2);
            expect(result).toEqual([CATEGORIES[0], CATEGORIES[1]]);
        });

        it('should not compute again with the same state', async () => {
            const types = [
                'PassportV1.0',
                'EmailV1.0',
                'EducationDegreeStudyV1.0'
            ];
            categoriesByTypesSelector.resetRecomputations();
            categoriesByTypesSelector(store.getState() as any, types);
            expect(categoriesByTypesSelector.recomputations()).toEqual(1);
            categoriesByTypesSelector(store.getState() as any, types);
            categoriesByTypesSelector(store.getState() as any, types);
            expect(categoriesByTypesSelector.recomputations()).toEqual(1);
        });

        it('should recompute again with a new state', async () => {
            const types = [
                'PassportV1.0',
                'EmailV1.0',
                'EducationDegreeStudyV1.0'
            ];
            categoriesByTypesSelector.resetRecomputations();
            const result1 = categoriesByTypesSelector(
                store.getState() as any,
                types
            );
            expect(result1).toEqual([CATEGORIES[0], CATEGORIES[1]]);
            expect(categoriesByTypesSelector.recomputations()).toEqual(1);
            const result2 = categoriesByTypesSelector(store.getState() as any, [
                ...types,
                'EmploymentPastV1.0'
            ]);
            expect(result2).toEqual([
                CATEGORIES[0],
                CATEGORIES[1],
                CATEGORIES[2]
            ]);
            expect(categoriesByTypesSelector.recomputations()).toEqual(2);
        });
    });
});
