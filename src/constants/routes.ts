import { GeneralObjType } from "../models";

const assets: GeneralObjType = {
    ROOT: process.env.PUBLIC_URL,

    get IMAGE() { return this.ROOT + '/images' },
}

const routes: GeneralObjType = {
    HOME: '/',
    
    get SIGNIN() { return this.HOME + 'signin' },
    get DASHBOARD() { return this.HOME + 'dashboard' },
    get ABOUT_US() { return this.HOME + 'about-us' },
    get FAQ() { return this.HOME + 'faq' },
    
    get COMPONENTS() { return this.HOME + 'components/' },
    get COMPONENT_TABLE() { return this.COMPONENTS + 'table' },
    get COMPONENT_FORM_ELEMENT() { return this.COMPONENTS + 'form-element' },
    get COMPONENT_ACCORDION() { return this.COMPONENTS + 'accordion' },
    get COMPONENT_ALERT() { return this.COMPONENTS + 'alerts' },
    get COMPONENT_MISCELLANEOUS() { return this.COMPONENTS + 'miscellaneous' },
    
    // get ADD_CONTACT() { return this.HOME + 'add-contact' },
    // get CONTACT_DETAILS() { return this.HOME + 'contact-details' },
    // get BRAND_DETAILS() { return this.HOME + 'brand-details' },
    // get GIFT_DETAILS() { return this.HOME + 'gift-details' },
    // get SHARE_GIFT() { return this.HOME + 'share-gift' },
    // get PROFILE() { return this.HOME + 'profile' },
    // get THANK_YOU() { return this.HOME + 'thank-you' },
};

export {
    routes,
    assets,
}