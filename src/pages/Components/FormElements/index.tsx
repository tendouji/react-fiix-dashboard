import React from "react";
import styled from "styled-components";
import withMeiosis, { WithMeiosisProps } from "../../../components/HOC";
import InputTrailIcon from "../../../components/Input/InputTrailIcon";
import TextArea from "../../../components/Input/TextArea";
import Table from "../../../components/Table";
import { gaps } from "../../../constants/layout";
import { TableDataType } from "../../../models";


type ComponentFormElementProps = {
    className?: string,
}

const ComponentFormElement: React.FC<ComponentFormElementProps & WithMeiosisProps> = ({globalActions, globalStates, className}) => {
    
    
    return <div className="component-form-element">
        <h1>Form Elements</h1>
        <ComponentFormElementWrapper className="form-content preview-elements">
            <div className="form-row">
                <div className="label">Text Input</div>
                <div className="input">
                    <input type="text" placeholder="Simple Text Input" />
                </div>
            </div>
            <div className="form-row">
                <div className="label">Text Input with Icon</div>
                <div className="input">
                    <InputTrailIcon 
                        id="demoInputTrailIcon" 
                        placeholder="Text Input with trailing icon" 
                        hasTrailIcon={true}
                        icon="search"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="label">Textarea</div>
                <div className="input">
                    <TextArea 
                        id="demoTextarea" 
                        rows={3}
                        placeholder="Simple Text Area" />
                </div>
            </div>
            <div className="form-row">
                <div className="label">Textarea with counter</div>
                <div className="input">
                    <TextArea 
                        id="demoTextareaCounter" 
                        enableCounter={true} 
                        maxLength={10} 
                        rows={3}
                        placeholder="Text Area with counter" />
                </div>
            </div>
            <div className="form-row">
                <div className="label">Selection</div>
                <div className="input">
                    <input type="text" placeholder="Simple Text Input" />
                </div>
            </div>
        </ComponentFormElementWrapper>
    </div>;
}

export default withMeiosis(ComponentFormElement);

const ComponentFormElementWrapper = styled.div`
    &.form-content.preview-elements {
        & .form-row {
            & .label {
                width: 100px;
            }

            & .input {
                width: calc(100% - 100px - ${gaps.XSmall});
            }
        }
    }
`;