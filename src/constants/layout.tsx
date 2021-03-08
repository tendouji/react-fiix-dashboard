import { GeneralObjType } from "../models";

const gaps: GeneralObjType = {
    XSmall: '0.3125rem', // 5px
    Small: '0.625rem', // 10px
    Common: '1rem', // 16px
    Large: '2rem', // 32px
};

const fontSizes: GeneralObjType = {
    XSmall: '0.625rem', // 10px
    Small: '0.75rem', // 12px
    Common: '0.875rem', // 14px
    Large: '1rem', // 16px
    XLarge: '1.25rem', // 20px
};

const colorRange: GeneralObjType = {
    L1: '0.05',
    L2: '0.1',
    L3: '0.2',
    L4: '0.5',
    L5: '0.7',
}

const elementSizes: {[key: string]: any}  = {
    MediaScreenSmallWidth: '400px',
    MediaScreenMediumWidth: '800px',
    MediaScreenLargeWidth: '1000px',

    HeaderHeight: '3rem',
    FooterHeight: '2rem',
    MenuWidth: '15rem',
    MenuCloseWidth: '3rem',
    SubMenuExpandedMaxHeight: '300px',
    
    SiteTitleHeight: '3rem',
    ProfileWidgetHeight: '5rem',
    
    ButtonHeight: '2rem',
    ModalMaxWidth: '25rem',
    ModalLargeMaxWidth: '45rem',
    ModalTitleHeight: '2.5rem',
    AccordionMaxWidth: '25rem',
    AccordionTitleHeight: '2.5rem',
    NotificationPanelWidth: '15rem',
    
    BorderRadius: '4px',
    Border1Pixel: (color: string): string => `1px solid ${color}`,

    InputAreaHeight: '3rem',
    PlayerCountInputWidth: '9rem',
    PlayerCountButtonWidth: '5rem',
    PlayerNameWidth: '6.5rem',
    CardHeight: '3rem',
    CardWidth: '2rem',
    ToggleHeight: '2rem',
    ToggleWidth: '7.5rem',
    ToggleBorderWidth: '3px',

};

const animations: GeneralObjType = {
    Transition: '200ms',
};

const styleGroup: GeneralObjType = {
    TextOverflow: `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `,
};


export {
    gaps,
    fontSizes,
    colorRange,
    elementSizes,
    animations,
    styleGroup,
}