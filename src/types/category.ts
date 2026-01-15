export type Category = {
    slug: string;
    name: string;
}

export type CategoryMetadata = {
    id: string;
    name: string;
    values: CategoryMetadataValue[];
}

export type CategoryMetadataValue = {
    id: string;
    label: string;
}