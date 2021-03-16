import React from "react";
import { useHistory } from "react-router";
import Button from "../../../components/Button";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";
import { routes } from "../../../constants/routes";

type ComponentAlertProps = {
    className?: string,
    // onShowHide?: () => void,
}

const ComponentAlert: React.FC<ComponentAlertProps & WithMeiosisProps> = ({globalActions, globalStates, className}) => {
    const history = useHistory();

    const openModalHandler = (type: string) => {
        let modalObj = {};
        switch(type) {
            case 'basic': 
                modalObj = {
                    title: 'Basic Modal',
                    content: 'This is a modal with single button',
                    positiveButtonText: 'OK',
                    positiveButtonAction: () => console.log('OK'),
                    isShown: true,
                    allowOverlayClose: true,
                }
            break;
            case 'basic-dual-button': 
                modalObj = {
                    title: 'Basic Modal with dual buttons',
                    content: 'This is a modal with with positive and negative buttons',
                    positiveButtonText: 'OK',
                    negativeButtonText: 'Cancel',
                    positiveButtonAction: () => console.log('OK'),
                    negativeButtonAction: () => console.log('Cancel'),
                    isShown: true,
                    showNegativeButton: true,
                    allowOverlayClose: true,
                }
            break;
            case 'long-content': 
                modalObj = {
                    title: 'Modal with long HTML content',
                    content: `
                    <span style="text-align: left">
                        <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>
                        <br />
                        Donec aliquet condimentum odio in varius. Nunc tristique leo ac eros interdum venenatis. Sed non leo non nulla condimentum mattis.
                        <br /><br />
                        
                        <b>Duis commodo, arcu eu vulputate ullamcorper</b>
                        <br />
                        Purus neque congue turpis, eget placerat lectus eros in nibh. Morbi quis pulvinar lacus. Aenean accumsan est libero, id feugiat quam mattis id. Suspendisse et molestie ex. Ut a orci elit.
                        <br /><br />
                        
                        <b>Morbi vel mauris at quam euismod egestas</b>
                        <br />
                        Curabitur eget neque imperdiet sem viverra eleifend. Aenean dignissim nec orci fringilla suscipit. Aliquam mattis massa dapibus turpis vulputate, quis ornare nisi euismod. 
                        <br /><br />

                        <b>Nam sagittis tellus feugiat vehicula congue</b>
                        <br />
                        Ut tincidunt lorem in imperdiet sollicitudin. Integer commodo nulla nibh, in sollicitudin justo tincidunt quis.
                        <br /><br />

                        <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>
                        <br />
                        Donec aliquet condimentum odio in varius. Nunc tristique leo ac eros interdum venenatis. Sed non leo non nulla condimentum mattis.
                        <br /><br />
                        
                        <b>Duis commodo, arcu eu vulputate ullamcorper</b>
                        <br />
                        Purus neque congue turpis, eget placerat lectus eros in nibh. Morbi quis pulvinar lacus. Aenean accumsan est libero, id feugiat quam mattis id. Suspendisse et molestie ex. Ut a orci elit.
                        <br /><br />
                        
                        <b>Morbi vel mauris at quam euismod egestas</b>
                        <br />
                        Curabitur eget neque imperdiet sem viverra eleifend. Aenean dignissim nec orci fringilla suscipit. Aliquam mattis massa dapibus turpis vulputate, quis ornare nisi euismod. 
                        <br /><br />

                        <b>Nam sagittis tellus feugiat vehicula congue</b>
                        <br />
                        Ut tincidunt lorem in imperdiet sollicitudin. Integer commodo nulla nibh, in sollicitudin justo tincidunt quis.
                    </span>
                    `,
                    positiveButtonText: 'OK',
                    negativeButtonText: 'Cancel',
                    positiveButtonAction: () => console.log('OK'),
                    negativeButtonAction: () => console.log('Cancel'),
                    isShown: true,
                    showNegativeButton: true,
                    allowOverlayClose: true,
                }
            break;
            case 'wide': 
                modalObj = {
                    title: 'Large modal with dual buttons',
                    content: `
                        <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>
                        <br />
                        Donec aliquet condimentum odio in varius. Nunc tristique leo ac eros interdum venenatis. Sed non leo non nulla condimentum mattis.
                        <br /><br />
                        
                        <b>Duis commodo, arcu eu vulputate ullamcorper</b>
                        <br />
                        Purus neque congue turpis, eget placerat lectus eros in nibh. Morbi quis pulvinar lacus. Aenean accumsan est libero, id feugiat quam mattis id. Suspendisse et molestie ex. Ut a orci elit.
                    </span>
                    `,
                    positiveButtonText: 'OK',
                    negativeButtonText: 'Cancel',
                    positiveButtonAction: () => console.log('OK'),
                    negativeButtonAction: () => console.log('Cancel'),
                    size: 'wide',
                    isShown: true,
                    showNegativeButton: true,
                    allowOverlayClose: true,
                }
            break;
            default:
        }
        globalActions.openModal(modalObj);
    }

    const showSnackBarHandler = (type: string) => {
        let snackBarObj = {};
        switch(type) {
            case 'basic': 
                snackBarObj = {
                    isShown: true,
                    message: 'This is a basic snack bar with close button',
                    hasAction: false
                }
            break;
            case 'with-action': 
                snackBarObj = {
                    isShown: true,
                    message: 'This is a snack bar with extra call to action button',
                    hasAction: true,
                    actionButtonLabel: 'Accordion page',
                    actionClickHandler: () => {
                        history.push(routes.COMPONENT_ACCORDION);
                    }
                }
            break;
            default:
        }
        globalActions.appendSnackBarToList(snackBarObj);
    }
    
    return <div className="component-alert">
        <h1>Alerts</h1>
        
        <h2>Modal Prompts</h2>
        
        <div className="columnised">
            <div className="col-50">
                <h4>Basic Modal</h4>
                <p>This modal also support enable / disable outer overlay click to close the prompt.</p>
                <Button onClick={() => openModalHandler('basic')}>Open modal</Button>
                <br />
                <br />
                <br />

                <h4>Modal with positive / negative button</h4>
                <Button onClick={() => openModalHandler('basic-dual-button')}>Open modal</Button>
                <br />
                <br />
                <br />
            </div>
            <div className="col-50">
                <h4>Modal with long HTML content</h4>
                <Button onClick={() => openModalHandler('long-content')}>Open modal</Button>
                <br />
                <br />
                <br />

                <h4>Large modal</h4>
                <Button onClick={() => openModalHandler('wide')}>Open modal</Button>
                <br />
                <br />
            </div>
        </div>
                
        <h2>Snack Bar Prompts</h2>
        
        <div className="columnised">
            <div className="col-50">
                <h4>Basic Snack Bar</h4>
                <Button onClick={() => showSnackBarHandler('basic')}>Show Snack Bar</Button>
                <br />
                <br />
                <br />
            </div>
            <div className="col-50">
                <h4>Snack Bar with Call to Action button</h4>
                <Button onClick={() => showSnackBarHandler('with-action')}>Show Snack Bar</Button>
                <br />
                <br />
                <br />
            </div>
        </div>
    </div>;
}

export default withMeiosis(ComponentAlert);
