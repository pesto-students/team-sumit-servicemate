import { Button } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types";
import "./styles/dashedButton.scss"

const DashedButton = (props) => {
    const { label = '', name = '', icon = '' } = props;
    return (
        <Button id={name}>
            <article className='dashed-button-icon-text'>
                <section>
                    {icon}
                </section>
                <section>
                    {label}
                </section>
            </article>
        </Button>
    );
};

export default DashedButton;

DashedButton.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
}