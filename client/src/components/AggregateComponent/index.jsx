import React from 'react';
import PropTypes from "prop-types"
import { Button, } from '@mui/material';
import InputBox from '../InputBox';
import CheckBox from '../CheckBox';
import DropDown from '../DropDown';
import "./styles/aggregateComponent.scss"
import clsx from "clsx"

const AggregateComponent = (props) => {
    const {
        // name,
        title,
        aggregateComponent = [],
        addButton = {},
    } = props

    const formControls = (data) => {
        const control = {
            input: <InputBox {...data} ></InputBox>,
            checkbox: <CheckBox {...data}></CheckBox>,
            dropdown: <DropDown {...data}></DropDown>
        }
        return control[data.controlType]
    }

    const locations = [""]

    return (
        <article className='aggregate-component'>
            <label>{title}</label>
            {locations.map((location, locIndex) => (
                <section className='agg-location' key={locations + "-" + locIndex}>
                    <section>{"Location " + (locIndex + 1)}</section>
                    <section className='aggregate-controls'>
                        {
                            aggregateComponent.map((aggregateItem, aggregateindex) => (
                                aggregateItem.hidden ? null :
                                    <section className={clsx(" aggregate-control", {
                                        "app-flex-100": aggregateindex === 1
                                    })} key={aggregateItem.name + "-" + aggregateindex}>
                                        {formControls({ ...aggregateItem, onchange: aggregateItem.onchange.bind(aggregateItem.name, aggregateindex) })}
                                    </section>
                            ))
                        }
                    </section>
                </section >
            ))}
            <section>
                {
                    addButton ?
                        <Button onClick={addButton.handleButtonClick}>{addButton.label}</Button> : null
                }
            </section>
        </article >
    );
};

export default AggregateComponent;

AggregateComponent.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    aggregateComponent: PropTypes.array,
    addButton: PropTypes.object,
    formControls: PropTypes.object,
}