import React, { useRef } from "react";
import styled from "styled-components";
import Notification from "../../../services/notification";
import Button from "../../Button";
import { fontSizes, gaps } from "../../../constants/layout";
import { StyledColorProps } from "../../../models";
import withMeiosis, { WithMeiosisProps } from "../../HOC";


type NotificationFormProps = {
    className?: string,
}

const NotificationForm: React.FC<WithMeiosisProps & NotificationFormProps> = ({globalActions, globalStates, className}) => {
    const notificationTitleRef = useRef<HTMLInputElement>(null);
    const notificationMessageRef = useRef<HTMLInputElement>(null);

    const testNotification = () => {
        if(!!notificationTitleRef.current && !!notificationMessageRef.current) {
            const curTitle: string = notificationTitleRef.current.value;
            const curMessage: string = notificationMessageRef.current.value;
            
            const notification = new Notification(curTitle, curMessage);
            notification.blastNotification();
        }
    };

    return (
        <NotificationFormWrapper 
            themeColor={globalStates!.themeColor}
            className="notification-test-form"
        >
            <h4>Notification Test</h4>
            <fieldset>
                <p>Enter sample title and message to trigger notification</p>
                <div className="form-row">
                    <div className="label">Title</div>
                    <div className="input">
                        <input type="text" ref={notificationTitleRef} id="notificationTitle" placeholder="Title" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="label">Message</div>
                    <div className="input">
                        <input type="text" ref={notificationMessageRef} id="notificationBody" placeholder="Message" />
                    </div>
                </div>
                <div className="form-footer">
                    <Button onClick={testNotification}>Trigger Notification</Button>
                </div>
            </fieldset>
        </NotificationFormWrapper>
    );
};

export default withMeiosis(NotificationForm);


const NotificationFormWrapper = styled.div<StyledColorProps>`
    & fieldset {
        padding: 0;
        margin: 0;
        border: 0;
        font-size: ${fontSizes.Common};
    }

    & .form-row {
        display: flex;
        margin-bottom: ${gaps.XSmall};
        justify-content: space-between;

        &:last-child {
            margin-bottom: 0;
        }

        & .label {
            width: 70px;
            padding-top: ${gaps.Small};
            font-weight: 500;
        }

        & .input {
            width: calc(100% - 70px - ${gaps.XSmall});
        }
    }

    & .form-footer {
        margin-top: ${gaps.Small};
        text-align: right;
    }
`;