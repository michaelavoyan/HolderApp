import {Vendor} from '../../store/types/claim';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

type Item = Vendor & {first?: string};

export const groupVendorsList = (vendors: Item[], value?: string) => [
    ...vendors
        .filter(({name}) => {
            if (value) {
                return new RegExp(value, 'i').test(name);
            }

            return true;
        })
        .sort(({name: name1}, {name: name2}) => {
            if (alphabet.indexOf(name2[0].toUpperCase()) === -1) {
                return -1;
            }

            if (alphabet.indexOf(name1[0].toUpperCase()) === -1) {
                return 1;
            }

            if (name1.toUpperCase() < name2.toUpperCase()) {
                return -1;
            }
            if (name1.toUpperCase() > name2.toUpperCase()) {
                return 1;
            }
            return 0;
        })
        .reduce((groups: Map<string, {title: string; data: Item[]}>, item) => {
            let groupName = item.name.charAt(0).toUpperCase();

            if (alphabet.indexOf(groupName) === -1) {
                groupName = '#';
            }

            if (!groups.get(groupName)) {
                groups.set(groupName, {title: groupName, data: []});

                groups.get(groupName)?.data.push({...item, first: groupName});
            } else {
                groups.get(groupName)?.data.push(item);
            }

            return groups;
        }, new Map())
        .values()
];
