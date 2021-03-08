import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { lighten, rgba } from "polished";
import { 
    animations,
    colorRange,
    elementSizes, 
    fontSizes, 
    gaps, 
    styleGroup 
} from "../../constants/layout";
import withMeiosis, { WithMeiosisProps } from "../HOC";
import Button from "../Button";
import { StyledColorProps } from "../../models";
import { GlobalInitialState } from "../../services/states";


type ModalProps = {
    className?: string,
}

const Modal: React.FC<WithMeiosisProps & ModalProps> = ({globalActions, globalStates, className}) => {
    const modalData = globalStates?.modalData;
    const showModal = modalData?.isShown;
    // const modalRef: React.RefObject<HTMLDivElement> = React.createRef();
    const modalRef = useRef<HTMLDivElement>(null);

    const onCloseHandler = () => {
        globalActions.closeModal();
    };

    const onNegativeClickHandler = () => {
        globalActions.closeModal();
        const action = modalData?.negativeButtonAction;
        if(!!action && typeof action === 'function') {
            action();
        }
    };

    const onPositiveClickHandler = () => {
        globalActions.closeModal();
        const action = modalData?.positiveButtonAction;
        if(!!action && typeof action === 'function') {
            action();
        }
    };

    useEffect(() => {
        if(!!modalRef.current) {
            const _ref = modalRef.current;
            if(!!showModal) {
                _ref.style.display = 'flex';
                setTimeout(() => { _ref.classList.add('show') }, 0 );
            } else {
                _ref.classList.remove('show');
                setTimeout(() => { _ref.style.display = 'none' }, 200 );
            }
        }
    }, [showModal, modalRef]);

    return ( !!modalData ? (
        <ModalWrapper 
            className={[
                "modal-prompt",
                (modalData.size ? ` ${modalData.size}` : ''),
            ].join('')}
            ref={modalRef}
            themeColor={globalStates!.themeColor}
        >
            <div className="overlay" 
                onClick={!!modalData.allowOverlayClose ? onCloseHandler : undefined}
            />
            <div className="modal-popup">
                <div className="modal-header">
                    <div className="title">
                        <span>{modalData.title}</span>
                    </div>
                    <button className="close" onClick={onCloseHandler}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="modal-content">
                    <span dangerouslySetInnerHTML={{ __html: modalData.content }} />
                </div>
                <div className="modal-footer">
                    { !!modalData.showNegativeButton 
                        ? <Button 
                            className="ghost"
                            onClick={onNegativeClickHandler}
                        >{ modalData.negativeButtonText || GlobalInitialState.modalData!.negativeButtonText }</Button>
                        : null
                    }
                    <Button onClick={onPositiveClickHandler}>{ modalData.positiveButtonText || GlobalInitialState.modalData!.positiveButtonText }</Button>
                </div>
            </div>
        </ModalWrapper>
    ) : null
    );
};

export default withMeiosis(Modal);


const ModalWrapper = styled.div<StyledColorProps>`
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity ${animations.Transition};

    & .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${rgba('#000', 0.75)};
    }

    & .modal-popup {
        display: flex;
        flex-flow: column;        
        position: relative;
        width: calc(100% - 2 * ${gaps.Common});
        max-width: ${elementSizes.ModalMaxWidth};
        max-height: calc(100% - 2 * ${gaps.Common});
        margin: ${gaps.Common} 0;
        border-radius: ${elementSizes.BorderRadius};
        background-color: #fff;
        overflow: hidden;

        & .modal-header {
            display: flex;
            flex: 0 1 ${elementSizes.ModalTitleHeight};
            height: ${elementSizes.ModalTitleHeight};
            border-bottom: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
            justify-content: space-between;
            
            & .title { 
                display: flex;
                width: calc(100% - 2 * (${elementSizes.ModalTitleHeight} + ${gaps.Small}));
                margin-left: calc(${elementSizes.ModalTitleHeight} + ${gaps.Small});
                font-weight: 500;
                justify-content: center;
                align-items: center;

                & > span {
                    width: 100%;
                    text-align: center;
                    ${styleGroup.TextOverflow}
                }
            }
            
            & .close {
                display: flex;
                width: ${elementSizes.ModalTitleHeight};
                padding: 0;
                border: 0;
                justify-content: center;
                align-items: center;
                background: transparent;
                cursor: pointer;

                & .material-icons { 
                    font-size: ${fontSizes.XLarge};
                }

                &:hover {
                    background-color: ${ props => lighten(colorRange.L5, props.themeColor.grayColor!) };
                }
            }
        }

        & .modal-content {
            flex: 1 1 auto;
            padding: ${gaps.Common} ${gaps.Small};
            box-sizing: border-box;
            overflow-y: auto;
            
            & > span {
                display: flex;
                min-height: 5rem;
                flex-direction: column;                
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }

        & .modal-footer {
            flex: 0 1 auto;
            padding: ${gaps.Small};
            text-align: center;
            border-top: ${ props => elementSizes.Border1Pixel(lighten(colorRange.L5, props.themeColor.grayColor!)) };
        }
    }

    &.show {
        opacity: 1;
    }

    &.wide {
        & .modal-popup {
            max-width: ${elementSizes.ModalLargeMaxWidth};
        }    
    }
`;

