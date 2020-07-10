export interface EvidNavigationItem
{
    id?: string;
    title?: string;
    subtitle?: string;
    type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
    hidden?: (item: EvidNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    link?: string;
    externalLink?: boolean;
    exactMatch?: boolean;
    function?: (item: EvidNavigationItem) => void;
    classes?: string;
    icon?: string;
    iconClasses?: string;
    badge?: {
        title?: string;
        style?: 'rectangle' | 'rounded' | 'simple',
        background?: string;
        color?: string;
    };
    children?: EvidNavigationItem[];
    meta?: any;
}

export type EvidVerticalNavigationAppearance = string;
export type EvidVerticalNavigationMode = 'over' | 'side';
export type EvidVerticalNavigationPosition = 'left' | 'right';
