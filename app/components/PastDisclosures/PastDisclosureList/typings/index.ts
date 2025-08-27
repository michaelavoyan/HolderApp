import {AcceptedDisclosureRequestObject} from 'app/store/types/disclosure';

export type DisclosureListProps = {
    disclosures: AcceptedDisclosureRequestObject[];
    onDisclosurePress(id: string): void;
};
